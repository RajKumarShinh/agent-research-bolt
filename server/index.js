import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import Parser from 'rss-parser';
import cron from 'node-cron';
import techRadarRoutes from './routes/techRadar.js';

const app = express();
const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure']
  }
});

app.use(cors());
app.use(express.json());

// Tech Radar API routes
app.use('/api/tech-radar', techRadarRoutes);

// RSS Feed configurations
const RSS_FEEDS = [
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'Academic'
  },
  {
    name: 'Wired AI',
    url: 'https://www.wired.com/feed/tag/ai/rss',
    category: 'Tech Media'
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'Startup News'
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/ai/feed/',
    category: 'Industry News'
  },
  {
    name: 'Microsoft Research',
    url: 'https://www.microsoft.com/en-us/research/feed/',
    category: 'Big Tech Research'
  },
  {
    name: 'Microsoft AI Blog',
    url: 'https://blogs.microsoft.com/ai/feed/',
    category: 'Big Tech Research'
  },
  {
    name: 'Google AI Blog',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    category: 'Big Tech Research'
  },
  {
    name: 'Google Research',
    url: 'https://research.google/feeds/publications.xml',
    category: 'Big Tech Research'
  },
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com/news/rss.xml',
    category: 'AI Labs'
  },
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'AI Labs'
  }
];

// AI-related keywords for filtering
const AI_KEYWORDS = [
  'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning',
  'neural network', 'autonomous', 'agent', 'agents', 'llm', 'gpt',
  'transformer', 'robotics', 'computer vision', 'nlp', 'natural language',
  'generative ai', 'openai', 'anthropic', 'google ai', 'microsoft ai',
  'autonomous systems', 'agentic', 'multimodal', 'chatbot', 'automation',
  'cognitive', 'reinforcement learning', 'supervised learning', 'unsupervised learning',
  'algorithm', 'data science', 'predictive', 'classification', 'regression',
  'claude', 'gemini', 'copilot', 'bard', 'palm', 'bert', 'research'
];

// AI subtopic classification
const SUBTOPIC_KEYWORDS = {
  'AI Agents': ['agent', 'agents', 'agentic', 'autonomous agent', 'multi-agent', 'chatbot'],
  'LLMs': ['llm', 'large language', 'gpt', 'transformer', 'bert', 'language model', 'claude', 'gemini', 'palm'],
  'Robotics': ['robot', 'robotics', 'autonomous vehicle', 'drone', 'automation'],
  'Computer Vision': ['computer vision', 'image recognition', 'opencv', 'visual', 'object detection'],
  'NLP': ['nlp', 'natural language', 'text processing', 'sentiment analysis', 'translation'],
  'Machine Learning': ['machine learning', 'ml', 'deep learning', 'neural network', 'algorithm'],
  'Ethics': ['ethics', 'bias', 'fairness', 'responsible ai', 'ai governance', 'regulation'],
  'Autonomous Systems': ['autonomous', 'self-driving', 'autopilot', 'automated', 'driverless'],
  'General AI': ['agi', 'artificial general intelligence', 'general ai', 'superintelligence']
};

let cachedArticles = [];
let lastUpdateTime = new Date();

// Helper function to determine AI subtopic
function classifySubtopic(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  
  for (const [subtopic, keywords] of Object.entries(SUBTOPIC_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return subtopic;
    }
  }
  
  return 'General AI';
}

// Helper function to check if article is AI-related
function isAIRelated(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  return AI_KEYWORDS.some(keyword => text.includes(keyword));
}

// Helper function to extract image URL
function extractImageUrl(item, subtopic = 'General AI') {
  // Try different image sources
  if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
    return item['media:content'].$.url;
  }
  
  if (item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
    return item['media:thumbnail'].$.url;
  }
  
  if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url;
  }
  
  // Look for images in content
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = item.content?.match(imgRegex) || item['content:encoded']?.match(imgRegex);
  if (match) {
    return match[1];
  }
  
  // Fallback to default images based on subtopic
  const fallbackImages = {
    'AI Agents': 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    'LLMs': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Robotics': 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Computer Vision': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    'NLP': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Machine Learning': 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Ethics': 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Autonomous Systems': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    'General AI': 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800'
  };
  
  return fallbackImages[subtopic] || fallbackImages['General AI'];
}

// Helper function to estimate read time
function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const text = content?.replace(/<[^>]*>/g, '') || '';
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

// Helper function to clean and truncate content
function cleanContent(content, maxLength = 200) {
  if (!content) return '';
  
  // Remove HTML tags
  const cleaned = content.replace(/<[^>]*>/g, '').trim();
  
  // Truncate if too long
  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength).trim() + '...';
  }
  
  return cleaned;
}

// Generate unique ID for articles
function generateArticleId(feedName, item) {
  const baseId = item.guid || item.link || item.title || Date.now().toString();
  return `${feedName}-${baseId}`.replace(/[^a-zA-Z0-9-]/g, '-').substring(0, 100);
}

// Fetch and parse RSS feeds
async function fetchRSSFeeds() {
  console.log('🔄 Starting RSS feed fetch...');
  const articles = [];
  
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`📡 Fetching ${feed.name}...`);
      const parsedFeed = await parser.parseURL(feed.url);
      
      let feedArticleCount = 0;
      for (const item of parsedFeed.items) {
        const title = item.title || '';
        const content = item.contentSnippet || item.content || item.summary || '';
        
        // Only include AI-related articles
        if (isAIRelated(title, content)) {
          const subtopic = classifySubtopic(title, content);
          
          const article = {
            id: generateArticleId(feed.name, item),
            title: title,
            excerpt: cleanContent(content, 200),
            content: item.content || item['content:encoded'] || content,
            author: item.creator || item.author || 'Unknown',
            source: feed.name,
            publishedAt: new Date(item.pubDate || item.isoDate || Date.now()),
            url: item.link || '',
            imageUrl: extractImageUrl(item, subtopic),
            tags: (item.categories || []).slice(0, 5),
            aiSubtopic: subtopic,
            readTime: estimateReadTime(item.content || content),
            isFavorite: false
          };
          
          articles.push(article);
          feedArticleCount++;
        }
      }
      
      console.log(`✅ Successfully fetched ${feedArticleCount} AI articles from ${feed.name}`);
    } catch (error) {
      console.error(`❌ Error fetching ${feed.name}:`, error.message);
    }
  }
  
  // Sort by publication date (newest first)
  articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Remove duplicates based on title similarity
  const uniqueArticles = [];
  const seenTitles = new Set();
  
  for (const article of articles) {
    const normalizedTitle = article.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniqueArticles.push(article);
    }
  }
  
  cachedArticles = uniqueArticles.slice(0, 150); // Keep top 150 articles
  lastUpdateTime = new Date();
  
  console.log(`🎉 Fetched ${cachedArticles.length} unique AI articles total`);
  return cachedArticles;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    articles: cachedArticles.length 
  });
});

// API Routes
app.get('/api/articles', async (req, res) => {
  try {
    console.log('📊 Articles requested');
    
    if (cachedArticles.length === 0) {
      console.log('🔄 Cache empty, fetching fresh articles...');
      await fetchRSSFeeds();
    }
    
    res.json({
      articles: cachedArticles,
      lastUpdated: lastUpdateTime,
      totalCount: cachedArticles.length
    });
  } catch (error) {
    console.error('❌ Error serving articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.post('/api/refresh', async (req, res) => {
  try {
    console.log('🔄 Manual refresh requested');
    await fetchRSSFeeds();
    res.json({
      success: true,
      lastUpdated: lastUpdateTime,
      articleCount: cachedArticles.length
    });
  } catch (error) {
    console.error('❌ Error refreshing feeds:', error);
    res.status(500).json({ error: 'Failed to refresh feeds' });
  }
});

app.get('/api/feeds', (req, res) => {
  const feedsWithStats = RSS_FEEDS.map(feed => ({
    ...feed,
    lastUpdated: lastUpdateTime,
    articleCount: cachedArticles.filter(article => article.source === feed.name).length
  }));
  
  res.json(feedsWithStats);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    lastUpdated: lastUpdateTime,
    articleCount: cachedArticles.length,
    feeds: RSS_FEEDS.length,
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Schedule RSS feed updates every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('⏰ Scheduled RSS feed update starting...');
  try {
    await fetchRSSFeeds();
    console.log('✅ Scheduled RSS feed update completed');
  } catch (error) {
    console.error('❌ Scheduled RSS feed update failed:', error);
  }
});

// Initial fetch on server start
console.log('🚀 Starting RSS Feed Server...');
fetchRSSFeeds().catch(console.error);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🌐 RSS Feed Server running on http://localhost:${PORT}`);
  console.log('📡 RSS feeds will be updated every 15 minutes');
  console.log(`🔍 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🎯 Tech Radar API available at http://localhost:${PORT}/api/tech-radar`);
});