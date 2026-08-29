import type { Metadata } from "next";

export const SITE_URL = "https://pasvantiss.com";

export const SITE_NAME = "Theocharis Pasvantis";

export const SITE_DESCRIPTION =
  "Full Stack Developer portfolio — building web apps, desktop software, and developer tools with modern technologies.";

export const WORK_PAGE_DESCRIPTION =
  "Featured projects by Theocharis Pasvantis.";

export const SITE_BANNER_IMAGE = "/banner-pasvantis.jpg";

export const siteOpenGraph = (
  title: string,
  description: string,
  path = "/",
): Metadata["openGraph"] => ({
  title,
  description,
  url: path,
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
  images: [
    {
      url: SITE_BANNER_IMAGE,
      alt: `${SITE_NAME} portfolio banner`,
    },
  ],
});

export const siteTwitter = (
  title: string,
  description: string,
): Metadata["twitter"] => ({
  card: "summary_large_image",
  title,
  description,
  images: [SITE_BANNER_IMAGE],
});
