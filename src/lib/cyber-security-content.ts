import type { Dictionary } from "@/i18n";

/**
 * Security-page content, built from the dictionary.
 *
 * Previously plain exported arrays of English strings. They are functions now
 * so the same structure can be rendered in either locale; the shape, ordering
 * and slugs stay here because those are layout and routing concerns, not
 * translatable copy.
 */

export function activeSystems(dict: Dictionary) {
  return dict.securityContent.activeSystems;
}

export function operatingSystemExperience(dict: Dictionary) {
  return dict.securityContent.osExperience;
}

export function securityPrinciples(dict: Dictionary) {
  const c = dict.securityContent;
  return [
    // "Zero Trust" is the industry term and is not translated in either locale.
    { label: c.principleLabels.principle, value: "Zero Trust", detail: c.principles.zeroTrustDetail },
    { label: c.principleLabels.focus, value: c.principles.hybridTitle, detail: c.principles.hybridDetail },
    { label: c.principleLabels.approach, value: c.principles.edgeTitle, detail: c.principles.edgeDetail },
    { label: c.principleLabels.process, value: c.principles.secopsTitle, detail: c.principles.secopsDetail },
  ];
}

export function architectureSections(dict: Dictionary) {
  const a = dict.securityContent.architecture;
  // Slugs are anchor targets and stay identical across locales, so a link to
  // #secops-automation resolves on both trees.
  return [
    {
      index: "01",
      slug: "hybrid-server-management",
      title: a.hybridTitle,
      intro: a.hybridIntro,
      bullets: a.hybridBullets,
    },
    {
      index: "02",
      slug: "cloudflare-edge-security",
      title: a.cloudflareTitle,
      intro: a.cloudflareIntro,
      bullets: a.cloudflareBullets,
    },
    {
      index: "03",
      slug: "secops-automation",
      title: a.secopsTitle,
      intro: a.secopsIntro,
      bullets: a.secopsBullets,
    },
    {
      index: "04",
      slug: "network-security-access",
      title: a.networkTitle,
      intro: a.networkIntro,
      bullets: a.networkBullets,
    },
  ];
}

export function internshipWork(dict: Dictionary) {
  const i = dict.securityContent.internship;
  return [
    { area: i.socTitle, detail: i.socDetail },
    { area: i.threatTitle, detail: i.threatDetail },
    { area: i.policyTitle, detail: i.policyDetail },
    { area: i.reportingTitle, detail: i.reportingDetail },
  ];
}
