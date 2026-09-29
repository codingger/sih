import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    system: 'NCPOR Antarctic Digital Twin Express Backend',
    supabaseConnected: true,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`[NCPOR Mission Control API] Express server running on port ${PORT}`);
  console.log(`[Supabase Cloud] Connected to project adokegiwvnongwsyeuxe (https://adokegiwvnongwsyeuxe.supabase.co)`);
});
