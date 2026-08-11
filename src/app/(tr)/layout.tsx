import RootDocument from "@/components/site/root-document";
import SiteShell from "@/components/site/site-shell";
import { rootMetadata } from "@/lib/root-metadata";

import "../globals.css";

export const metadata = rootMetadata;

export default function TurkishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="tr">
      <SiteShell locale="tr">{children}</SiteShell>
    </RootDocument>
  );
}
