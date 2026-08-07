import SiteNav from "@/components/navigation/site-nav";
import SiteFooter from "@/components/site/site-footer";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site-canvas flex min-h-screen flex-col">
      <div className="site-grid-bg" aria-hidden="true" />

      <SiteNav />

      <div id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </div>

      <SiteFooter />
    </div>
  );
}
