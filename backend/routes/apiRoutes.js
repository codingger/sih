import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || 'https://adokegiwvnongwsyeuxe.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Stations API
router.get('/stations', async (req, res) => {
  try {
    const { data, error } = await supabase.from('stations').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stations/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('stations').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Hourly Telemetry API
router.get('/telemetry/hourly', async (req, res) => {
  try {
    const { station } = req.query;
    let query = supabase.from('telemetry_hourly').select('*').order('created_at', { ascending: true });
    if (station) {
      query = query.eq('station_id', station);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Equipment API
router.get('/equipment', async (req, res) => {
  try {
    const { station } = req.query;
    let query = supabase.from('equipment').select('*');
    if (station) {
      query = query.eq('station_id', station);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Alerts API
router.get('/alerts', async (req, res) => {
  try {
    const { station } = req.query;
    let query = supabase.from('alerts').select('*').order('timestamp', { ascending: false });
    if (station) {
      query = query.eq('station_id', station);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/alerts/:id/ack', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .update({ acknowledged: true, acknowledged_by: 'Command Operator (HQ)' })
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json({ success: true, alert: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Predictive Maintenance API
router.get('/maintenance/predictive', async (req, res) => {
  try {
    const { station } = req.query;
    let query = supabase.from('predictive_maintenance').select('*');
    if (station) {
      query = query.eq('station_id', station);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Logistics & Expedition Voyages API
router.get('/logistics/voyage', async (req, res) => {
  try {
    const { data, error } = await supabase.from('expedition_voyages').select('*').limit(1).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Inventory API
router.get('/inventory', async (req, res) => {
  try {
    const { station } = req.query;
    let query = supabase.from('inventory_items').select('*');
    if (station) {
      query = query.eq('station_id', station);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Simulation Scenarios API
router.get('/simulation/scenarios', async (req, res) => {
  try {
    const { data, error } = await supabase.from('simulation_scenarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Real-time Open-Meteo Antarctic Weather API Endpoint
router.get('/weather/live', async (req, res) => {
  try {
    // Coordinates for Maitri (-70.7667, 11.7333) and Bharati (-69.4083, 76.1958)
    const maitriRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-70.7667&longitude=11.7333&current_weather=true');
    const bharatiRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-69.4083&longitude=76.1958&current_weather=true');
    
    const maitriData = await maitriRes.json();
    const bharatiData = await bharatiRes.json();

    res.json({
      maitri: maitriData.current_weather || null,
      bharati: bharatiData.current_weather || null,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
