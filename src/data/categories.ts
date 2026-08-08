// src/data/categories.ts
// Single source of truth for all categories + subcategories

export type SubCategory = {
  slug: string;
  name: string;
  description?: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  color: string;
  /** Keywords used to match Markdown posts (title/description) */
  keywords: string[];
  /** Exact titles as they appear in Sanity category documents */
  sanityTitles: string[];
  topics: SubCategory[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    icon: '🤖',
    short: 'AI Models, Agents & Automation',
    description:
      'From foundation models and agents to enterprise adoption and governance — deep analysis on how AI is reshaping products, work, and strategy.',
    color: '#2563eb',
    keywords: ['artificial', 'ai ', ' llm', 'agent', 'gpt', 'machine learning'],
    sanityTitles: ['Artificial Intelligence', 'AI', 'AI Agents', 'AI Automation', 'AI Models', 'Responsible AI'],
    topics: [
      { slug: 'ai-agents', name: 'AI Agents' },
      { slug: 'ai-automation', name: 'AI Automation' },
      { slug: 'ai-models', name: 'AI Models' },
      { slug: 'responsible-ai', name: 'Responsible AI' },
    ],
  },
  {
    slug: 'business-strategy',
    name: 'Business Strategy',
    icon: '📈',
    short: 'Strategy, Leadership & Growth',
    description:
      'Frameworks, leadership lessons, and strategic insights for operators and executives navigating competitive markets and digital transformation.',
    color: '#0ea5e9',
    keywords: ['business', 'strategy', 'leadership', 'growth', 'competitive'],
    sanityTitles: ['Business Strategy', 'Competitive Strategy', 'Leadership', 'Operations'],
    topics: [
      { slug: 'competitive-strategy', name: 'Competitive Strategy' },
      { slug: 'leadership', name: 'Leadership' },
      { slug: 'operations', name: 'Operations' },
      { slug: 'digital-transformation', name: 'Digital Transformation' },
    ],
  },
  {
    slug: 'startups',
    name: 'Startups',
    icon: '🚀',
    short: 'Funding, Product & Growth',
    description:
      'Practical playbooks for founders — fundraising, product-market fit, scaling teams, and building durable companies.',
    color: '#8b5cf6',
    keywords: ['startup', 'founder', 'fundraising', 'saas', 'product-market'],
    sanityTitles: ['Startups', 'Fundraising', 'Product-Market Fit', 'Growth', 'Scaling'],
    topics: [
      { slug: 'fundraising', name: 'Fundraising' },
      { slug: 'product-market-fit', name: 'Product-Market Fit' },
      { slug: 'growth', name: 'Growth' },
      { slug: 'scaling', name: 'Scaling' },
    ],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    icon: '🔒',
    short: 'Security, Privacy & Risk',
    description:
      'Threats, architecture patterns, zero-trust, privacy, and defending modern cloud and AI-powered systems.',
    color: '#ef4444',
    keywords: ['security', 'cyber', 'privacy', 'zero trust', 'encryption'],
    sanityTitles: ['Cybersecurity', 'Zero Trust', 'Cloud Security', 'Privacy', 'Secure Architecture'],
    topics: [
      { slug: 'zero-trust', name: 'Zero Trust' },
      { slug: 'cloud-security', name: 'Cloud Security' },
      { slug: 'privacy', name: 'Privacy' },
      { slug: 'secure-architecture', name: 'Secure Architecture' },
    ],
  },
  {
    slug: 'cloud-computing',
    name: 'Cloud Computing',
    icon: '☁️',
    short: 'AWS, Azure, GCP & Platforms',
    description:
      'Architecture, cost, reliability, and platform strategy across the major clouds — patterns that work at scale.',
    color: '#06b6d4',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'devops', 'infrastructure'],
    sanityTitles: ['Cloud Computing', 'AWS', 'Azure', 'GCP', 'Architecture'],
    topics: [
      { slug: 'architecture', name: 'Architecture' },
      { slug: 'aws', name: 'AWS' },
      { slug: 'azure', name: 'Azure' },
      { slug: 'gcp', name: 'GCP' },
    ],
  },
  {
    slug: 'future-of-work',
    name: 'Future of Work',
    icon: '🌐',
    short: 'Teams, Tools & Culture',
    description:
      'How AI, remote work, and new tooling are changing roles, productivity, and organizational design.',
    color: '#10b981',
    keywords: ['remote', 'work', 'productivity', 'culture', 'team'],
    sanityTitles: ['Future of Work', 'Remote Work', 'Productivity', 'Culture', 'AI-Augmented Roles'],
    topics: [
      { slug: 'remote-work', name: 'Remote Work' },
      { slug: 'ai-augmented-roles', name: 'AI-Augmented Roles' },
      { slug: 'productivity', name: 'Productivity' },
      { slug: 'culture', name: 'Culture' },
    ],
  },
  {
    slug: 'creator-economy',
    name: 'Creator Economy',
    icon: '🎥',
    short: 'Content, Audience & Monetization',
    description:
      'Building audiences, monetizing expertise, and the platforms powering independent creators and media.',
    color: '#f59e0b',
    keywords: ['creator', 'audience', 'monetization', 'content', 'newsletter'],
    sanityTitles: ['Creator Economy', 'Audience Growth', 'Monetization', 'Platforms', 'Content Strategy'],
    topics: [
      { slug: 'audience-growth', name: 'Audience Growth' },
      { slug: 'monetization', name: 'Monetization' },
      { slug: 'platforms', name: 'Platforms' },
      { slug: 'content-strategy', name: 'Content Strategy' },
    ],
  },
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation',
    icon: '⚙️',
    short: 'Technology & Organizational Change',
    description:
      'How established organizations adopt new technology, modernize systems, and change operating models.',
    color: '#6366f1',
    keywords: ['transformation', 'modernization', 'legacy', 'change management', 'roi'],
    sanityTitles: ['Digital Transformation', 'Modernization', 'Change Management', 'Legacy Systems', 'ROI'],
    topics: [
      { slug: 'modernization', name: 'Modernization' },
      { slug: 'change-management', name: 'Change Management' },
      { slug: 'legacy-systems', name: 'Legacy Systems' },
      { slug: 'roi', name: 'ROI' },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getTopic(categorySlug: string, topicSlug: string): SubCategory | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.topics.find((t) => t.slug === topicSlug);
}
