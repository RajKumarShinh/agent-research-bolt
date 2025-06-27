# AgentNews - AI Agent Intelligence Platform

A modern, real-time AI news aggregator that fetches and curates the latest articles about AI agents, autonomous systems, and artificial intelligence research from premium sources including major tech companies and research organizations.

## 🚀 Features

- **Real-time RSS Feed Processing**: Automatically fetches articles from 10+ premium AI sources including MIT Technology Review, Microsoft Research, Google AI, Anthropic, and more
- **Intelligent AI Classification**: Automatically categorizes articles into AI subtopics (AI Agents, LLMs, Robotics, Computer Vision, NLP, Ethics, etc.)
- **Advanced Filtering**: Search, filter by source, subtopic, date range, and sort options
- **Responsive Design**: Beautiful, production-ready UI with smooth animations and hover effects
- **Favorites System**: Save articles with persistent local storage
- **Live Status Monitoring**: Real-time connection status and automatic refresh every 15 minutes
- **Article Modal**: Full-screen article preview with sharing capabilities

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Lucide Icons
- **Backend**: Express.js + RSS Parser + Node-cron
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations

## 🏗 Architecture

```
├── Frontend (React + Vite) - Port 5173
│   ├── Components (Header, ArticleCard, FilterPanel, etc.)
│   ├── Hooks (useArticles for state management)
│   ├── Types (TypeScript interfaces)
│   └── Utilities (Date formatting, filtering logic)
│
└── Backend (Express.js) - Port 3002
    ├── RSS Feed Parser
    ├── AI Content Classification
    ├── Automatic Updates (15-min intervals)
    └── REST API Endpoints
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Servers**
   ```bash
   npm run dev
   ```
   This starts both frontend (port 5173) and backend (port 3002) concurrently.

3. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3002/api

### Build for Production

```bash
npm run build
npm run preview
```

## 📡 API Endpoints

- `GET /api/articles` - Fetch all processed articles
- `GET /api/health` - Server health check
- `POST /api/refresh` - Manual refresh of RSS feeds
- `GET /api/feeds` - RSS feed configurations and stats
- `GET /api/status` - Server status and uptime

## 🎯 RSS Sources

### Academic & Research
- **MIT Technology Review**: Academic and research-focused AI content

### Tech Media
- **Wired AI**: Tech media coverage of AI developments  

### Industry News
- **TechCrunch AI**: Startup and industry AI news
- **VentureBeat AI**: Business and enterprise AI coverage

### Big Tech Research
- **Microsoft Research**: Microsoft's AI research publications
- **Microsoft AI Blog**: Microsoft AI product updates and insights
- **Google AI Blog**: Google's AI research and developments
- **Google Research**: Google's formal research publications

### AI Labs
- **Anthropic**: Anthropic's research and product updates
- **OpenAI Blog**: OpenAI's latest research and announcements

## 🧠 AI Classification System

Articles are automatically classified into these subtopics:
- **AI Agents**: Autonomous agents, multi-agent systems, agentic AI
- **LLMs**: Large language models, GPT, transformers, Claude, Gemini
- **Robotics**: Autonomous vehicles, drones, robotic systems
- **Computer Vision**: Image recognition, visual AI, object detection
- **NLP**: Natural language processing, text analysis
- **Machine Learning**: Algorithms, deep learning, neural networks
- **Ethics**: AI governance, bias, responsible AI
- **Autonomous Systems**: Self-driving, automation, autonomous decision-making
- **General AI**: AGI, artificial general intelligence

## 🎨 Design Features

- **Apple-level Aesthetics**: Clean, sophisticated, and intuitive design
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Micro-interactions**: Smooth hover states, transitions, and animations
- **Typography**: Carefully chosen fonts with proper hierarchy
- **Color System**: Comprehensive color palette with proper contrast ratios
- **Loading States**: Elegant skeleton screens and loading indicators

## 📱 Components

### Core Components
- **Header**: Search, filters, and branding
- **ArticleCard**: Article preview with image, metadata, and actions
- **ArticleModal**: Full-screen article view with sharing
- **FilterPanel**: Advanced filtering options with all 10 sources
- **StatusBar**: Live connection status and refresh controls
- **LoadingCard**: Skeleton loading states
- **EmptyState**: No results messaging

### Hooks
- **useArticles**: Central state management for articles, filtering, and favorites

## 🔧 Configuration

### Environment Variables
```env
PORT=3002  # Backend server port
```

### RSS Feed Configuration
The application includes feeds from major AI organizations:
```javascript
const RSS_FEEDS = [
  // Academic & Research
  { name: 'MIT Technology Review', url: '...', category: 'Academic' },
  
  // Tech Media
  { name: 'Wired AI', url: '...', category: 'Tech Media' },
  
  // Industry News
  { name: 'TechCrunch AI', url: '...', category: 'Startup News' },
  { name: 'VentureBeat AI', url: '...', category: 'Industry News' },
  
  // Big Tech Research
  { name: 'Microsoft Research', url: '...', category: 'Big Tech Research' },
  { name: 'Microsoft AI Blog', url: '...', category: 'Big Tech Research' },
  { name: 'Google AI Blog', url: '...', category: 'Big Tech Research' },
  { name: 'Google Research', url: '...', category: 'Big Tech Research' },
  
  // AI Labs
  { name: 'Anthropic', url: '...', category: 'AI Labs' },
  { name: 'OpenAI Blog', url: '...', category: 'AI Labs' }
];
```

## 🚦 Status Monitoring

The application includes comprehensive monitoring:
- **Connection Status**: Live indicator of backend connectivity
- **Last Updated**: Timestamp of most recent feed refresh
- **Article Count**: Real-time count of filtered articles
- **Error Handling**: Graceful error states with actionable messages

## 🎯 Performance Features

- **Caching**: Server-side article caching for improved performance
- **Deduplication**: Automatic removal of duplicate articles
- **Enhanced Capacity**: Increased to 150 articles to handle more sources
- **Debounced Search**: Optimized search performance
- **Lazy Loading**: Progressive image loading

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── ArticleCard.tsx
│   ├── ArticleModal.tsx
│   ├── FilterPanel.tsx  # Updated with new sources
│   ├── Header.tsx
│   ├── StatusBar.tsx
│   ├── LoadingCard.tsx
│   └── EmptyState.tsx
├── hooks/              # Custom React hooks
│   └── useArticles.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── data/               # Mock data and configurations
│   └── mockData.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles

server/
└── index.js            # Updated with 10 RSS sources
```

## 🔧 Recent Updates

### Added Major Tech Company Feeds
- **Microsoft Research & AI Blog**: Research papers and product insights
- **Google AI Blog & Research**: Latest AI developments from Google
- **Anthropic**: Claude and AI safety research
- **OpenAI Blog**: GPT and latest AI breakthroughs

### Enhanced Keyword Detection
- Added company-specific keywords (Claude, Gemini, Copilot, etc.)
- Improved classification accuracy for big tech content
- Better research paper detection

### Improved Performance
- Increased article cache to 150 items
- Enhanced deduplication algorithm
- Better error handling for various RSS formats

## 🚀 Getting Started

1. Clone or download the project
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start both frontend and backend
4. Visit http://localhost:5173 to view the application

The application will automatically fetch articles from all 10 sources and update every 15 minutes.