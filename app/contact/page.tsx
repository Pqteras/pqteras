import type { Metadata } from "next";
import ContactLayout from "../layout/ContactLayout";
import {
  CONTACT_PAGE_DESCRIPTION,
  SITE_NAME,
  siteOpenGraph,
  siteTwitter,
} from "../utils/siteMetadata";

const contactTitle = `Contact - ${SITE_NAME}`;

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_PAGE_DESCRIPTION,
  openGraph: siteOpenGraph(contactTitle, CONTACT_PAGE_DESCRIPTION, "/contact"),
  twitter: siteTwitter(contactTitle, CONTACT_PAGE_DESCRIPTION),
};

const Contact = () => <ContactLayout />;

export default Contact;
