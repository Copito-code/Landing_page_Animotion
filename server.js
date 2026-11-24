import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new Database('animotion_votes.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS poll_options (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    tag TEXT NOT NULL,
    votes INTEGER DEFAULT 0
  )
`);

// Inserta tus 3 opciones exactas si no existen
const insert = db.prepare('INSERT OR IGNORE INTO poll_options (id, label, tag, votes) VALUES (?, ?, ?, ?)');
insert.run('opt1', 'Sí. Es una herramienta brutal y muy necesaria', '[01]', 0);
insert.run('opt2', 'Puede ser. Tiene potencial, pero hay que ver para creer', '[02]', 0);
insert.run('opt3', 'No lo sé, tengo dudas', '[03]', 0);


app.get('/', (req, res) => {
  res.json({ status: 'AniMotion backend online', endpoint: '/api/poll' });
});


app.get('/api/poll', (req, res) => {
  const rows = db.prepare('SELECT * FROM poll_options').all();
  res.json(rows);
});

app.post('/api/poll/vote', (req, res) => {
  const { optionId } = req.body;
  db.prepare('UPDATE poll_options SET votes = votes + 1 WHERE id = ?').run(optionId);
  const updatedRows = db.prepare('SELECT * FROM poll_options').all();
  res.json(updatedRows);
});

app.listen(PORT, () => {
  console.log(`⚡ SQLite listo en http://localhost:${PORT}/api/poll`);
});