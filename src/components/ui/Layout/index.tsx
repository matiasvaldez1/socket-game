import type { ReactElement } from "react";
import React from "react";
import CustomHead from "../Seo";

export default function Layout({
  title,
  description,
  keywords,
  children,
}: {
  title: string;
  children: ReactElement;
  description?: string;
  keywords?: string;
}) {
  return (
    <>
      <CustomHead title={title} description={description} keywords={keywords} />
      {children}
    </>
  );
}
