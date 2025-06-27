import { Article, RSSFeed } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Breakthrough in Autonomous AI Agents: New Framework Enables Multi-Modal Reasoning',
    excerpt: 'Researchers have developed a revolutionary framework that allows AI agents to process and reason across multiple modalities simultaneously, marking a significant leap forward in autonomous system capabilities.',
    content: 'Full article content would be here...',
    author: 'Dr. Sarah Chen',
    source: 'MIT Technology Review',
    publishedAt: new Date('2025-01-15T09:30:00Z'),
    url: 'https://technologyreview.com/example-1',
    imageUrl: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AI Agents', 'Multi-Modal', 'Reasoning', 'Autonomous Systems'],
    aiSubtopic: 'AI Agents',
    readTime: 8
  },
  {
    id: '2',
    title: 'The Ethics of Autonomous Decision-Making: When AI Agents Choose for Themselves',
    excerpt: 'As AI systems become more autonomous, critical questions arise about the ethical implications of machines making independent decisions without human oversight.',
    content: 'Full article content would be here...',
    author: 'Prof. Michael Rodriguez',
    source: 'Wired',
    publishedAt: new Date('2025-01-14T14:15:00Z'),
    url: 'https://wired.com/example-2',
    imageUrl: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Ethics', 'Autonomous Systems', 'Decision Making', 'AI Governance'],
    aiSubtopic: 'Ethics',
    readTime: 12
  },
  {
    id: '3',
    title: 'Large Language Models as Autonomous Agents: A Comprehensive Study',
    excerpt: 'New research reveals how large language models can be transformed into sophisticated autonomous agents capable of complex task execution and environmental interaction.',
    content: 'Full article content would be here...',
    author: 'Research Team at Stanford',
    source: 'ArXiv AI Papers',
    publishedAt: new Date('2025-01-14T11:22:00Z'),
    url: 'https://arxiv.org/example-3',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['LLMs', 'Autonomous Agents', 'Task Execution', 'Research'],
    aiSubtopic: 'LLMs',
    readTime: 15
  },
  {
    id: '4',
    title: 'Robotics Revolution: AI-Powered Autonomous Systems Transform Manufacturing',
    excerpt: 'Manufacturing facilities worldwide are adopting AI-powered autonomous robotic systems that can adapt to changing conditions and optimize production processes in real-time.',
    content: 'Full article content would be here...',
    author: 'Industrial AI Team',
    source: 'TechCrunch',
    publishedAt: new Date('2025-01-13T16:45:00Z'),
    url: 'https://techcrunch.com/example-4',
    imageUrl: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Robotics', 'Manufacturing', 'Automation', 'Industry 4.0'],
    aiSubtopic: 'Robotics',
    readTime: 10
  },
  {
    id: '5',
    title: 'Vision-Language Models Enable New Generation of Autonomous AI Systems',
    excerpt: 'The integration of computer vision and natural language processing creates unprecedented opportunities for autonomous AI systems to understand and interact with the world.',
    content: 'Full article content would be here...',
    author: 'Dr. Emily Watson',
    source: 'MIT Technology Review',
    publishedAt: new Date('2025-01-13T10:30:00Z'),
    url: 'https://technologyreview.com/example-5',
    imageUrl: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Computer Vision', 'NLP', 'Multi-Modal AI', 'Autonomous Systems'],
    aiSubtopic: 'Computer Vision',
    readTime: 9
  },
  {
    id: '6',
    title: 'Emergent Behaviors in Multi-Agent AI Systems: Unexpected Capabilities',
    excerpt: 'Researchers observe surprising emergent behaviors when multiple AI agents interact, leading to capabilities that exceed the sum of individual agent abilities.',
    content: 'Full article content would be here...',
    author: 'AI Research Collective',
    source: 'Wired',
    publishedAt: new Date('2025-01-12T13:20:00Z'),
    url: 'https://wired.com/example-6',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Multi-Agent Systems', 'Emergent Behavior', 'AI Capabilities', 'Research'],
    aiSubtopic: 'AI Agents',
    readTime: 11
  },
  {
    id: '7',
    title: 'Natural Language Processing Advances Enable More Human-Like AI Agents',
    excerpt: 'Recent breakthroughs in NLP are creating AI agents that can understand context, nuance, and implicit meaning in human communication with unprecedented accuracy.',
    content: 'Full article content would be here...',
    author: 'Dr. James Liu',
    source: 'ArXiv AI Papers',
    publishedAt: new Date('2025-01-12T09:15:00Z'),
    url: 'https://arxiv.org/example-7',
    imageUrl: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['NLP', 'Human-AI Interaction', 'Context Understanding', 'Communication'],
    aiSubtopic: 'NLP',
    readTime: 13
  },
  {
    id: '8',
    title: 'The Future of General AI: Autonomous Systems That Think and Learn',
    excerpt: 'As we move closer to artificial general intelligence, autonomous systems are developing the ability to think, learn, and adapt in ways that mirror human cognition.',
    content: 'Full article content would be here...',
    author: 'Future AI Institute',
    source: 'TechCrunch',
    publishedAt: new Date('2025-01-11T15:40:00Z'),
    url: 'https://techcrunch.com/example-8',
    imageUrl: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AGI', 'General AI', 'Cognition', 'Future Tech'],
    aiSubtopic: 'General AI',
    readTime: 14
  }
];

export const rssFeedsConfig: RSSFeed[] = [
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'Academic',
    lastUpdated: new Date(),
    articleCount: 156
  },
  {
    name: 'Wired AI',
    url: 'https://www.wired.com/feed/category/ai/rss',
    category: 'Tech Media',
    lastUpdated: new Date(),
    articleCount: 243
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'Startup News',
    lastUpdated: new Date(),
    articleCount: 189
  },
  {
    name: 'ArXiv AI Papers',
    url: 'https://arxiv.org/rss/cs.AI',
    category: 'Research Papers',
    lastUpdated: new Date(),
    articleCount: 1205
  }
];