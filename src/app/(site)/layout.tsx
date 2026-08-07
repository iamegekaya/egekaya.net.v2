import FaultyTerminal from "@/components/backgrounds/faulty-terminal";
import BubbleMenu, { type BubbleMenuItem } from "@/components/navigation/bubble-menu";
import SiteFooter from "@/components/site/site-footer";
import { SITE_ACCENT_COLOR } from "@/lib/site-palette";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

// Colors cycle through the site's own accent palette (SITE_ACCENT_COLOR,
// its lighter --accent mint, the indigo from the old SITE_MENU_COLORS, and
// the dark green from SITE_GLITCH_COLORS) instead of upstream's unrelated
// blue/amber/red/purple example set. The mint hover needs dark text -- it's
// light enough that white would fail contrast.
const navigationItems = [
  { label: "Home", href: "/", ariaLabel: "Go to home page", rotation: -6, hoverStyles: { bgColor: "#41B06E", textColor: "#f5f7f2" } },
  { label: "About", href: "/about", ariaLabel: "Go to about page", rotation: 6, hoverStyles: { bgColor: "#211C6A", textColor: "#f5f7f2" } },
  {
    label: "Cyber Security",
    href: "/cyber-security",
    ariaLabel: "Go to cyber security page",
    rotation: -5,
    hoverStyles: { bgColor: "#288247", textColor: "#f5f7f2" },
  },
  {
    label: "Photography",
    href: "/photography",
    ariaLabel: "Go to photography page",
    rotation: 5,
    hoverStyles: { bgColor: "#8bf5c7", textColor: "#050505" },
  },
  {
    label: "cv.egekaya.net",
    href: "https://cv.egekaya.net",
    ariaLabel: "Go to cv.egekaya.net",
    rotation: -6,
    hoverStyles: { bgColor: "#41B06E", textColor: "#f5f7f2" },
  },
  {
    label: "OmniSight",
    href: "https://omnisight.info/",
    ariaLabel: "Go to OmniSight",
    rotation: 6,
    hoverStyles: { bgColor: "#211C6A", textColor: "#f5f7f2" },
  },
  { label: "Contact", href: "/contact", ariaLabel: "Go to contact page", rotation: -5, hoverStyles: { bgColor: "#288247", textColor: "#f5f7f2" } },
] satisfies BubbleMenuItem[];

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site-canvas">
      {/* First tab stop on every page: the fixed menu header covers the top of
          the viewport, so keyboard users otherwise have to walk through it
          before reaching any content. */}
      <a className="site-skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="site-background" aria-hidden="true">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.4}
          scanlineIntensity={0.3}
          glitchAmount={1}
          flickerAmount={0.5}
          noiseAmp={0.6}
          chromaticAberration={0}
          curvature={0}
          tint={SITE_ACCENT_COLOR}
          mouseReact
          mouseStrength={0.3}
          pageLoadAnimation
          brightness={0.85}
        />
      </div>

      <BubbleMenu logo="Ege Kaya" logoHref="/" items={navigationItems} useFixedPosition />

      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      <SiteFooter />
    </div>
  );
}
