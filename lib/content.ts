/**
 * All site copy.
 *
 * Written short on purpose. This is a shopfront for small business owners,
 * most of whom will read it on a phone between other work — the pictures do
 * the explaining, and the words only name what the picture is showing. If a
 * line can go without losing the meaning, it goes.
 */

export const problemCosts = [
  { time: "11:42 pm", channel: "WhatsApp", line: "Asks your price. You are asleep. By 9 am they booked someone else." },
  { time: "2:15 pm", channel: "Missed call", line: "Three in one busy hour. Nobody wrote them down." },
  { time: "Every day", channel: "Repeat questions", line: "The same six answers, forty times. That is a salary." },
  { time: "Day 4", channel: "Follow-up", line: "The quote never got a second message." },
] as const;

export const indiaStats = [
  { value: "535M+", label: "monthly WhatsApp users in India", note: "The biggest market on earth." },
  { value: "98%", label: "WhatsApp open rate", note: "Email sits near twenty." },
  { value: "97%", label: "of Indian MSMEs use it for business", note: "So it is the main pipe, not an add-on." },
  { value: "73%", label: "of Indian SMEs already run an AI tool", note: "Up from 38% in 2023." },
] as const;

/** The spine of the site. Each stage drives one act of the scroll diagram. */
export const stages = [
  {
    id: "capture",
    index: "01",
    title: "Capture",
    claim: "Nothing gets to disappear.",
    body: "WhatsApp, forms, missed calls, DMs — all into one intake that never sleeps.",
    proof: "First reply in seconds, at 2 am on a Sunday.",
  },
  {
    id: "automate",
    index: "02",
    title: "Automate",
    claim: "The repetitive part stops touching a human.",
    body: "Qualify, write to the CRM, send the quote, book the slot, chase the follow-up.",
    proof: "Your team handles the ten that matter, not the hundred that do not.",
  },
  {
    id: "optimize",
    index: "03",
    title: "Optimize",
    claim: "It gets better every month, on purpose.",
    body: "We measure where enquiries stall, then change the system — not the button text.",
    proof: "You can point at the number that moved and say why.",
  },
] as const;

export const systems = [
  {
    id: "lead",
    name: "AI Lead System",
    outcome: "Every enquiry gets a real answer, even at 11 pm.",
    body: "Captures from WhatsApp, forms, calls and social. Qualifies, scores intent, routes the serious ones to a human with the context already written down.",
  },
  {
    id: "customer",
    name: "AI Customer System",
    outcome: "Your team stops answering the same six questions.",
    body: "Handles price, timing, availability and documents in your own words. Hands over to a person the moment it should.",
  },
  {
    id: "booking",
    name: "AI Booking System",
    outcome: "Enquiries turn into confirmed slots without a phone call.",
    body: "Checks real availability, confirms, reminds, and handles reschedules in the same thread.",
  },
  {
    id: "operations",
    name: "AI Operations System",
    outcome: "The paperwork stops waiting for someone to get to it.",
    body: "Reads invoices and forms, puts the data where it belongs, and writes the weekly report.",
  },
  {
    id: "growth",
    name: "AI Growth System",
    outcome: "The traffic you already pay for starts converting.",
    body: "Fixes the funnel under the traffic: intent capture, segmented follow-up, and measurement that shows what actually paid.",
  },
] as const;

export const process = [
  { step: "Discover", note: "Your actual workflow, not a questionnaire." },
  { step: "Map", note: "Every enquiry path drawn, including the leaks." },
  { step: "Design", note: "What the system decides, what stays human." },
  { step: "Integrate", note: "Wired to the tools you already use." },
  { step: "Validate", note: "Tested on real enquiries first." },
  { step: "Launch", note: "In stages, watched for a week." },
  { step: "Measure", note: "Instrumented from day one." },
  { step: "Optimize", note: "Monthly read, then a change." },
] as const;

/** Who we build for. Positioning, not a claim about past work. */
export const sectors = [
  { name: "Clinics and dental", line: "Bookings and reminders without tying up the front desk.", glyph: "calendar" },
  { name: "Interiors and contractors", line: "Qualify budget before anyone drives to a site visit.", glyph: "rule" },
  { name: "Salons and fitness", line: "Fill slots from WhatsApp, cut no-shows.", glyph: "clock" },
  { name: "Consultants and coaches", line: "Only conversations worth having reach your calendar.", glyph: "person" },
  { name: "Schools and tuition", line: "Admission questions answered at the hour parents ask.", glyph: "chat" },
  { name: "Local services and repair", line: "Catch the missed call, capture the job.", glyph: "phone" },
] as const;

/**
 * How an engagement is shaped. No prices: we quote after mapping, and we
 * would rather say that plainly than publish a number we would walk back.
 */
export const engagements = [
  {
    name: "Mapping",
    shape: "One to two weeks",
    body: "We draw every path an enquiry can take and mark where it leaks. The map is yours either way.",
    gives: ["A drawn map of your enquiry flow", "The three leaks worth fixing first", "A fixed quote for the build"],
  },
  {
    name: "The build",
    shape: "Three to five weeks, fixed price",
    body: "One system, wired to your tools, tested on real enquiries, launched in stages with a human watching.",
    gives: ["A working system in your accounts", "Your team trained on the handovers", "A human escalation path from day one"],
  },
  {
    name: "Keeping it sharp",
    shape: "Monthly, cancel anytime",
    body: "We read the numbers with you each month and change the system.",
    gives: ["A monthly read of what converted", "Changes made, not just recommended", "You keep everything if you stop"],
  },
] as const;
