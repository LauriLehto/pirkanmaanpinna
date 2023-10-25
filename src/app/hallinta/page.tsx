"use client";

import dynamic from "next/dynamic";
import { FC, useMemo } from "react";

const Admin: FC = () => {
  const CMSPage = useMemo(
    () =>
      dynamic(() => import("@/components/cms/CMSPage"), {
        ssr: false,
      }),
    []
  );

  return useMemo(() => <CMSPage key="hallinta" />, [CMSPage]);
};

export default Admin;
