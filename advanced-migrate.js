#!/usr/bin/env node

// Advanced migration script to preserve data during deployments
// This was needed because Render was wiping the SQLite database on every deploy
// Found this solution by researching Sequelize migration best practices

const { execSync } = require('child_process');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

console.log('Checking database state...');

const dbFile = './books.sqlite';

function runMigrations() {
  try {
    console.log('Running database migrations');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

if (!fs.existsSync(dbFile)) {
  console.log('No database found, setting up from scratch');
  runMigrations();
} else {
  console.log('Database exists, checking structure');
  
  const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.log('Cannot read database, running migrations');
      runMigrations();
      return;
    }

    // Check if main tables exist
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
      if (err) {
        console.log('Error checking tables, running migrations');
        db.close();
        runMigrations();
        return;
      }

      const tableNames = tables.map(t => t.name);
      const requiredTables = ['Users', 'Books', 'Categories'];
      const hasTables = requiredTables.every(table => tableNames.includes(table));

      if (!hasTables) {
        console.log('Missing required tables, running migrations');
        db.close();
        runMigrations();
      } else {
        // Check migration history
        db.all("SELECT name FROM SequelizeMeta", (err, migrations) => {
          db.close();
          
          if (err) {
            console.log('Cannot read migration history, running migrations');
            runMigrations();
            return;
          }

          // Count migration files vs completed migrations
          const migrationFiles = fs.readdirSync('./server/migrations');
          
          if (migrationFiles.length > migrations.length) {
            console.log('Found new migrations, applying them');
            runMigrations();
          } else {
            console.log('Database is up to date');
          }
        });
      }
    });
  });
}
