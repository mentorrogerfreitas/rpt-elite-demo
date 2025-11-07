import { drizzle } from "drizzle-orm/mysql2";
import { games, rtpHistory } from "./drizzle/schema";
import * as dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const sampleGames = [
  { name: "Book of Ra", provider: "Novomatic", currentRtp: 9600, volatility: "high" },
  { name: "Starburst", provider: "NetEnt", currentRtp: 9625, volatility: "medium" },
  { name: "Gonzo Quest", provider: "NetEnt", currentRtp: 9600, volatility: "high" },
  { name: "Mega Moolah", provider: "Microgaming", currentRtp: 8800, volatility: "high" },
  { name: "Immortal Romance", provider: "Microgaming", currentRtp: 9650, volatility: "medium" },
  { name: "Thunderstruck II", provider: "Microgaming", currentRtp: 9650, volatility: "high" },
  { name: "Reactoonz", provider: "Play'n GO", currentRtp: 9600, volatility: "high" },
  { name: "Sweet Bonanza", provider: "Pragmatic Play", currentRtp: 9600, volatility: "high" },
  { name: "Gates of Olympus", provider: "Pragmatic Play", currentRtp: 9600, volatility: "high" },
  { name: "Starlight Princess", provider: "Pragmatic Play", currentRtp: 9600, volatility: "high" },
];

async function seed() {
  console.log("🌱 Seeding database with sample games...");

  try {
    // Insert games
    for (const game of sampleGames) {
      await db.insert(games).values({
        name: game.name,
        provider: game.provider,
        currentRtp: game.currentRtp,
        volatility: game.volatility,
        status: "active",
      });
      console.log(`✅ Added: ${game.name}`);
    }

    // Get all games and add RTP history
    const allGames = await db.select().from(games);
    console.log(`\n📊 Adding RTP history for ${allGames.length} games...`);

    for (const game of allGames) {
      for (let i = 0; i < 24; i++) {
        const rtp = 9500 + Math.floor(Math.random() * 200);
        const timestamp = new Date(Date.now() - i * 60 * 60 * 1000);
        await db.insert(rtpHistory).values({
          gameId: game.id,
          rtp,
          timestamp,
        });
      }
      console.log(`✅ Added history for: ${game.name}`);
    }

    console.log("\n✨ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
