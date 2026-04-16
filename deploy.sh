#!/bin/bash

echo "Cloning or updating project..."

PROJECT_DIR="cine-seat-booking-app"

if [ ! -d "$PROJECT_DIR" ]; then
  git clone https://github.com/TU_USUARIO/TU_REPO.git
else
  cd $PROJECT_DIR
  git pull
  cd ..
fi

cd $PROJECT_DIR

echo "Stopping existing containers..."
docker compose down

echo "Building and starting containers..."
docker compose up -d --build

echo "Deployment complete!"
