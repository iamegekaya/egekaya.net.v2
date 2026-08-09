import SiteNav from "@/components/navigation/site-nav";
import SiteFooter from "@/components/site/site-footer";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * The chrome shared by both locale trees: grid background, nav, main landmark,
 * footer. `(site)/layout.tsx` renders it with "en", `tr/layout.tsx` with "tr",
 * so neither tree can drift from the other.
 */
export default function SiteShell({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const dict = getDictionary(locale);

  return (
    <div className="site-canvas flex min-h-screen flex-col">
      <div className="site-grid-bg" aria-hidden="true" />

      <SiteNav locale={locale} dict={dict} />

      <div id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </div>

      <SiteFooter dict={dict} />
    </div>
  );
}
