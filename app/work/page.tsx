import type { Metadata } from "next";
import WorkLayout from "../layout/WorkLayout";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected software projects by Theocharis Pasvantis.",
};

const Work = () => <WorkLayout />;

export default Work;
