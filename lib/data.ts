// ──────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change the text on the whole website.
//  Everything in [BRACKETS] is a placeholder: replace it.
// ──────────────────────────────────────────────────────────────

export const site = {
  name: 'Abdullahi',
  role: 'Frontend developer',
  url: 'https://your-site.vercel.app', // used for sharing previews
  email: 'hello@example.com',
  whatsapp: '2340000000000', // country code + number, no + or spaces. Leave '' to hide.
  city: '[YOUR CITY]',
  available: true, // shows the green "Available for projects" dot
  /**
   * Contact form: create a free form at https://formspree.io, then paste its
   * URL here (looks like https://formspree.io/f/abcdwxyz).
   * While this is empty, the form opens the visitor's email app instead.
   */
  formEndpoint: '',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
}

export const hero = {
  eyebrow: 'Frontend developer',
  // Words wrapped in *stars* are shown in green italics.
  title: 'Fast, clear websites for businesses that want to be taken *seriously.*',
  text: "I'm Abdullahi. I design and build business websites that load quickly, work on every phone and make it easy for customers to get in touch.",
  facts: [
    { label: 'Based in', value: site.city },
    { label: 'Focus', value: 'Business websites' },
    { label: 'Stack', value: 'React, Next.js, TypeScript' },
    { label: 'Reply time', value: 'Within 24 hours' },
  ],
}

export const tools = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma']

export const services = [
  { title: 'Business websites', text: 'Clear, credible sites that explain what you do and bring in enquiries.' },
  { title: 'Landing pages', text: 'Focused single pages for a product, offer or campaign, built to convert.' },
  { title: 'Interactive web apps', text: 'Dashboards, booking flows and tools with a clean, easy-to-use interface.' },
  { title: 'Redesigns & speed', text: 'Give an old site a fresh look and make it faster on phones.' },
]

export const steps = [
  { title: 'Discover', text: 'We talk through your goals, your customers and what the site must do.' },
  { title: 'Design', text: 'You see the layout first and give feedback before any code is written.' },
  { title: 'Build', text: 'I build it fast and share progress so you can watch it take shape.' },
  { title: 'Launch', text: 'We test everything, go live, and I stay available for fixes.' },
]

export const about = {
  title: 'A developer who treats your website like a *business tool.*',
  p1: `I'm a frontend developer based in ${site.city}. I use HTML, CSS, JavaScript and React with modern tooling to build websites quickly without cutting corners on design.`,
  p2: '[One sentence about what makes you different.]',
  photo: '/me.png', // e.g. '/me.jpg' (put the file inside the /public folder). Empty shows a placeholder.
  facts: [
    { label: 'Works with', value: 'Founders and small businesses' },
    { label: 'Reply time', value: 'Within 24 hours' },
    { label: 'Tools', value: 'React, Next.js, TypeScript, Tailwind' },
    { label: 'Delivery', value: 'Clear timeline, fixed scope' },
  ],
}

export const testimonial = {
  quote: '[A short, real client quote goes here: one or two sentences about the result.]',
  name: 'Client name',
  role: 'Role, Company',
}

export type Project = {
  slug: string // the page address: /work/<slug>
  title: string
  kind: string
  year: string
  tags: string
  summary: string
  client: string
  role: string
  stack: string
  liveUrl: string // '' hides the "Visit live site" link
  image: string // e.g. '/projects/one.png' inside /public. Empty shows a sketch placeholder.
  gallery: string[] // extra screenshots, same rule as above
  challenge: string
  approach: string[]
  results: { value: string; label: string }[]
  quote?: { text: string; by: string }
}

const common = {
  client: '[Client name]',
  role: 'Design & development',
  liveUrl: '',
  image: '',
  gallery: [] as string[],
  challenge: '[What the client struggled with: an outdated site, slow pages on phones, few enquiries.]',
  approach: [
    '[A short paragraph on what you did: the structure and design choices.]',
    '[A second paragraph on how you made it fast and easy to use on phones.]',
  ],
  results: [
    { value: '+00%', label: 'More enquiries in the first month' },
    { value: '0.0s', label: 'Load time on mobile' },
    { value: '0 days', label: 'From first call to launch' },
  ],
  quote: { text: '[Short quote from this client about working with you.]', by: 'Client name, Company' },
}

export const projects: Project[] = [
  { ...common, slug: 'project-one', title: 'Project one', kind: 'Business website', year: '2026', tags: 'Business website · Next.js · Tailwind', stack: 'Next.js, TypeScript, Tailwind', summary: '[One or two sentences: who the client is and what the website achieved for them.]' },
  { ...common, slug: 'project-two', title: 'Project two', kind: 'Landing page', year: '2026', tags: 'Landing page · React · Motion', stack: 'React, Tailwind, Framer Motion', summary: '[One or two sentences: who the client is and what the page achieved for them.]' },
  { ...common, slug: 'project-three', title: 'Project three', kind: 'Web app', year: '2026', tags: 'Web app · TypeScript · Dashboard', stack: 'React, TypeScript', summary: '[One or two sentences: what the app does and who uses it.]' },
  { ...common, slug: 'project-four', title: 'Project four', kind: 'Redesign', year: '2026', tags: 'Redesign · Performance · React', stack: 'Next.js, Tailwind', summary: '[One or two sentences: what changed and how it improved.]' },
]
