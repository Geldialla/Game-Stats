const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// GET all troop stats
app.get('/api/stats', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM troop_stats');
  res.json(rows);
});

// POST new troop stats
app.post('/api/stats', async (req, res) => {
  const d = req.body;
  const [result] = await db.query(
    `INSERT INTO troop_stats 
     (name, infantry_attack, infantry_defence, infantry_lethality, infantry_health,
      lancer_attack, lancer_defence, lancer_lethality, lancer_health,
      marksman_attack, marksman_defence, marksman_lethality, marksman_health)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [d.name, d.infantry_attack, d.infantry_defence, d.infantry_lethality, d.infantry_health,
     d.lancer_attack, d.lancer_defence, d.lancer_lethality, d.lancer_health,
     d.marksman_attack, d.marksman_defence, d.marksman_lethality, d.marksman_health]
  );
  res.json({ id: result.insertId });
});

// PUT update troop stats by ID
app.put('/api/stats/:id', async (req, res) => {
  const d = req.body;
  const { id } = req.params;
  await db.query(
    `UPDATE troop_stats SET 
     name=?, infantry_attack=?, infantry_defence=?, infantry_lethality=?, infantry_health=?,
     lancer_attack=?, lancer_defence=?, lancer_lethality=?, lancer_health=?,
     marksman_attack=?, marksman_defence=?, marksman_lethality=?, marksman_health=?
     WHERE id=?`,
    [d.name, d.infantry_attack, d.infantry_defence, d.infantry_lethality, d.infantry_health,
     d.lancer_attack, d.lancer_defence, d.lancer_lethality, d.lancer_health,
     d.marksman_attack, d.marksman_defence, d.marksman_lethality, d.marksman_health,
     id]
  );
  res.sendStatus(200);
});

// DELETE troop stats by ID
app.delete('/api/stats/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM troop_stats WHERE id = ?', [id]);
  res.sendStatus(200);
});

// Serve the frontend HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: ${PORT}`);
});
