import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./styles/globals.scss";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Theocharis Pasvantis",
  description:
    "Software Developer Portfolio - Building digital experiences with modern web technologies",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
