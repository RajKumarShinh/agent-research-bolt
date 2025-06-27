import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import techRadarRoutes from './routes/techRadar.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tech-radar', techRadarRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Tech Radar API available at http://localhost:${PORT}/api/tech-radar`);
  
  // Log Supabase connection status
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('✅ Supabase credentials loaded successfully');
  } else {
    console.log('⚠️ Supabase credentials not found - please check your .env file');
  }
});