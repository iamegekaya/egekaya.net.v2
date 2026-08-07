export const activeSystems = [
  "Linux: Ubuntu (Server and Client Management)",
  "macOS: Development and Analysis Environment",
  "Windows: 11 Pro (Corporate Structure Simulations)",
];

export const operatingSystemExperience = [
  "Security-focused systems: Kali Linux, Parrot OS",
  "Server and desktop systems: CentOS, Fedora, Linux Mint, Windows 10 / 7 / Vista",
];

export const securityPrinciples = [
  {
    label: "Principle",
    value: "Zero Trust",
    detail: "I design around verification, segmentation, and controlled access instead of implicit trust.",
  },
  {
    label: "Focus",
    value: "Hybrid Architecture",
    detail: "I balance performance-critical native services with isolated containerized workloads.",
  },
  {
    label: "Approach",
    value: "Edge Visibility",
    detail: "I care about traffic observability, DNS hygiene, and practical logging over assumptions.",
  },
  {
    label: "Process",
    value: "SecOps Automation",
    detail: "I push repetitive security work toward event-driven scanning, analysis, and reporting flows.",
  },
];

export const architectureSections = [
  {
    index: "01",
    slug: "hybrid-server-management",
    title: "Hybrid Server Management (Docker & Native)",
    intro:
      "Instead of confining every service to a single structure, I use a distribution optimized according to the real need of the workload.",
    bullets: [
      "Micro-services: I run database, automation, and media services in isolated Docker containers.",
      "Web applications: I host performance-critical projects such as cv.egekaya.net and egekaya.net in a native Next.js environment.",
    ],
  },
  {
    index: "02",
    slug: "cloudflare-edge-security",
    title: "Cloudflare Edge Security & Custom Logging",
    intro:
      "I manually manage DNS records and email security policies instead of relying on default settings.",
    bullets: [
      "DNS and mail security: I manage A, CNAME, MX, TXT, SPF, and DMARC configurations myself.",
      "Cloudflare Tunnels: I expose internal services securely without taking on the risk of opening ports directly.",
      "Custom HTTP traffic analysis: I built my own monitoring flow with Cloudflare Workers instead of depending only on ready-made logging tools.",
      "Edge workflow: Requests are captured at the edge, transmitted to my server by webhook, and archived locally with IP, method, path, and timestamp data.",
    ],
  },
  {
    index: "03",
    slug: "secops-automation",
    title: "SecOps & Automation (n8n + AI)",
    intro:
      "I move security processes away from manual repetition and toward event-driven automations that can run consistently.",
    bullets: [
      "Continuous discovery: Every day, an automated Nmap cycle maps open ports and active services across the environment.",
      "Automated vulnerability analysis: Nuclei and OWASP ZAP continue the workflow with deeper scans against detected services.",
      "AI-supported reporting: Findings are read from disk, analyzed by AI agents, and escalated to me as Telegram or email notifications when something matters.",
    ],
  },
  {
    index: "04",
    slug: "network-security-access",
    title: "Network Security & Access",
    intro:
      "My access model is built around controlled connectivity and filtering instead of broad exposure.",
    bullets: [
      "Mesh VPN: I use Tailscale to access servers and services from anywhere as if I were still on the local network.",
      "DNS filtering: I block ad and tracker traffic across the network with Pi-hole.",
    ],
  },
];
