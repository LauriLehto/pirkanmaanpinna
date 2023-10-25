import Script from "next/script";
import type { FC, PropsWithChildren } from "react";

export const metadata = {
  title: "Hallinta - Pirkanmaan Pinna",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      <body>{children}</body>
    </html>
  );
};

export default AdminLayout;
