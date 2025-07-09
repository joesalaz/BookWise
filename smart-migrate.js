#!/usr/bin/env node

// Migration script to handle database setup without losing data
// Researched solution for Render deployment issue where migrations 
// were wiping existing user data on every deploy

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running migration check...');

const dbFile = './books.sqlite';

// Check if database file exists
if (!fs.existsSync(dbFile)) {
  console.log('Database not found, creating new one');
  execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
} else {
  console.log('Database exists, checking for pending migrations');
  
  try {
    // Check what migrations have been run
    const result = execSync('npx sequelize-cli db:migrate:status', { encoding: 'utf8' });
    
    // If there are pending migrations (marked as 'down'), run them
    if (result.includes('down')) {
      console.log('Found pending migrations, applying them');
      execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    } else {
      console.log('No pending migrations');
    }
  } catch (error) {
    // If status check fails, try running migrations anyway
    console.log('Status check failed, attempting migration');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
  }
}

console.log('Migration check complete');
