export const site = {
  name: 'Elevate Media Productions',
  shortName: 'Elevate Media',
  tagline: 'Digital products, thoughtfully built.',
  description:
    'Elevate Media Productions designs and builds web applications, mobile products and digital experiences for ambitious businesses.',
  email: 'elevatemediaproductions1@gmail.com',
  whatsapp: 'https://wa.me/254775333673',
  phone: 'tel:+254111275630',
  github: 'https://github.com/em757896-alt/elevate-media-productions',
  reddit: 'https://www.reddit.com/user/ElevateMediaProd/',
  linkedin: 'https://www.linkedin.com',
  discord: 'https://discord.com',
  repoUrl: 'https://github.com/em757896-alt/elevate-media-productions'
} as const;

export const nav = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/portfolio' },
    { label: 'Capabilities', href: '/skills' },
    { label: 'Contact', href: '/contact' }
  ],
  footer: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Capabilities', href: '/skills' },
    { label: 'Contact', href: '/contact' }
  ]
} as const;

export const stats = [
  { value: '5', label: 'Products shipped' },
  { value: '5+', label: 'Technologies mastered' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '2026', label: 'Founded' }
] as const;

export const services = [
  {
    title: 'Web Applications',
    description: 'Full-stack platforms from idea to production — portals, dashboards and tools designed around real business needs.',
    icon: 'globe',
    features: ['SvelteKit & React', 'REST APIs', 'Responsive interfaces', 'Role-based portals']
  },
  {
    title: 'Mobile Apps',
    description: 'Native Android applications engineered for performance, privacy and intuitive everyday use.',
    icon: 'smartphone',
    features: ['Kotlin & Jetpack Compose', 'Biometric security', 'Offline-first sync', 'Android integrations']
  },
  {
    title: 'Digital Product Design',
    description: 'Clear product thinking and cohesive interfaces that make complex tools easier to use.',
    icon: 'pen-tool',
    features: ['UI / UX design', 'Design systems', 'Accessible interfaces', 'Prototyping']
  },
  {
    title: 'Backend & Integrations',
    description: 'Reliable application foundations that connect services, data and the workflows people depend on.',
    icon: 'database',
    features: ['API development', 'Database design', 'Authentication', 'Third-party integrations']
  },
  {
    title: 'Performance Engineering',
    description: 'Faster, more resilient digital experiences through thoughtful architecture and focused optimization.',
    icon: 'zap',
    features: ['Core Web Vitals', 'Image optimization', 'Caching strategy', 'Accessibility audits']
  },
  {
    title: 'Ongoing Product Support',
    description: 'Practical post-launch improvements that keep products secure, stable and useful as needs evolve.',
    icon: 'shield-check',
    features: ['Maintenance', 'Security updates', 'Bug fixes', 'Feature improvements']
  }
] as const;

export const skills = [
  {
    category: 'Frontend',
    icon: 'layout',
    items: [
      { name: 'Svelte / SvelteKit', level: 90 },
      { name: 'React / Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'JavaScript', level: 92 }
    ]
  },
  {
    category: 'Backend & Data',
    icon: 'database',
    items: [
      { name: 'PHP', level: 80 },
      { name: 'Node.js', level: 84 },
      { name: 'Supabase / PostgreSQL', level: 86 },
      { name: 'MySQL', level: 78 },
      { name: 'REST APIs', level: 88 }
    ]
  },
  {
    category: 'Mobile',
    icon: 'smartphone',
    items: [
      { name: 'Kotlin', level: 82 },
      { name: 'Jetpack Compose', level: 84 },
      { name: 'Android SDK', level: 80 },
      { name: 'Biometric & Secure Storage', level: 75 }
    ]
  },
  {
    category: 'Design & Motion',
    icon: 'palette',
    items: [
      { name: 'UI / UX Design', level: 87 },
      { name: 'Design Systems', level: 85 },
      { name: 'Three.js / WebGL', level: 76 },
      { name: 'Motion Design', level: 80 },
      { name: 'Figma', level: 82 }
    ]
  }
] as const;

export const workflow = [
  { step: '01', title: 'Discover', description: 'We understand the problem, users and business goals before choosing a solution.' },
  { step: '02', title: 'Design', description: 'We shape the experience, validate key decisions and create a clear implementation plan.' },
  { step: '03', title: 'Build', description: 'We develop in focused increments, keeping quality, security and usability in view.' },
  { step: '04', title: 'Improve', description: 'We refine the product through testing, performance work and practical post-launch support.' }
] as const;

export const faqs = [
  { question: 'What kind of projects does Elevate Media take on?', answer: 'We design and build web applications, native Android apps and custom digital products for organizations and growing businesses.' },
  { question: 'How long does a typical project take?', answer: 'Timelines depend on scope. We break larger work into clear milestones and agree on deliverables before development begins.' },
  { question: 'Do you work with clients outside Kenya?', answer: 'Yes. We collaborate remotely and can work with clients across different time zones.' },
  { question: 'Can you maintain a project after launch?', answer: 'Yes. Support can include maintenance, security updates, performance improvements and feature development.' },
  { question: 'How do we get started?', answer: 'Send us a short description of your goals through the contact page. We will review the brief and discuss the next step.' }
] as const;

export const team = [
  {
    name: 'Emmanuel Michael',
    role: 'Founder & Lead Developer',
    bio: 'Building web applications, mobile products and useful digital experiences.',
    initials: 'EM',
    gradient: 'linear-gradient(135deg, #6c5cf8, #8b5cf6)'
  }
] as const;