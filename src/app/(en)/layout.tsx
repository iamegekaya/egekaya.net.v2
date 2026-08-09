import RootDocument from "@/components/site/root-document";
import SiteShell from "@/components/site/site-shell";

import "../globals.css";

export { rootMetadata as metadata } from "@/lib/root-metadata";

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="en">
      <SiteShell locale="en">{children}</SiteShell>
    </RootDocument>
  );
}
