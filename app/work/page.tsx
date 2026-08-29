import type { Metadata } from "next";
import WorkLayout from "../layout/WorkLayout";
import {
  SITE_NAME,
  WORK_PAGE_DESCRIPTION,
  siteOpenGraph,
  siteTwitter,
} from "../utils/siteMetadata";

const workTitle = `Work - ${SITE_NAME}`;

export const metadata: Metadata = {
  title: "Work",
  description: WORK_PAGE_DESCRIPTION,
  openGraph: siteOpenGraph(workTitle, WORK_PAGE_DESCRIPTION, "/work"),
  twitter: siteTwitter(workTitle, WORK_PAGE_DESCRIPTION),
};

const Work = () => <WorkLayout />;

export default Work;
