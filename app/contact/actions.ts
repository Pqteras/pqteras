"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { getClientIp } from "../utils/getClientIp";
import { CONTACT_EMAIL } from "../utils/siteMetadata";

const COOLDOWN_COOKIE = "contact_cooldown";
const COOLDOWN_MS = 5 * 60 * 1000;
const MIN_FILL_MS = 3000;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(254),
  subject: z.string().trim().min(1, "Subject is required").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(2000, "Message is too long"),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const genericError =
  "Something went wrong. Please try again later." as const;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "contact",
});

/**
 * Validates and sends a contact form message via Resend.
 */
export const submitContactForm = async (
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  if (formData.get("website")) {
    return { status: "error", message: genericError };
  }

  const startedAt = Number(formData.get("_startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: genericError };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check your input and try again.",
    };
  }

  const cookieStore = await cookies();
  const cooldown = cookieStore.get(COOLDOWN_COOKIE);
  if (cooldown && Date.now() - Number(cooldown.value) < COOLDOWN_MS) {
    return {
      status: "error",
      message: "Please wait a few minutes before sending another message.",
    };
  }

  const ip = await getClientIp();
  const { success: withinLimit } = await ratelimit.limit(`contact:${ip}`);

  if (!withinLimit) {
    return {
      status: "error",
      message: "Too many requests. Please try again later.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return { status: "error", message: genericError };
  }

  const resend = new Resend(apiKey);
  const { name, email, subject, message } = parsed.data;
  const recipient = process.env.RESEND_TO_EMAIL ?? CONTACT_EMAIL;

  try {
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Portfolio <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: genericError };
    }

    cookieStore.set(COOLDOWN_COOKIE, String(Date.now()), {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: Math.floor(COOLDOWN_MS / 1000),
      path: "/contact",
    });

    return {
      status: "success",
      message: "Message sent! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return { status: "error", message: genericError };
  }
};
