// server.js - Express server for MapleStory Stat Dice Roller

import express from 'express';
import { DiceRoller } from './DiceRoller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
const roller = new DiceRoller();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes

// Get current statistics
app.get('/api/stats', (req, res) => {
  const stats = roller.getPerfectRollStats();
  res.json(stats);
});

// Roll once
app.post('/api/roll', (req, res) => {
  const result = roller.rollUntilPerfect();
  const stats = roller.getPerfectRollStats();
  res.json({
    lastRoll: result,
    stats: stats
  });
});

// Roll x10
app.post('/api/roll-x10', (req, res) => {
  const results = roller.rollUntilTarget(10);
  const stats = roller.getPerfectRollStats();
  res.json({
    rolls: results,
    stats: stats
  });
});

// Reset statistics
app.post('/api/reset', (req, res) => {
  roller.reset();
  const stats = roller.getPerfectRollStats();
  res.json({
    message: 'Statistics reset',
    stats: stats
  });
});

// Get roll history
app.get('/api/history', (req, res) => {
  const history = roller.getRollHistory();
  res.json({
    history: history
  });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎲 MapleStory Stat Dice Roller running on http://localhost:${PORT}`);
});
