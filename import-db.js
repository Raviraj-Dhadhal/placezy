/**
 * Placezy Database Restore Utility
 * Usage: node import-db.js
 */
const mongoose = require('./server/node_modules/mongoose');
const fs = require('fs');
const path = require('path');

const dumpDir = path.join(__dirname, 'database_dump');
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placezy';

async function restore() {
  if (!fs.existsSync(dumpDir)) {
    console.error('Error: database_dump directory not found.');
    process.exit(1);
  }

  console.log(`Connecting to MongoDB at: ${mongoUri}`);
  await mongoose.connect(mongoUri);
  console.log('Connected! Restoring collections...');

  const files = fs.readdirSync(dumpDir).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const colName = path.basename(file, '.json');
    const filePath = path.join(dumpDir, file);
    const docs = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (Array.isArray(docs) && docs.length > 0) {
      const col = mongoose.connection.db.collection(colName);
      // Clean and re-insert
      await col.deleteMany({});
      await col.insertMany(docs);
      console.log(`✓ Restored "${colName}": ${docs.length} documents.`);
    }
  }

  console.log('\n🎉 Placezy database restored successfully!');
  process.exit(0);
}

restore().catch((err) => {
  console.error('Database restore failed:', err);
  process.exit(1);
});
