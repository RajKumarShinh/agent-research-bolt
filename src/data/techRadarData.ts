import { TechRadarItem } from '../types';

export const techRadarData: TechRadarItem[] = [
  // Development Tools
  {
    id: '1',
    name: 'React',
    category: 'Development',
    status: 'Adopt',
    description: 'Component-based JavaScript library for building user interfaces with excellent ecosystem and community support.',
    lastUpdated: new Date('2025-01-10'),
    maturityLevel: 'Stable',
    website: 'https://react.dev',
    tags: ['Frontend', 'JavaScript', 'UI', 'Component-based'],
    adoptionLevel: 95
  },
  {
    id: '2',
    name: 'Next.js',
    category: 'Development',
    status: 'Adopt',
    description: 'Full-stack React framework with built-in SSR, routing, and optimization features for production applications.',
    lastUpdated: new Date('2025-01-12'),
    maturityLevel: 'Stable',
    website: 'https://nextjs.org',
    tags: ['React', 'Full-stack', 'SSR', 'Framework'],
    adoptionLevel: 88
  },
  {
    id: '3',
    name: 'Svelte',
    category: 'Development',
    status: 'Trial',
    description: 'Compile-time optimized framework that produces highly efficient vanilla JavaScript with minimal runtime overhead.',
    lastUpdated: new Date('2025-01-08'),
    maturityLevel: 'Stable',
    website: 'https://svelte.dev',
    tags: ['Frontend', 'Compile-time', 'Performance', 'Minimal'],
    adoptionLevel: 65
  },
  {
    id: '4',
    name: 'Angular',
    category: 'Development',
    status: 'Hold',
    description: 'Enterprise-grade TypeScript framework with comprehensive tooling but high complexity for modern projects.',
    lastUpdated: new Date('2025-01-05'),
    maturityLevel: 'Stable',
    website: 'https://angular.io',
    tags: ['TypeScript', 'Enterprise', 'Full-featured', 'Google'],
    adoptionLevel: 45
  },

  // Testing Tools
  {
    id: '5',
    name: 'Vitest',
    category: 'Testing',
    status: 'Adopt',
    description: 'Lightning-fast unit testing framework powered by Vite with excellent TypeScript and ESM support.',
    lastUpdated: new Date('2025-01-11'),
    maturityLevel: 'Stable',
    website: 'https://vitest.dev',
    tags: ['Unit Testing', 'Vite', 'TypeScript', 'Fast'],
    adoptionLevel: 85
  },
  {
    id: '6',
    name: 'Playwright',
    category: 'Testing',
    status: 'Adopt',
    description: 'Cross-browser end-to-end testing with excellent developer experience and reliable test execution.',
    lastUpdated: new Date('2025-01-09'),
    maturityLevel: 'Stable',
    website: 'https://playwright.dev',
    tags: ['E2E Testing', 'Cross-browser', 'Automation', 'Microsoft'],
    adoptionLevel: 82
  },
  {
    id: '7',
    name: 'Cypress',
    category: 'Testing',
    status: 'Trial',
    description: 'Developer-friendly E2E testing with time-travel debugging but limited cross-browser support.',
    lastUpdated: new Date('2025-01-07'),
    maturityLevel: 'Stable',
    website: 'https://cypress.io',
    tags: ['E2E Testing', 'Developer Experience', 'Debugging'],
    adoptionLevel: 72
  },
  {
    id: '8',
    name: 'Selenium',
    category: 'Testing',
    status: 'Hold',
    description: 'Legacy browser automation tool with complex setup and maintenance overhead for modern workflows.',
    lastUpdated: new Date('2024-12-15'),
    maturityLevel: 'Legacy',
    website: 'https://selenium.dev',
    tags: ['Browser Automation', 'Legacy', 'Complex Setup'],
    adoptionLevel: 35
  },

  // DevOps Tools
  {
    id: '9',
    name: 'Docker',
    category: 'DevOps',
    status: 'Adopt',
    description: 'Containerization platform that ensures consistent environments across development and production.',
    lastUpdated: new Date('2025-01-13'),
    maturityLevel: 'Stable',
    website: 'https://docker.com',
    tags: ['Containerization', 'Deployment', 'Infrastructure'],
    adoptionLevel: 92
  },
  {
    id: '10',
    name: 'Kubernetes',
    category: 'DevOps',
    status: 'Trial',
    description: 'Container orchestration platform for managing complex deployments at scale with steep learning curve.',
    lastUpdated: new Date('2025-01-10'),
    maturityLevel: 'Stable',
    website: 'https://kubernetes.io',
    tags: ['Orchestration', 'Scaling', 'Complex', 'Production'],
    adoptionLevel: 68
  },
  {
    id: '11',
    name: 'GitHub Actions',
    category: 'DevOps',
    status: 'Adopt',
    description: 'Native CI/CD solution with excellent GitHub integration and extensive marketplace of actions.',
    lastUpdated: new Date('2025-01-12'),
    maturityLevel: 'Stable',
    website: 'https://github.com/features/actions',
    tags: ['CI/CD', 'GitHub', 'Automation', 'Workflows'],
    adoptionLevel: 87
  },
  {
    id: '12',
    name: 'Jenkins',
    category: 'DevOps',
    status: 'Hold',
    description: 'Traditional CI/CD server with extensive plugins but complex maintenance and security concerns.',
    lastUpdated: new Date('2024-12-20'),
    maturityLevel: 'Legacy',
    website: 'https://jenkins.io',
    tags: ['CI/CD', 'Legacy', 'Plugins', 'Maintenance'],
    adoptionLevel: 40
  },

  // Project Management
  {
    id: '13',
    name: 'Linear',
    category: 'Project Management',
    status: 'Adopt',
    description: 'Modern issue tracking with exceptional performance, clean UI, and developer-focused workflow.',
    lastUpdated: new Date('2025-01-11'),
    maturityLevel: 'Stable',
    website: 'https://linear.app',
    tags: ['Issue Tracking', 'Modern UI', 'Performance', 'Developer-focused'],
    adoptionLevel: 78
  },
  {
    id: '14',
    name: 'Notion',
    category: 'Project Management',
    status: 'Trial',
    description: 'All-in-one workspace combining docs, databases, and project management with flexible but complex structure.',
    lastUpdated: new Date('2025-01-09'),
    maturityLevel: 'Stable',
    website: 'https://notion.so',
    tags: ['Documentation', 'Databases', 'All-in-one', 'Flexible'],
    adoptionLevel: 71
  },
  {
    id: '15',
    name: 'Jira',
    category: 'Project Management',
    status: 'Hold',
    description: 'Enterprise project management with powerful features but overwhelming interface and slow performance.',
    lastUpdated: new Date('2024-12-18'),
    maturityLevel: 'Stable',
    website: 'https://atlassian.com/jira',
    tags: ['Enterprise', 'Complex', 'Powerful', 'Slow'],
    adoptionLevel: 48
  },

  // Design Tools
  {
    id: '16',
    name: 'Figma',
    category: 'Design',
    status: 'Adopt',
    description: 'Collaborative design platform with excellent real-time editing, prototyping, and developer handoff.',
    lastUpdated: new Date('2025-01-12'),
    maturityLevel: 'Stable',
    website: 'https://figma.com',
    tags: ['Design', 'Collaboration', 'Prototyping', 'Real-time'],
    adoptionLevel: 91
  },
  {
    id: '17',
    name: 'Framer',
    category: 'Design',
    status: 'Trial',
    description: 'Advanced prototyping tool with code components and interactive animations for complex interactions.',
    lastUpdated: new Date('2025-01-08'),
    maturityLevel: 'Stable',
    website: 'https://framer.com',
    tags: ['Prototyping', 'Animations', 'Code Components', 'Interactive'],
    adoptionLevel: 58
  },
  {
    id: '18',
    name: 'Adobe XD',
    category: 'Design',
    status: 'Hold',
    description: 'Adobe\'s design tool with declining market share and limited innovation compared to competitors.',
    lastUpdated: new Date('2024-11-15'),
    maturityLevel: 'Stable',
    website: 'https://adobe.com/xd',
    tags: ['Adobe', 'Declining', 'Limited Innovation'],
    adoptionLevel: 25
  },

  // Database
  {
    id: '19',
    name: 'PostgreSQL',
    category: 'Database',
    status: 'Adopt',
    description: 'Robust open-source relational database with advanced features, JSON support, and excellent performance.',
    lastUpdated: new Date('2025-01-10'),
    maturityLevel: 'Stable',
    website: 'https://postgresql.org',
    tags: ['Relational', 'Open Source', 'JSON', 'Performance'],
    adoptionLevel: 89
  },
  {
    id: '20',
    name: 'Supabase',
    category: 'Database',
    status: 'Trial',
    description: 'Open-source Firebase alternative with PostgreSQL, real-time subscriptions, and built-in auth.',
    lastUpdated: new Date('2025-01-11'),
    maturityLevel: 'Emerging',
    website: 'https://supabase.com',
    tags: ['Backend-as-a-Service', 'PostgreSQL', 'Real-time', 'Auth'],
    adoptionLevel: 67
  },
  {
    id: '21',
    name: 'MongoDB',
    category: 'Database',
    status: 'Assess',
    description: 'Document database with flexible schema but potential consistency and performance challenges.',
    lastUpdated: new Date('2025-01-06'),
    maturityLevel: 'Stable',
    website: 'https://mongodb.com',
    tags: ['Document DB', 'NoSQL', 'Flexible Schema'],
    adoptionLevel: 55
  },

  // Infrastructure
  {
    id: '22',
    name: 'Vercel',
    category: 'Infrastructure',
    status: 'Adopt',
    description: 'Seamless deployment platform optimized for frontend frameworks with excellent DX and global CDN.',
    lastUpdated: new Date('2025-01-13'),
    maturityLevel: 'Stable',
    website: 'https://vercel.com',
    tags: ['Deployment', 'Frontend', 'CDN', 'Developer Experience'],
    adoptionLevel: 83
  },
  {
    id: '23',
    name: 'Railway',
    category: 'Infrastructure',
    status: 'Trial',
    description: 'Simple deployment platform with great developer experience for full-stack applications.',
    lastUpdated: new Date('2025-01-09'),
    maturityLevel: 'Emerging',
    website: 'https://railway.app',
    tags: ['Deployment', 'Full-stack', 'Simple', 'DX'],
    adoptionLevel: 62
  },
  {
    id: '24',
    name: 'AWS EC2',
    category: 'Infrastructure',
    status: 'Assess',
    description: 'Flexible cloud computing with extensive options but complex pricing and management overhead.',
    lastUpdated: new Date('2025-01-05'),
    maturityLevel: 'Stable',
    website: 'https://aws.amazon.com/ec2',
    tags: ['Cloud', 'Flexible', 'Complex', 'Enterprise'],
    adoptionLevel: 52
  },

  // Security
  {
    id: '25',
    name: 'Auth0',
    category: 'Security',
    status: 'Adopt',
    description: 'Comprehensive authentication and authorization platform with excellent security and ease of integration.',
    lastUpdated: new Date('2025-01-11'),
    maturityLevel: 'Stable',
    website: 'https://auth0.com',
    tags: ['Authentication', 'Authorization', 'Security', 'Integration'],
    adoptionLevel: 79
  },
  {
    id: '26',
    name: 'Clerk',
    category: 'Security',
    status: 'Trial',
    description: 'Modern authentication solution with great DX, beautiful UI components, and developer-first approach.',
    lastUpdated: new Date('2025-01-10'),
    maturityLevel: 'Emerging',
    website: 'https://clerk.com',
    tags: ['Authentication', 'Modern', 'UI Components', 'Developer-first'],
    adoptionLevel: 64
  },

  // Monitoring
  {
    id: '27',
    name: 'Sentry',
    category: 'Monitoring',
    status: 'Adopt',
    description: 'Application monitoring and error tracking with excellent debugging capabilities and performance insights.',
    lastUpdated: new Date('2025-01-12'),
    maturityLevel: 'Stable',
    website: 'https://sentry.io',
    tags: ['Error Tracking', 'Monitoring', 'Debugging', 'Performance'],
    adoptionLevel: 86
  },
  {
    id: '28',
    name: 'Datadog',
    category: 'Monitoring',
    status: 'Trial',
    description: 'Comprehensive monitoring platform with powerful analytics but high cost for smaller teams.',
    lastUpdated: new Date('2025-01-08'),
    maturityLevel: 'Stable',
    website: 'https://datadoghq.com',
    tags: ['Monitoring', 'Analytics', 'Expensive', 'Enterprise'],
    adoptionLevel: 58
  },

  // Communication
  {
    id: '29',
    name: 'Discord',
    category: 'Communication',
    status: 'Adopt',
    description: 'Modern communication platform with excellent voice quality, screen sharing, and community features.',
    lastUpdated: new Date('2025-01-13'),
    maturityLevel: 'Stable',
    website: 'https://discord.com',
    tags: ['Communication', 'Voice', 'Screen Sharing', 'Community'],
    adoptionLevel: 84
  },
  {
    id: '30',
    name: 'Slack',
    category: 'Communication',
    status: 'Assess',
    description: 'Business communication platform with good integrations but can become noisy and distracting.',
    lastUpdated: new Date('2025-01-07'),
    maturityLevel: 'Stable',
    website: 'https://slack.com',
    tags: ['Business', 'Integrations', 'Noisy', 'Enterprise'],
    adoptionLevel: 61
  }
];

export const TECH_CATEGORIES = [
  'Development',
  'Testing',
  'DevOps',
  'Project Management',
  'Design',
  'Database',
  'Infrastructure',
  'Security',
  'Monitoring',
  'Communication'
] as const;

export const TECH_STATUSES = ['Adopt', 'Trial', 'Assess', 'Hold'] as const;
export const MATURITY_LEVELS = ['Emerging', 'Stable', 'Legacy'] as const;