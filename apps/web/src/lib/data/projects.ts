export const projects: Project[] = [
  {
    id: '1',
    title: 'Elevate Media University',
    slug: 'elevate-media-university',
    description:
      'A full-stack university management platform with dedicated portals for students, teachers and administrators — course management, attendance, results and digital learning.',
    long_description:
      'Elevate Media University is a complete institution management platform built to modernize the academic experience. It ships with three dedicated role-based portals: students can enrol in courses, view results and access learning materials; staff can manage classes, mark attendance and update grades; administrators get a full analytics dashboard with user and department management. The platform uses serverless API routes for rapid iteration and a PostgreSQL database for reliable, structured storage with Auth.js-powered JWT sessions for secure role-based access.',
    image_url: '/projects/elevate-media-university/shot-1.png',
    screenshots: [
      '/projects/elevate-media-university/shot-1.png',
      '/projects/elevate-media-university/shot-2.png',
      '/projects/elevate-media-university/shot-3.png',
      '/projects/elevate-media-university/shot-4.png',
      '/projects/elevate-media-university/shot-5.png',
      '/projects/elevate-media-university/shot-6.png'
    ],
    demo_url: null,
    github_url: null,
    tech_tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma', 'Auth.js'],
    category: 'Web Application',
    featured: true,
    order: 1,
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-06-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Civic Compliance Hub',
    slug: 'civic-compliance-system',
    description:
      'A civic participation and compliance platform for Kenya — legal awareness tools, compliance tracking, incident reporting and responsive analytics dashboards.',
    long_description:
      'Civic Compliance Hub is built for civic organizations and the public: a bilingual (English/Kiswahili) platform that raises legal awareness, provides compliance-maturity self-assessment tools, monitors civic space through incident reporting and visualises trends with interactive charts. It features a friendly AI legal-assistant chatbot that answers frequently asked questions around civic rights and compliance obligations.',
    image_url: '/projects/civic-compliance-system/front-page.png',
    screenshots: [
      '/projects/civic-compliance-system/front-page.png',
      '/projects/civic-compliance-system/screenshot-121.png',
      '/projects/civic-compliance-system/screenshot-122.png',
      '/projects/civic-compliance-system/screenshot-123.png',
      '/projects/civic-compliance-system/screenshot-124.png',
      '/projects/civic-compliance-system/screenshot-125.png'
    ],
    demo_url: 'https://civiccompliancehub.gt.tc/',
    github_url: null,
    tech_tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Chart.js', 'jQuery'],
    category: 'Civic Platform',
    featured: true,
    order: 2,
    created_at: '2025-03-01T00:00:00Z',
    updated_at: '2025-08-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'Student Management System',
    slug: 'student-management-system',
    description:
      'A student management platform with an interactive 3D campus, live timetables, digital library and a powerful admin dashboard — powered by Three.js.',
    long_description:
      'This platform reimagines the student portal with an immersive rendered 3D campus that students can explore, paired with practical everyday tools: live timetables, a searchable digital library and a comprehensive admin dashboard for academic records. Built with a custom vanilla-JavaScript design system and Three.js 3D rendering (with a graceful 2D fallback), it demonstrates performance-conscious engineering without heavyweight frameworks.',
    image_url: '/projects/student-management-system/front-page.png',
    screenshots: [
      '/projects/student-management-system/front-page.png',
      '/projects/student-management-system/screenshot-127.png',
      '/projects/student-management-system/screenshot-128.png',
      '/projects/student-management-system/screenshot-129.png',
      '/projects/student-management-system/screenshot-130.png',
      '/projects/student-management-system/screenshot-131.png',
      '/projects/student-management-system/screenshot-132.png'
    ],
    demo_url: 'https://studentmanagement.gt.tc/',
    github_url: null,
    tech_tags: ['JavaScript', 'Three.js', 'HTML5', 'CSS3', 'PHP', 'MySQL'],
    category: 'Web Application',
    featured: true,
    order: 3,
    created_at: '2025-05-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'TrackSpend',
    slug: 'trackspend-native',
    description:
      'A personal finance app in development, designed to make everyday transaction tracking, budgeting and money management clearer on Android.',
    long_description:
      'TrackSpend is Elevate Media Productions’ Android finance product. Its development focuses on practical expense tracking, budgeting, secure account access and a clear mobile experience.',
    image_url: '/projects/thumbs/trackspend.jpg',
    screenshots: [],
    demo_url: null,
    github_url: null,
    tech_tags: ['Kotlin', 'Jetpack Compose', 'Supabase', 'Android', 'Gradle'],
    category: 'Mobile App',
    featured: true,
    order: 4,
    created_at: '2025-07-01T00:00:00Z',
    updated_at: '2025-09-10T00:00:00Z'
  },
  {
    id: '5',
    title: 'Elevate Media Productions',
    slug: 'elevate-media-productions',
    description:
      'The Elevate Media Productions studio website — a digital home for the studio, its services and selected product work.',
    long_description:
      'The Elevate Media Productions brand website presents the studio’s services, selected projects and ways to start a conversation. It is built with SvelteKit and Tailwind CSS.',
    image_url: '/projects/elevate-media-productions/front-page.png',
    screenshots: [
      '/projects/elevate-media-productions/front-page.png',
      '/projects/elevate-media-productions/screenshot-134.png',
      '/projects/elevate-media-productions/screenshot-135.png',
      '/projects/elevate-media-productions/screenshot-136.png',
      '/projects/elevate-media-productions/screenshot-137.png',
      '/projects/elevate-media-productions/screenshot-138.png',
      '/projects/elevate-media-productions/screenshot-139.png',
      '/projects/elevate-media-productions/screenshot-140.png'
    ],
    demo_url: null,
    github_url: null,
    tech_tags: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Motion'],
    category: 'Brand Platform',
    featured: true,
    order: 0,
    created_at: '2025-09-11T00:00:00Z',
    updated_at: '2025-09-11T00:00:00Z'
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectCategories(): string[] {
  return [...new Set(projects.map((p) => p.category))];
}

export function getAllTechTags(): string[] {
  return [...new Set(projects.flatMap((p) => p.tech_tags))];
}