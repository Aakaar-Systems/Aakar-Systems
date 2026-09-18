/**
 * All site copy lives here. Voice: a sharp, confident founder explaining
 * this to a business owner over coffee. Plain, direct, specific.
 */

export const problemCosts = [
  {
    time: "11:42 pm",
    channel: "WhatsApp",
    line: "A customer asks your price. Nobody is awake. By 9 am they have booked someone else.",
  },
  {
    time: "Tuesday",
    channel: "Missed call",
    line: "Three missed calls during a busy hour. No one writes them down. They are simply gone.",
  },
  {
    time: "Every day",
    channel: "Repeat questions",
    line: "Your staff answers the same six questions forty times. That is a full salary spent on copy-paste.",
  },
  {
    time: "Day 4",
    channel: "Follow-up",
    line: "The quote you sent on Monday never got a second message. The lead did not say no — you just stopped.",
  },
] as const;

export const indiaStats = [
  {
    value: "535M+",
    label: "monthly WhatsApp users in India",
    note: "The largest WhatsApp market on earth. This is where your customers already are.",
  },
  {
    value: "98%",
    label: "open rate on WhatsApp messages",
    note: "Email sits near 20%. Following up on the wrong channel is most of the problem.",
  },
  {
    value: "97%",
    label: "of Indian MSMEs use WhatsApp for business",
    note: "So WhatsApp automation is not an add-on here. It is the main pipe.",
  },
  {
    value: "73%",
    label: "of Indian SMEs already run at least one AI tool",
    note: "Up from 38% in 2023. Nobody needs convincing any more — they need it built properly.",
  },
] as const;

/** The spine of the site. Each stage drives one act of the scroll diagram. */
export const stages = [
  {
    id: "capture",
    index: "01",
    title: "Capture",
    claim: "Nothing gets to disappear.",
    body: "Every way a customer can reach you — WhatsApp, a form, a missed call, an Instagram DM, a walk-in enquiry — lands in one place, tagged and answered. Not a shared inbox somebody remembers to check. A single intake that never sleeps.",
    proof: "First reply in seconds, at 2 am on a Sunday.",
  },
  {
    id: "automate",
    index: "02",
    title: "Automate",
    claim: "The repetitive part stops touching a human.",
    body: "The system qualifies the enquiry, writes it to your CRM, sends the quote, books the slot, chases the follow-up on day two and day five, and pings the right person only when a human is actually needed.",
    proof: "Your team handles the ten conversations that matter, not the hundred that do not.",
  },
  {
    id: "optimize",
    index: "03",
    title: "Optimize",
    claim: "It gets better every month, on purpose.",
    body: "We instrument the whole path — where enquiries come from, where they stall, which follow-up actually converts. Then we read it together every month and change the system, not just the wording on a button.",
    proof: "You can point at the number that moved and say why.",
  },
] as const;

export const systems = [
  {
    id: "lead",
    name: "AI Lead System",
    outcome: "Every enquiry gets a real answer, even at 11 pm.",
    body: "Captures from WhatsApp, forms, calls and social. Qualifies with a short conversation, scores intent, routes the serious ones to a human with the context already written down.",
    inputs: ["WhatsApp", "Web form", "Missed call", "Instagram DM"],
  },
  {
    id: "customer",
    name: "AI Customer System",
    outcome: "Your team stops answering the same six questions.",
    body: "Handles the repetitive questions — price, timing, location, availability, documents needed — in your own words. Hands the conversation to a person the moment it goes past what it should decide alone.",
    inputs: ["FAQ", "Order status", "Policy docs", "Escalation"],
  },
  {
    id: "booking",
    name: "AI Booking System",
    outcome: "Enquiries turn into confirmed slots without a phone call.",
    body: "Built for clinics, salons, consultants and fitness studios. Checks real availability, confirms, sends reminders, handles reschedules, and cuts no-shows with a nudge the day before.",
    inputs: ["Calendar", "Reminders", "Reschedule", "No-show nudge"],
  },
  {
    id: "operations",
    name: "AI Operations System",
    outcome: "The paperwork stops waiting for someone to get to it.",
    body: "Reads invoices, forms and documents, pushes the data where it belongs, triggers the next internal step, and produces the weekly report nobody enjoys building by hand.",
    inputs: ["Documents", "Approvals", "Reporting", "Handoffs"],
  },
  {
    id: "growth",
    name: "AI Growth System",
    outcome: "The traffic you already pay for starts converting.",
    body: "Most businesses do not have a traffic problem. We fix the funnel underneath it — intent capture, segmented follow-up, and measurement that shows which channel actually produced revenue.",
    inputs: ["Funnel", "Follow-up", "Attribution", "Review"],
  },
] as const;

export const process = [
  { step: "Discover", note: "We sit with your actual workflow, not a questionnaire." },
  { step: "Map", note: "Every enquiry path drawn out, including the ones that leak." },
  { step: "Design", note: "We decide what the system decides, and what stays human." },
  { step: "Integrate", note: "WhatsApp, CRM, calendar, sheets — wired to what you already use." },
  { step: "Validate", note: "Tested against real enquiries before it touches a customer." },
  { step: "Launch", note: "Live in stages, with a human watching the first week." },
  { step: "Measure", note: "Response time, qualified leads, conversion — instrumented from day one." },
  { step: "Optimize", note: "A monthly read of the numbers, then a change to the system." },
] as const;
