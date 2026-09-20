/**
 * Service detail behind the five systems.
 *
 * `lib/content.ts` owns each system's name, outcome and body — the things a
 * skimmer reads. This file owns the depth: the 3-4 headline components, the
 * full component list that sits behind a toggle, and the pipeline drawn as an
 * architecture diagram. Split this way so nothing is written twice.
 *
 * Progressive disclosure is the point. Listing thirty services flat is the
 * fastest way back to looking like a generic agency menu.
 */

/** Columns of nodes. Each column feeds the next; the diagram lays itself out. */
export type Pipeline = readonly (readonly string[])[];

export type SystemDetail = {
  headline: readonly string[];
  pipeline: Pipeline;
  includes: readonly string[];
};

export const systemDetail: Record<string, SystemDetail> = {
  lead: {
    headline: ["AI chatbot", "WhatsApp", "CRM sync", "Analytics"],
    pipeline: [
      ["WhatsApp", "Web form", "Missed call", "Instagram"],
      ["AI qualify"],
      ["CRM record", "Notify owner"],
      ["Follow-up"],
      ["Analytics"],
    ],
    includes: [
      "Landing page, or wired into the site you already have",
      "AI chatbot trained on your services and pricing",
      "Capture across WhatsApp, forms, calls and social",
      "Intent, budget and urgency qualification",
      "Automated acknowledgement within seconds",
      "CRM integration and record creation",
      "Notification to the right person, with context attached",
      "Conversion analytics",
    ],
  },
  customer: {
    headline: ["Knowledge base", "FAQ automation", "Human escalation", "Logging"],
    pipeline: [
      ["Website chat", "WhatsApp"],
      ["Knowledge base"],
      ["Answer", "Escalate"],
      ["Conversation log"],
      ["Analytics"],
    ],
    includes: [
      "AI chatbot trained on your own documents and policies",
      "Website and WhatsApp integration",
      "FAQ automation in your own tone of voice",
      "Enquiry routing by topic",
      "Human escalation the moment it matters, with full context",
      "Conversation logging you can read back",
      "Response and deflection analytics",
    ],
  },
  booking: {
    headline: ["Calendar sync", "Reminders", "Reschedule in thread", "CRM"],
    pipeline: [
      ["WhatsApp", "Web form"],
      ["AI assistant"],
      ["Check calendar"],
      ["Confirm", "Reminder"],
      ["Reschedule"],
    ],
    includes: [
      "Landing page with the booking flow built in",
      "AI assistant that answers questions before it books",
      "Live calendar integration, real availability only",
      "Slot held while the customer decides",
      "Confirmation over WhatsApp or email",
      "Reminder the evening before, to cut no-shows",
      "Reschedule handled in the same thread",
      "CRM integration",
    ],
  },
  operations: {
    headline: ["Document AI", "Workflow automation", "Reporting", "Dashboards"],
    pipeline: [
      ["Invoice", "Form", "Email"],
      ["AI extract"],
      ["Validate"],
      ["Sheets or CRM", "Approval"],
      ["Report"],
    ],
    includes: [
      "Workflow mapping before anything gets built",
      "AI document processing and data extraction",
      "A validation step before anything is written anywhere",
      "CRM and spreadsheet automation",
      "Internal notifications and approvals",
      "Email automation",
      "Scheduled reporting",
      "An internal AI assistant for your team",
      "Dashboards for the numbers you actually watch",
    ],
  },
  growth: {
    headline: ["Funnel analysis", "Follow-up", "Attribution", "Monthly review"],
    pipeline: [
      ["Ads", "Search", "Social"],
      ["Landing page"],
      ["AI qualify"],
      ["Follow-up"],
      ["Attribution"],
    ],
    includes: [
      "Funnel analysis of where visitors currently drop out",
      "Website and landing page optimization",
      "Lead capture built around intent, not just an email field",
      "AI qualification before a human is involved",
      "Segmented, automated follow-up",
      "CRM integration",
      "Conversion tracking and attribution",
      "Monthly optimization against the numbers",
    ],
  },
};

/**
 * Web, design, content and growth work still happens here — but as the layers
 * that make a system work, not as four more headline services competing with
 * it for attention. Shown as one strip, never as separate deep dives.
 */
export const connectedLayers = [
  {
    name: "Web",
    line: "Where the system lives.",
    items: [
      "AI-ready business websites",
      "Landing pages",
      "Client portals",
      "Dashboards",
      "Web applications",
      "Forms wired to automation",
    ],
  },
  {
    name: "Design",
    line: "How it looks and reads.",
    items: [
      "UI and UX design",
      "Brand identity",
      "Landing page design",
      "Dashboard design",
      "Chatbot interface",
      "Marketing creative",
    ],
  },
  {
    name: "Content",
    line: "What it says, and what brings people in.",
    items: [
      "Social content",
      "Content calendars",
      "AI-assisted workflows",
      "Automated responses",
      "Lead routing from social",
      "Repurposing",
    ],
  },
  {
    name: "Growth",
    line: "Proof it worked, and what to change.",
    items: [
      "Analytics setup",
      "Conversion tracking",
      "SEO",
      "Funnel optimization",
      "Campaign analysis",
      "Monthly reporting",
    ],
  },
] as const;

export const retainer = {
  name: "Always-On Optimization",
  line: "A system nobody tunes drifts by month three.",
  items: [
    "System monitoring and uptime",
    "Automation maintenance",
    "Prompt and workflow tuning",
    "Knowledge-base updates",
    "Monthly analytics review",
    "Conversion optimization",
    "New workflows as you need them",
    "Website maintenance",
  ],
} as const;

/**
 * Public price anchors: ranges with "starting at", never a fixed number.
 * With no delivery history a fixed price is a promise we might have to walk
 * back, and every tier routes to a conversation rather than a checkout.
 */
export const pricing = [
  {
    name: "Starter",
    range: "₹15,000 – ₹30,000",
    from: "₹15,000",
    timeline: "1 – 2 weeks",
    best: "One clear workflow.",
    includes: [
      "One automation workflow",
      "One AI component",
      "Lead or contact capture",
      "One integration",
      "Landing page, or wired into your existing site",
      "Basic analytics",
    ],
    example: "Enquiry, qualify, notify, CRM.",
  },
  {
    name: "Business",
    range: "₹40,000 – ₹90,000",
    from: "₹40,000",
    timeline: "3 – 5 weeks",
    best: "A full system, lead to customer.",
    featured: true,
    includes: [
      "AI chatbot",
      "Lead capture and qualification",
      "WhatsApp and email automation",
      "CRM integration",
      "Custom-designed site or landing page",
      "Multiple workflows",
      "Analytics and an optimization period",
    ],
    example: "A Lead, Booking or Customer System.",
  },
  {
    name: "Retainer",
    range: "₹8,000 – ₹20,000 / mo",
    from: "₹8,000 / mo",
    timeline: "Ongoing, cancel anytime",
    best: "A live system, kept sharp.",
    includes: [
      "System monitoring",
      "Automation maintenance",
      "AI and prompt optimization",
      "Knowledge-base updates",
      "Monthly analytics",
      "New workflow additions",
      "Website maintenance",
    ],
    example: "Always-On Optimization.",
  },
] as const;

/**
 * Step one for businesses not ready for automation yet. Deliberately lighter
 * in weight and lower in price than the systems: an entry point, not a
 * parallel identity. A business with no website and no WhatsApp Business
 * profile has nothing for a system to connect to.
 */
export const digitalFoundation = {
  intro:
    "A system needs something to run on. No website, no WhatsApp Business profile, nothing for a CRM to reach — automation is the wrong first step. This is the groundwork.",
  tiers: [
    {
      name: "Get Online",
      range: "₹3,000 – ₹6,000",
      from: "₹3,000",
      timeline: "3 – 5 days",
      best: "No digital presence yet.",
      includes: [
        "Google Business Profile set up and optimized",
        "WhatsApp Business profile, catalog and hours",
        "UPI payment QR set up",
        "One social business page",
      ],
    },
    {
      name: "Digital Storefront",
      range: "₹10,000 – ₹20,000",
      from: "₹10,000",
      timeline: "1 – 2 weeks",
      best: "Ready for a storefront.",
      includes: [
        "Everything in Get Online",
        "Digital catalog or menu, or a simple website",
        "Billing and invoicing software set up",
        "Review and reputation set up",
      ],
    },
    {
      name: "Marketplace Ready",
      range: "₹18,000 – ₹30,000",
      from: "₹18,000",
      timeline: "2 – 3 weeks",
      best: "Selling beyond your area.",
      includes: [
        "Everything in Digital Storefront",
        "ONDC seller onboarding",
        "Existing records digitized into cloud storage",
        "Ongoing setup support",
      ],
    },
  ],
} as const;
