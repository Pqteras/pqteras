import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PortfolioShell from "./components/PortfolioShell/PortfolioShell";
import { thegora } from "./fonts/thegora";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  siteOpenGraph,
  siteTwitter,
} from "./utils/siteMetadata";
import "lenis/dist/lenis.css";
import "./styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/logo.png",
  },
  openGraph: siteOpenGraph(SITE_NAME, SITE_DESCRIPTION),
  twitter: siteTwitter(SITE_NAME, SITE_DESCRIPTION),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${thegora.variable}`}>
        <PortfolioShell>{children}</PortfolioShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
