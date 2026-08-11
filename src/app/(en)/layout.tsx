import RootDocument from "@/components/site/root-document";
import SiteShell from "@/components/site/site-shell";
import { rootMetadata } from "@/lib/root-metadata";

import "../globals.css";

export const metadata = rootMetadata;

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="en">
      <SiteShell locale="en">{children}</SiteShell>
    </RootDocument>
  );
}
