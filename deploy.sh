#!/bin/bash

echo "🚀 Starting deployment..."

PROJECT_DIR="cine-seat-booking-app"
REPO_URL="https://github.com/NotDewey/cine-seat-booking-app.git"

echo "📥 Cloning or updating project..."

if [ ! -d "$PROJECT_DIR" ]; then
  git clone "$REPO_URL"
fi

cd "$PROJECT_DIR" || exit 1

echo "📄 Pulling latest changes..."
git pull origin main

echo "🛑 Stopping existing containers..."
docker compose down

echo "🔨 Building and starting containers..."
docker compose up -d --build

echo "✅ Deployment complete!"
