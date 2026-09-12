import type { Metadata } from "next";
import WorkLayout from "../layout/WorkLayout";
import { getWorkItems } from "../utils/getWorkItems";
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

const Work = () => {
  const items = getWorkItems();
  return <WorkLayout items={items} />;
};

export default Work;
