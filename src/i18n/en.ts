/**
 * English strings. This file is the source of truth for the dictionary shape:
 * `tr.ts` is typed against it, so a key added here and forgotten there fails
 * the build rather than silently rendering English on the Turkish site.
 *
 * Slice one: chrome shared by every page. Page bodies follow.
 */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    security: "Security",
    photography: "Photography",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    shellAccess: "[SHELL_ACCESS]",
    shellTagline: "Cybersecurity & Photography",
    downloadCv: "Download CV",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    languageLabel: "Language",
    switchToTurkish: "Türkçe'ye geç",
    switchToEnglish: "Switch to English",
  },

  footer: {
    rights: "ROOT_USER. ENCRYPTED ACCESS ONLY.",
  },

  sidebar: {
    onThisPage: "On this page",
  },

  home: {
    metaDescription:
      "Ege Kaya — information security and photography. Zero Trust infrastructure, SecOps automation, and a photo portfolio.",
    login: "Login: root",
    password: "Password: *********",
    prompt: "ROOT_USER@EGEKAYA:~$ whoami",
    loadingProfile: "> Loading profile...",
    identityConfirmed: "> Identity confirmed: Ege Kaya.",
    roleLabel: "> Role:",
    secondaryProcess: "> Secondary process: Photography.",
    accessGranted: "> Access granted.",
    securityHeading: "01 // Security",
    photographyHeading: "02 // Photography",
    infrastructureTitle: "Infrastructure & Security",
    visualPerspectives: "Visual Perspectives",
    viewArchitecture: "View architecture",
    portraitAlt:
      "Ege Kaya on a beach, overlaid with a mock facial-recognition interface: a tracking box around his head labelled SUBJECT_01, a black-and-white identification crop, and readouts reading ID EGEKAYA, social sync rate 43 percent, interaction frequency rare, emotional output controlled.",
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "Personal background, education, and interests of Ege Kaya — born 2003 in Lüleburgaz, working in information security and photography, based in Istanbul.",
    heading: "whoami",
    status: "[STATUS]: B.S. INFORMATION SECURITY — YEDITEPE UNIVERSITY, 2022–PRESENT",
    biographyHeading: "> ./biography.sh",
    biographyOne:
      "Hello! My name is Ege, and I am 22 years old. I was born on July 11, 2003, in the Lüleburgaz district of Kırklareli. I am part of the last generation that grew up playing soccer in the streets and playing cards and marbles.",
    biographyTwo:
      "I first encountered my first computer in 2011; since that day, technology has become an integral part of my life. My interest in technology deepened during university, and in short, I enjoy working with technology, creating things, and learning something new every day. Outside of that I follow Formula 1, support Fenerbahçe, and like exploring cities and museums.",
    educationHeading: "Education Timeline",
    education: {
      present: "2022 — Present",
      degree: "B.S. Information Security",
      prep: "Preparatory School",
      highSchool: "High School",
      middleSchool: "Middle School",
      elementary: "Elementary School",
      yeditepe: "Yeditepe University",
      bahcesehir: "Lüleburgaz Bahçeşehir Anatolian High School",
      anatolian: "Lüleburgaz Anatolian High School",
      lulemiddle: "Lüleburgaz Middle School",
      luleelementary: "Lüleburgaz Elementary School",
    },
    preparingHeading: "Preparing_For",
    preparingIntro: "Exams I am currently studying for. None of these are held yet.",
    inProgress: "[In progress]",
    preparing: {
      securityPlus: "Vendor-neutral security fundamentals.",
      btl1: "Hands-on defensive operations: triage, digital forensics, incident response.",
      iso27001: "Information security management systems.",
      ielts: "English language proficiency.",
    },
    techStackHeading: "Tech_Stack",
    photographyCardTitle: "Photography",
    photographyCardBody:
      "Capturing the unseen details. My work focuses on street and travel photography, an escape from the screen and a way to pay attention to what is around me.",
    sections: {
      biography: "Biography",
      education: "Education",
      preparing: "Preparing For",
    },
  },

  photography: {
    metaTitle: "Photography",
    metaDescription:
      "Photo essay and portfolio by Ege Kaya. Started November 2023 on Canon, moved through Sony A7M2, now shooting Fujifilm X-M5 + XC 15-45mm. 13 selected frames.",
    heading: "GALLERY_INDEX",
    subtitle: "[ Visual data capture ]",
    statusLabel: "> STATUS:",
    statusOnline: "[ONLINE]",
    storyTitle: "./story.sh",
    storyOne:
      "Photography is somewhat of an escape from the screen for me. Usually, my day passes in front of the computer — taking my camera, going outside, wandering around, and photographing things genuinely does me good.",
    storyTwo:
      "I bought my first camera, a Canon Rebel T7, on November 8, 2023. From there I moved through a Sony A7M2 before landing on the Fujifilm X-M5 I currently shoot with. On July 1, 2026 I added an Insta360 Luna Ultra to the kit — a gimbal camera that sits alongside the X-M5 rather than replacing it.",
    currentGear: "Current Gear",
    openOfficialPage: "Open official page",
    galleryHeading: "Photo Gallery",
    galleryUnavailable: "The gallery is unavailable right now. Please check back shortly.",
    photoAlt: "Portfolio photo",
    equipment: {
      bodyNote: "My current camera body.",
      lensNote: "The lens currently paired with the X-M5.",
      gimbalNote: "A dual-lens gimbal camera, added to the kit on July 1, 2026.",
    },
    sections: { story: "Story", equipment: "Equipment", gallery: "Gallery" },
  },

  security: {
    metaTitle: "Cyber Security",
    metaDescription:
      "Zero Trust, hybrid Docker + native architecture, Cloudflare edge logging, SecOps automation with n8n + AI, Tailscale mesh VPN. Aktif Yatırım Bankası security intern.",
    heading: "> ./SECURITY_PROFILE",
    intro:
      "Cybersecurity is not just an area of interest for me, but a disciplined learning process and an architectural design mindset. I focus on understanding systems in depth, identifying vulnerabilities, and building structures around the Zero Trust principle — sitting at the intersection of system management, traffic analysis, defensive operations, and security automation.",
    activeSystemsHeading: "Actively Used Systems",
    activeSystemsIntro:
      "These are the environments I actively use for administration, development, simulation, and analysis.",
    systemExperienceHeading: "System Experience",
    systemExperienceIntro:
      "I have worked across multiple desktop, server, and security-focused operating systems to understand different behaviors and deployment patterns.",
    architectureHeading: "Technical Infrastructure & Architecture",
    projectsHeading: "Projects",
    comingSoon: "[COMING SOON]",
    read: "[READ]",
    openWriteUp: "Open write-up",
    encrypted: "ENCRYPTED",
    placeholderSummary:
      "Write-ups and tooling from CTFs and independent research will be published here once they are ready.",
    experienceLabel: "Experience",
    employer: "Aktif Yatırım Bankası A.Ş",
    role: "Information Technologies Security Intern",
    period: "July 2, 2025 – August 27, 2025",
    liveProduct: "Live product",
    omnisightBlurb:
      "The self-hosted network visibility product I design and build has its own site, with the documentation, architecture notes, and privacy boundary written out in full.",
    opensInNewTab: "(opens in a new tab)",
    terminal: {
      init: "Initializing security profile...",
      compiling: "Compiling principles... [OK]",
      loading: "Loading real-world experience... [4 modules]",
      awaiting: "Awaiting new write-ups",
    },
    sections: {
      principles: "Principles",
      systems: "Systems",
      architecture: "Architecture",
      projects: "Projects",
      experience: "Experience",
    },
  },

  securityContent: {
    activeSystems: [
      "Linux: Ubuntu (Server and Client Management)",
      "macOS: Development and Analysis Environment",
      "Windows: 11 Pro (Corporate Structure Simulations)",
    ],
    osExperience: [
      "Security-focused systems: Kali Linux, Parrot OS",
      "Server and desktop systems: CentOS, Fedora, Linux Mint, Windows 10 / 7 / Vista",
    ],
    principleLabels: {
      principle: "Principle",
      focus: "Focus",
      approach: "Approach",
      process: "Process",
    },
    principles: {
      zeroTrustDetail:
        "I design around verification, segmentation, and controlled access instead of implicit trust.",
      hybridTitle: "Hybrid Architecture",
      hybridDetail:
        "I balance performance-critical native services with isolated containerized workloads.",
      edgeTitle: "Edge Visibility",
      edgeDetail: "I care about traffic observability, DNS hygiene, and practical logging over assumptions.",
      secopsTitle: "SecOps Automation",
      secopsDetail:
        "I push repetitive security work toward event-driven scanning, analysis, and reporting flows.",
    },
    architecture: {
      hybridTitle: "Hybrid Server Management (Docker & Native)",
      hybridIntro:
        "Instead of confining every service to a single structure, I use a distribution optimized according to the real need of the workload.",
      hybridBullets: [
        "Micro-services: I run database, automation, and media services in isolated Docker containers.",
        "Web applications: I host performance-critical projects such as cv.egekaya.net and egekaya.net in a native Next.js environment.",
      ],
      cloudflareTitle: "Cloudflare Edge Security & Custom Logging",
      cloudflareIntro:
        "I manually manage DNS records and email security policies instead of relying on default settings.",
      cloudflareBullets: [
        "DNS and mail security: I manage A, CNAME, MX, TXT, SPF, and DMARC configurations myself.",
        "Cloudflare Tunnels: I expose internal services securely without taking on the risk of opening ports directly.",
        "Custom HTTP traffic analysis: I built my own monitoring flow with Cloudflare Workers instead of depending only on ready-made logging tools.",
        "Edge workflow: Requests are captured at the edge, transmitted to my server by webhook, and archived locally with IP, method, path, and timestamp data.",
      ],
      secopsTitle: "SecOps & Automation (n8n + AI)",
      secopsIntro:
        "I move security processes away from manual repetition and toward event-driven automations that can run consistently.",
      secopsBullets: [
        "Continuous discovery: Every day, an automated Nmap cycle maps open ports and active services across the environment.",
        "Automated vulnerability analysis: Nuclei and OWASP ZAP continue the workflow with deeper scans against detected services.",
        "AI-supported reporting: Findings are read from disk, analyzed by AI agents, and escalated to me as Telegram or email notifications when something matters.",
      ],
      networkTitle: "Network Security & Access",
      networkIntro:
        "My access model is built around controlled connectivity and filtering instead of broad exposure.",
      networkBullets: [
        "Mesh VPN: I use Tailscale to access servers and services from anywhere as if I were still on the local network.",
        "DNS filtering: I block ad and tracker traffic across the network with Pi-hole.",
      ],
    },
    internship: {
      socTitle: "SOC Monitoring & SIEM",
      socDetail:
        "Monitored daily security events on the Wazuh platform and analyzed logs from firewalls, WAFs, and endpoints to detect anomalies.",
      threatTitle: "Threat Analysis",
      threatDetail:
        "Investigated alerts to separate false positives from true positives, using threat intelligence tools such as VirusTotal for IP and hash reputation checks.",
      policyTitle: "Policy Optimization",
      policyDetail:
        "Helped refine Wazuh rulesets for File Integrity Monitoring (FIM), Rootcheck, and malware detection to reduce alert fatigue.",
      reportingTitle: "Reporting",
      reportingDetail:
        "Researched and presented technical reports on the OWASP AI Top 10 and emerging threats to the security team.",
    },
    projects: {
      omnisightSummary:
        "A self-hosted network visibility and SIEM-oriented product, designed around one constraint: metadata only, never content. Architecture, the boundaries I committed to, and what they cost.",
      omnisightTags: ["Architecture", "Go · Python · React", "Privacy by design"],
      incidentSummary:
        "A hardened lab denied 35 hours of agent telemetry while every health signal stayed green. What the monitoring missed mattered more than the bug itself.",
      incidentTags: ["Incident analysis", "Network", "Detection gap"],
    },
  },

  omnisight: {
    metaTitle: "OmniSight",
    metaDescription:
      "A self-hosted network visibility and SIEM-oriented product built around one constraint: metadata only, never content. Architecture, the boundaries I committed to, and what they cost.",
    backToProfile: "< ./SECURITY_PROFILE",
    heading: "> ./OMNISIGHT",
    intro:
      "A self-hosted endpoint network visibility and SIEM-oriented product: an endpoint agent, a local server, an operator console, installers, and a cloud control plane for licensing and updates. The interesting part is not its size. It is the boundaries I committed to before writing the first line, and what holding them cost.",
    roleMeta: "Role: sole designer and engineer",
    stackMeta: "Go · Python · React · Linux",
    statusMeta: "Status: in development",
    whatItDoesHeading: "What it does",
    whatItDoesBody:
      "Agents on managed endpoints report connection metadata, software inventory and system metrics to a server the customer runs on their own hardware. The server stores it, runs detection against it, matches installed software to public vulnerability data, and drives an operator console for search, alert triage and reporting.",
    dataFlowAlt:
      "Four-stage pipeline: endpoint agents collect metadata, inventory and metrics; the customer's own OmniSight server stores and detects; the operator console queries it; reports and alerts go out to email and to the customer's own webhook.",
    dataFlowCaption:
      "> Collect, store and detect, investigate, notify. Solid paths are always on. Dashed paths exist only when the operator configures them.",
    components: {
      agent: "Endpoint agent",
      agentDetail: "Go. Network metadata, inventory, heartbeat, aggregate metrics.",
      server: "Local server",
      serverDetail: "Python API, relational store, RBAC, audit, detection, reporting.",
      console: "Operator console",
      consoleDetail: "React. Dashboard, event search, alert triage, vulnerabilities.",
      controlPlane: "Control plane",
      controlPlaneDetail: "Licensing, update delivery, rollout state, aggregate report relay.",
      vulnService: "Vulnerability service",
      vulnServiceDetail: "CVE feed sync and version-aware matching against inventory.",
      installers: "Installers and packaging",
      installersDetail: "macOS and Linux install, update, and uninstall flows.",
    },
    boundariesHeading: "The three boundaries",
    boundariesIntro:
      "A monitoring product is, by construction, the thing with the most access on the network. That makes it a liability as much as a tool, and the design questions worth answering are about what it deliberately refuses to do.",
    boundaries: {
      metadataTitle: "Metadata only, as a contract",
      metadataDetail:
        "No packet payloads, request bodies, headers, cookies, decrypted TLS, command lines, endpoint files, or credentials. This is written into the product's terms, not just the docs — so widening it later is a contractual change with a correction sequence, not a feature flag.",
      outboundTitle: "Outbound only",
      outboundDetail:
        "The cloud never opens a connection into a customer network. The customer's server initiates every exchange: licence checks, update polls, relay sends. A compromise of my infrastructure gives an attacker no path inward.",
      failClosedTitle: "Fail closed, everywhere",
      failClosedDetail:
        "The email relay rejects any recipient absent from its allowlist rather than queueing it. Vulnerability matching declines to guess when it cannot resolve a version. Runtime gates refuse to start rather than starting degraded.",
    },
    overviewAlt:
      "The customer's own infrastructure — endpoint agents, their OmniSight server and the operator console — sits inside one boundary. Managed OmniSight services sit outside it, reached only by outbound dashed connections carrying licence, update and software-version requests.",
    overviewCaption:
      "> Every arrow crossing the boundary points outward. There is no inbound path from my infrastructure into a customer network.",
    dataGoesHeading: "Where the data actually goes",
    dataGoesBody:
      "Telemetry stays on the customer's server. What crosses to my infrastructure is a short, deliberate list, and every item on it is there because the feature is impossible without it — software names and versions to match vulnerabilities, aggregate summaries to deliver a report, licence and update requests. The asymmetry between the two lists is the design.",
    boundaryCaption:
      "> Left: everything that never leaves. Right: everything that can, and only on configuration.",
    decisionsHeading: "Two decisions worth defending",
    restTitle: "Durable data goes over REST, never the socket",
    restBodyOne:
      "The console updates live, which usually means pushing data over a WebSocket. I push notifications that carry no payload at all — a signal that something changed, after which the browser re-fetches over the authenticated REST path. It is more work and one extra round trip. It also means the socket never becomes a second, less-audited way to read data, and that authorization is enforced in exactly one place.",
    restBodyTwo:
      "The lab outage I wrote up separately is the counterweight to that decision: because the socket and REST do not share a failure domain, the socket kept reporting healthy while REST ingest was entirely blocked. Splitting them bought me a cleaner authorization story and cost me a monitoring blind spot. Both are true.",
    withdrawTitle: "I withdrew my own release",
    withdrawBody:
      "During a security review of my own installer I found a flaw serious enough that shipping past it was not defensible. I pulled the published artifact rather than patching forward quietly, fixed the cause at the source, and left it unpublished until it could be rebuilt and reviewed properly. Publishing a new version to cover an old one leaves the old one installed on machines; withdrawing it does not.",
    differentlyHeading: "What I would do differently",
    differentlyOne:
      "I let the documentation grow without a structure. The always-loaded set eventually reached tens of thousands of tokens because three separate documents each accumulated their own copy of the same release history, and it became genuinely unusable — for collaborators and for me. Fixing it meant separating documents that describe the present from a changelog that describes the past, and enforcing that split with a check rather than a convention.",
    differentlyTwo:
      "The general lesson is the one I keep relearning: a rule nobody measures is a rule that has already been broken. Every boundary on this page has something that fails when it is crossed — a gate, a test, a script — because the ones that only existed as intentions did not hold.",
    lessonLine: "> Design the refusals first. The features will follow the shape they leave.",
    lessonBody:
      "Deciding early what the product would never collect made most later decisions easy, because anything that needed content was simply not on the table.",
    backLink: "< Back to security profile",
    readIncident: "Read the incident write-up >",
  },

  incident: {
    metaTitle: "Silent Ingest Failure",
    metaDescription:
      "A hardened home lab denied 35 hours of agent telemetry while every health signal stayed green. Root cause, why the monitoring missed it, and the rule I took from it.",
    backToProfile: "< ./SECURITY_PROFILE",
    heading: "> ./SILENT_INGEST_FAILURE",
    intro:
      "My hardened lab environment refused every agent request for 35 hours. Nothing alerted, and the one health signal anyone would have checked stayed green the whole time. The networking bug was the smaller half of this. The monitoring gap was the real finding.",
    roleMeta: "Role: sole operator",
    dateMeta: "August 2 – 3, 2026",
    statusMeta: "Status: resolved",
    glance: { undetected: "Undetected", denied: "Denied requests", alerts: "Alerts fired" },
    symptomHeading: "Symptom",
    symptomBody:
      "Every request to the lab server came back 403 from nginx. More than 23,000 denials accumulated before anyone noticed, and the way it surfaced was not a monitor firing. I tried to log in to the console and could not.",
    invisibleHeading: "Why it stayed invisible for 35 hours",
    invisibleIntro:
      "This is the part I care about. A misconfiguration that announces itself is an inconvenience. One that hides behind a healthy dashboard is a detection problem, and three separate gaps had to line up for it to hide this well.",
    causes: {
      noSignalTitle: "No success signal to miss",
      noSignalDetail:
        "nginx emits no access log in this profile. There was no record of healthy requests, so their absence could not be noticed by anyone or anything.",
      noWatchTitle: "Nothing watched the denial rate",
      noWatchDetail:
        "Denials were being written. No threshold, no alert, no dashboard looked at them. The evidence existed the entire time and nobody was pointed at it.",
      misleadingTitle: "The one green signal was the misleading one",
      misleadingDetail:
        "A metrics WebSocket opened two days before the outage stayed open throughout. Because it never reconnected, it never re-entered the broken path. Every “is the agent alive” check kept returning healthy while durable ingest was fully blocked.",
    },
    rootCauseHeading: "Root cause",
    rootCauseOne:
      "The lab authorizes by mesh VPN address. Each nginx location carries an explicit allow list and a closing deny all. A peer's packet reaches the web container by being DNAT'd from the host's mesh address to the container inside a bridge network, and is then forwarded into that bridge.",
    rootCauseTwo:
      "Because it arrives as forwarded traffic on the mesh interface, Tailscale marks it 0x40000, and its ts-postrouting chain masquerades on that mark. The source address is rewritten to the bridge gateway. nginx then saw one identical address for every client on the network and matched no allow rule.",
    rootCauseThree:
      "The distinction that matters: the ACL was never bypassed. The information it authorizes on was erased before it got there. The failure was closed rather than open — which is the correct direction to fail, and is also exactly why nothing looked alarming.",
    rootCauseFour:
      "The trigger was a service restart during routine unattended update activity. First denial landed 2 minutes 46 seconds later. I can prove the masquerade was the cause by removing it; I never established precisely what the restart changed, and I would rather say that than invent a tidier ending.",
    fixHeading: "Fix and verification",
    fixOne:
      "Disabling source NAT for subnet routes removes the offending masquerade rule. I verified by effect rather than by assumption: denials stopped, three fresh connections opened with keepalive disabled — so they could not ride an existing session — returned 200, proving new connections carried a real peer address again, and a 12-minute soak recorded zero denials with ingest present in 12 of 12 minutes.",
    fixTwo:
      "This setting is a deliberate deviation from my certified baseline, so it is recorded as one. It survives restarts, but bringing the mesh up with different flags would silently revert it.",
    changedHeading: "What changed as a result",
    changedOne:
      "The runtime start gate gained a check with two halves. One asserts that no masquerade rule can rewrite an inbound peer address and that the expected DNAT publication exists. The other asserts that no recent denial is sourced from the bridge gateway — the exact fingerprint this outage left. A test profile guards both halves and the call site, so the check cannot quietly stop being called.",
    changedTwo:
      "I wrote the gate against the fingerprint rather than the trigger on purpose. I still do not know what the restart changed, so a check that watched for that specific restart would protect me against one cause of a class of failures.",
    ruleHeading: "The rule I took from it",
    ruleLine: "> Liveness on a long-lived connection is not evidence that the request path works.",
    ruleBody:
      "An established stream is not re-evaluated against an ACL on every message. A per-request path is. They do not share a failure domain, so one cannot stand in as the health check for the other — and the stream is the one that keeps looking fine.",
    ruleAftermath:
      "The second, less comfortable lesson: I had no success signal anywhere in this system. Turning off access logging is a reasonable hardening choice on its own, but combined with no alerting it left an environment where healthy and completely broken produced identical observable output. I would take the log volume over that trade again.",
    backLink: "< Back to security profile",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Get in touch with Ege Kaya about information security work, photography, or general enquiries.",
    heading: "// INITIATE_CONTACT",
    intro:
      "Secure transmission lines open. Whether for security consultations, photographic collaborations, or general inquiries, use the terminal below or reach out directly at",
    onRequest: "[ON REQUEST]",
    pgpTitle: "PGP Public Key",
    pgpBody:
      "For encrypted communications regarding security disclosures, ask for a current public key via the form or email above.",
    externalNodes: "External_Nodes",
    form: {
      nameLabel: "TARGET_ID (Name)",
      namePlaceholder: "Enter your designation...",
      emailLabel: "RETURN_VECTOR (Email)",
      emailPlaceholder: "Enter routing address...",
      messageLabel: "PAYLOAD (Message)",
      messagePlaceholder: "Construct message payload here...",
      awaiting: "> Awaiting input...",
      transmitting: "> Transmitting...",
      submit: "Execute / Send",
      submitting: "Sending...",
      successLabel: "Success:",
      successBody: "Your message has been sent successfully. I'll get back to you as soon as possible.",
      errorLabel: "Error:",
      genericError: "Something went wrong while sending your message. Please try again in a moment.",
    },
  },

  notFound: {
    title: "404 // ERROR_NOT_FOUND",
    warning: "> System warning: critical exception in sub-routine",
    accessDenied: "Access denied:",
    accessDeniedRest: "the requested node does not exist in this subnet.",
    trace: "> TRACE: attempting to resolve path...",
    traceFailed: "[FAILED]",
    reason: "> REASON: dead link or unauthorized access vector.",
    returnToRoot: "Return to root",
    contact: "Contact",
  },
};

// Deliberately not `as const`. With literal types every Turkish value would have
// to equal its English one to satisfy the type, which is the opposite of the
// point. Widened to `string`, the type still pins the *shape*, so a key added
// here and missed in tr.ts is a compile error.
export type Dictionary = typeof en;
