import RootDocument from "@/components/site/root-document";
import SiteShell from "@/components/site/site-shell";

import "../globals.css";

export { rootMetadata as metadata } from "@/lib/root-metadata";

export default function TurkishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="tr">
      <SiteShell locale="tr">{children}</SiteShell>
    </RootDocument>
  );
}
