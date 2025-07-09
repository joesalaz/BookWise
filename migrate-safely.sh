#!/bin/bash
# migrate-safely.sh - Only run pending migrations

echo "Checking migration status..."
npx sequelize-cli db:migrate:status

echo "Running pending migrations only..."
npx sequelize-cli db:migrate

echo "Migration complete. Current status:"
npx sequelize-cli db:migrate:status
