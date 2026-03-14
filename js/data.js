const SITE = {
  name: "TalentBridge",
  tagline: "Find your next role. No noise, just opportunity.",
  description: "Browse hand-verified listings from top companies hiring right now.",
  stats: [
    { value: "4,280", label: "open roles" },
    { value: "820",   label: "companies" },
    { value: "340",   label: "remote positions" }
  ],
  navLinks: [
    { label: "Find Jobs",  href: "#",          active: true  },
    { label: "Companies",  href: "#companies", active: false },
    { label: "Salaries",   href: "#salaries",  active: false },
    { label: "Resources",  href: "#resources", active: false }
  ]
};

const FILTERS_CONFIG = {
  jobTypes: [
    { id: "full-time",  label: "Full-time",  count: 182 },
    { id: "part-time",  label: "Part-time",  count: 43  },
    { id: "contract",   label: "Contract",   count: 67  },
    { id: "internship", label: "Internship", count: 28  }
  ],
  workModes: [
    { id: "remote",  label: "Remote",  count: 340 },
    { id: "hybrid",  label: "Hybrid",  count: 215 },
    { id: "on-site", label: "On-site", count: 265 }
  ],
  experienceLevels: [
    { id: "entry",  label: "Entry Level",    count: 94  },
    { id: "mid",    label: "Mid Level",      count: 156 },
    { id: "senior", label: "Senior",         count: 201 },
    { id: "lead",   label: "Lead / Manager", count: 87  }
  ],
  categories: [
    { id: "engineering",    label: "Engineering",      count: 312 },
    { id: "design",         label: "Design",           count: 98  },
    { id: "product",        label: "Product",          count: 74  },
    { id: "marketing",      label: "Marketing",        count: 61  },
    { id: "data-analytics", label: "Data & Analytics", count: 89  }
  ],
  salaryRange: { min: 40000, max: 300000, step: 10000 },
  sortOptions: [
    { value: "recent",    label: "Most Recent"    },
    { value: "salary",    label: "Highest Salary" },
    { value: "relevance", label: "Relevance"      }
  ],
  locations: [
    { value: "",              label: "All Locations"     },
    { value: "remote",        label: "Remote"            },
    { value: "new-york",      label: "New York, NY"      },
    { value: "san-francisco", label: "San Francisco, CA" },
    { value: "austin",        label: "Austin, TX"        },
    { value: "london",        label: "London, UK"        },
    { value: "dublin",        label: "Dublin, Ireland"   },
    { value: "atlanta",       label: "Atlanta, GA"       }
  ]
};

const LOGO_COLORS = {
  VC: "#000000", LN: "#5E6AD2", ST: "#635BFF", NO: "#000000",
  FG: "#1ABCFE", LM: "#625DF5", SP: "#1DB954", WF: "#146EF5",
  GL: "#FC6D26", IC: "#1F8DED", SB: "#3ECF8E", MC: "#FFE01B"
};

const LOGO_TEXT_COLORS = {
  MC: "#000000"
};

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Vercel",
    logo: "VC",
    location: "Remote",
    locationKey: "remote",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Remote",
    modeKey: "remote",
    level: "Senior",
    levelKey: "senior",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$140k – $175k",
    salaryMin: 140000,
    salaryMax: 175000,
    posted: "2 days ago",
    featured: true,
    tags: ["React", "TypeScript", "Next.js", "CSS"],
    description: "Join the team building the world's fastest frontend deployment platform. You'll own critical parts of our dashboard and developer tooling.",
    responsibilities: [
      "Lead frontend architecture decisions and establish best practices",
      "Build performant, accessible UI components used by 1M+ developers",
      "Mentor junior engineers and conduct thorough code reviews",
      "Collaborate with design to implement pixel-perfect interfaces"
    ],
    requirements: [
      "5+ years of frontend engineering experience",
      "Deep expertise in React, TypeScript, and CSS",
      "Strong understanding of web performance and accessibility",
      "Experience with design systems and component libraries"
    ]
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Linear",
    logo: "LN",
    location: "San Francisco, CA",
    locationKey: "san-francisco",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Hybrid",
    modeKey: "hybrid",
    level: "Mid",
    levelKey: "mid",
    category: "Design",
    categoryKey: "design",
    salary: "$120k – $150k",
    salaryMin: 120000,
    salaryMax: 150000,
    posted: "1 day ago",
    featured: false,
    tags: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    description: "Shape the future of project management tooling. We care deeply about craftsmanship and are looking for a designer who does too.",
    responsibilities: [
      "Own end-to-end design for key product areas",
      "Conduct user research and synthesise findings into product decisions",
      "Maintain and expand our design system",
      "Work closely with engineering to ensure quality implementation"
    ],
    requirements: [
      "3+ years of product design experience at a SaaS company",
      "Expert-level Figma skills",
      "Portfolio demonstrating complex product thinking",
      "Experience running usability tests and user interviews"
    ]
  },
  {
    id: 3,
    title: "Backend Engineer — Node.js",
    company: "Stripe",
    logo: "ST",
    location: "New York, NY",
    locationKey: "new-york",
    type: "Full-time",
    typeKey: "full-time",
    mode: "On-site",
    modeKey: "on-site",
    level: "Mid",
    levelKey: "mid",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$160k – $200k",
    salaryMin: 160000,
    salaryMax: 200000,
    posted: "3 days ago",
    featured: true,
    tags: ["Node.js", "PostgreSQL", "Redis", "AWS"],
    description: "Help build the financial infrastructure that powers millions of businesses globally. You'll work on high-throughput, mission-critical systems.",
    responsibilities: [
      "Design and implement scalable APIs used by millions of developers",
      "Own the reliability and performance of critical payment services",
      "Participate in on-call rotations and incident response",
      "Drive technical architecture decisions within your team"
    ],
    requirements: [
      "4+ years backend engineering with Node.js or similar",
      "Experience with distributed systems and high-scale databases",
      "Strong understanding of REST and API design principles",
      "Financial or payments domain experience a plus"
    ]
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Notion",
    logo: "NO",
    location: "Remote",
    locationKey: "remote",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Remote",
    modeKey: "remote",
    level: "Entry",
    levelKey: "entry",
    category: "Data & Analytics",
    categoryKey: "data-analytics",
    salary: "$80k – $110k",
    salaryMin: 80000,
    salaryMax: 110000,
    posted: "5 days ago",
    featured: false,
    tags: ["SQL", "Python", "Tableau", "dbt"],
    description: "Translate data into clear stories that guide product and business decisions. You'll be embedded with the growth team.",
    responsibilities: [
      "Build and maintain dashboards used by leadership and product teams",
      "Define and track KPIs for product experiments",
      "Conduct ad-hoc analysis to answer business questions",
      "Partner with engineering to improve data quality and pipelines"
    ],
    requirements: [
      "1–2 years of analytical experience",
      "Strong SQL and at least one BI tool (Tableau, Looker, etc.)",
      "Ability to communicate data clearly to non-technical stakeholders",
      "Python or R experience is a plus"
    ]
  },
  {
    id: 5,
    title: "Engineering Manager",
    company: "Figma",
    logo: "FG",
    location: "Austin, TX",
    locationKey: "austin",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Hybrid",
    modeKey: "hybrid",
    level: "Lead",
    levelKey: "lead",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$190k – $240k",
    salaryMin: 190000,
    salaryMax: 240000,
    posted: "4 days ago",
    featured: false,
    tags: ["Leadership", "React", "WebGL", "C++"],
    description: "Lead a team of 6–8 engineers working on Figma's core editor infrastructure. You'll balance technical direction with people development.",
    responsibilities: [
      "Manage and grow a team of senior engineers",
      "Define technical roadmap in partnership with Product and Design",
      "Drive cross-team initiatives and resolve blockers",
      "Conduct performance reviews and career planning"
    ],
    requirements: [
      "3+ years of engineering management experience",
      "Strong technical background in frontend or systems engineering",
      "Proven track record of hiring and developing senior engineers",
      "Exceptional communication and stakeholder management skills"
    ]
  },
  {
    id: 6,
    title: "Growth Marketing Manager",
    company: "Loom",
    logo: "LM",
    location: "London, UK",
    locationKey: "london",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Remote",
    modeKey: "remote",
    level: "Mid",
    levelKey: "mid",
    category: "Marketing",
    categoryKey: "marketing",
    salary: "$90k – $120k",
    salaryMin: 90000,
    salaryMax: 120000,
    posted: "1 week ago",
    featured: false,
    tags: ["SEO", "Paid Ads", "Analytics", "A/B Testing"],
    description: "Own acquisition channels and help Loom reach the next 10M users. You'll run rapid experiments across paid and organic channels.",
    responsibilities: [
      "Own and grow paid acquisition channels (Google, LinkedIn, Meta)",
      "Design and run A/B experiments to improve conversion funnels",
      "Work with content team to drive organic SEO growth",
      "Report weekly on channel performance to leadership"
    ],
    requirements: [
      "3+ years in growth or performance marketing",
      "Hands-on experience with Google Ads, Meta Ads Manager",
      "Analytical mindset with strong Excel / Google Sheets skills",
      "Experience in a high-growth B2B SaaS company preferred"
    ]
  },
  {
    id: 7,
    title: "iOS Engineer",
    company: "Spotify",
    logo: "SP",
    location: "Remote",
    locationKey: "remote",
    type: "Contract",
    typeKey: "contract",
    mode: "Remote",
    modeKey: "remote",
    level: "Senior",
    levelKey: "senior",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$130k – $160k",
    salaryMin: 130000,
    salaryMax: 160000,
    posted: "2 days ago",
    featured: false,
    tags: ["Swift", "UIKit", "SwiftUI", "Core Audio"],
    description: "Build audio experiences for 500M+ users on iOS. You'll work on the playback and home screen teams.",
    responsibilities: [
      "Develop and maintain core iOS features shipped globally",
      "Collaborate with backend teams on API contracts",
      "Write thorough unit and UI tests",
      "Optimise app performance and startup time"
    ],
    requirements: [
      "5+ years Swift / iOS development",
      "Deep understanding of UIKit and SwiftUI",
      "Experience with audio APIs or media playback a strong plus",
      "Published app with 1M+ users preferred"
    ]
  },
  {
    id: 8,
    title: "UI/UX Design Intern",
    company: "Webflow",
    logo: "WF",
    location: "San Francisco, CA",
    locationKey: "san-francisco",
    type: "Internship",
    typeKey: "internship",
    mode: "Hybrid",
    modeKey: "hybrid",
    level: "Entry",
    levelKey: "entry",
    category: "Design",
    categoryKey: "design",
    salary: "$35 – $45/hr",
    salaryMin: 35,
    salaryMax: 45,
    posted: "3 days ago",
    featured: false,
    tags: ["Figma", "Prototyping", "User Research", "CSS"],
    description: "Join our design team for a 3-month internship. You'll contribute to real features and learn how design works at scale.",
    responsibilities: [
      "Assist senior designers in day-to-day design work",
      "Create wireframes, prototypes, and final mockups",
      "Participate in design critiques and research sessions",
      "Document design decisions and update the design system"
    ],
    requirements: [
      "Currently enrolled in a design or HCI program",
      "Strong Figma skills with a portfolio of projects",
      "Interest in web and product design",
      "Basic understanding of HTML/CSS is a bonus"
    ]
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "GitLab",
    logo: "GL",
    location: "Remote",
    locationKey: "remote",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Remote",
    modeKey: "remote",
    level: "Senior",
    levelKey: "senior",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$150k – $185k",
    salaryMin: 150000,
    salaryMax: 185000,
    posted: "6 days ago",
    featured: false,
    tags: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
    description: "Help GitLab scale its infrastructure to serve millions of developers worldwide. You'll own the reliability of our core deployment pipelines.",
    responsibilities: [
      "Design and maintain cloud infrastructure on AWS and GCP",
      "Build and improve CI/CD pipelines used by internal teams",
      "Lead incident response and post-mortem processes",
      "Drive automation initiatives to reduce operational toil"
    ],
    requirements: [
      "5+ years in DevOps or infrastructure engineering",
      "Strong Kubernetes and Terraform expertise",
      "Experience with large-scale distributed systems",
      "On-call experience and incident management skills"
    ]
  },
  {
    id: 10,
    title: "Product Manager — Growth",
    company: "Intercom",
    logo: "IC",
    location: "Dublin, Ireland",
    locationKey: "dublin",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Hybrid",
    modeKey: "hybrid",
    level: "Mid",
    levelKey: "mid",
    category: "Product",
    categoryKey: "product",
    salary: "$110k – $140k",
    salaryMin: 110000,
    salaryMax: 140000,
    posted: "4 days ago",
    featured: false,
    tags: ["Product Strategy", "Analytics", "A/B Testing", "Roadmapping"],
    description: "Drive growth initiatives across Intercom's self-serve acquisition funnel. You'll work at the intersection of product, marketing, and data.",
    responsibilities: [
      "Own the product roadmap for the growth squad",
      "Run experiments to improve activation and retention metrics",
      "Define and track OKRs for your product area",
      "Collaborate with engineering, design, and marketing teams"
    ],
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills and comfort with data tools",
      "Experience running A/B tests and interpreting results",
      "Excellent written and verbal communication skills"
    ]
  },
  {
    id: 11,
    title: "Full Stack Engineer",
    company: "Supabase",
    logo: "SB",
    location: "Remote",
    locationKey: "remote",
    type: "Full-time",
    typeKey: "full-time",
    mode: "Remote",
    modeKey: "remote",
    level: "Mid",
    levelKey: "mid",
    category: "Engineering",
    categoryKey: "engineering",
    salary: "$120k – $155k",
    salaryMin: 120000,
    salaryMax: 155000,
    posted: "1 day ago",
    featured: true,
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    description: "Build the open source Firebase alternative used by 1M+ developers. You'll work across the full stack on features that ship to a global audience.",
    responsibilities: [
      "Ship full-stack features end-to-end with minimal supervision",
      "Contribute to open source repositories with high visibility",
      "Write clear technical documentation for developers",
      "Review pull requests and participate in architectural discussions"
    ],
    requirements: [
      "3+ years full-stack experience with React and Node.js",
      "Strong SQL and database design skills",
      "Open source contribution experience preferred",
      "Comfortable working async in a fully remote team"
    ]
  },
  {
    id: 12,
    title: "Content Strategist",
    company: "Mailchimp",
    logo: "MC",
    location: "Atlanta, GA",
    locationKey: "atlanta",
    type: "Part-time",
    typeKey: "part-time",
    mode: "Hybrid",
    modeKey: "hybrid",
    level: "Entry",
    levelKey: "entry",
    category: "Marketing",
    categoryKey: "marketing",
    salary: "$50k – $70k",
    salaryMin: 50000,
    salaryMax: 70000,
    posted: "1 week ago",
    featured: false,
    tags: ["Content Writing", "SEO", "Copywriting", "Analytics"],
    description: "Help Mailchimp tell its story across blog, email, and social channels. You'll create content that educates and converts small business owners.",
    responsibilities: [
      "Write and edit blog posts, emails, and landing page copy",
      "Develop content calendars aligned with marketing campaigns",
      "Optimise existing content for SEO performance",
      "Analyse content metrics and report on performance"
    ],
    requirements: [
      "1+ years of content writing or copywriting experience",
      "Strong SEO fundamentals",
      "Excellent editing and proofreading skills",
      "Experience with CMS tools (WordPress, Contentful, etc.)"
    ]
  }
];
