import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

// Parse MySQL connection string
const url = new URL(DATABASE_URL);
const connection = await mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
});

// Sample games data
const games = [
  { name: 'Book of Ra', provider: 'Novomatic', currentRtp: 9600, volatility: 'high' },
  { name: 'Starburst', provider: 'NetEnt', currentRtp: 9625, volatility: 'medium' },
  { name: 'Gonzo Quest', provider: 'NetEnt', currentRtp: 9600, volatility: 'high' },
  { name: 'Mega Moolah', provider: 'Microgaming', currentRtp: 8800, volatility: 'high' },
  { name: 'Immortal Romance', provider: 'Microgaming', currentRtp: 9650, volatility: 'medium' },
  { name: 'Thunderstruck II', provider: 'Microgaming', currentRtp: 9650, volatility: 'high' },
  { name: 'Reactoonz', provider: 'Play\'n GO', currentRtp: 9600, volatility: 'high' },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play', currentRtp: 9600, volatility: 'high' },
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', currentRtp: 9600, volatility: 'high' },
  { name: 'Starlight Princess', provider: 'Pragmatic Play', currentRtp: 9600, volatility: 'high' },
];

console.log('🌱 Seeding database with sample games...');

for (const game of games) {
  await connection.execute(
    'INSERT INTO games (name, provider, currentRtp, volatility, status) VALUES (?, ?, ?, ?, ?)',
    [game.name, game.provider, game.currentRtp, game.volatility, 'active']
  );
  console.log(`✅ Added: ${game.name}`);
}

// Add RTP history for each game
const gameIds = await connection.query('SELECT id FROM games');
for (const [{ id }] of gameIds) {
  for (let i = 0; i < 24; i++) {
    const rtp = 9500 + Math.floor(Math.random() * 200);
    const timestamp = new Date(Date.now() - i * 60 * 60 * 1000);
    await connection.execute(
      'INSERT INTO rtpHistory (gameId, rtp, timestamp) VALUES (?, ?, ?)',
      [id, rtp, timestamp]
    );
  }
}

console.log('✅ Database seeded successfully!');
await connection.end();
