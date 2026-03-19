#!/bin/bash

# Configuration
ENV=$1 #normal assignment
PORT=${2:-8080} #default value assignment

echo "Running on $ENV environment on port $PORT"

# Exit on error
set -e

# Function to log messages
log() {
    echo "[INFO] $1"
}

# Function to handle errors
error() {
    echo "[ERROR] $1" >&2
    exit 1
}

# 1. Check Prerequisites
log "Checking prerequisites..."
command -v node >/dev/null 2>&1 || error "Node.js is not installed. Please install Node.js to continue."
command -v npm >/dev/null 2>&1 || error "npm is not installed. Please install npm to continue."
log "Prerequisites met: Node $(node -v), npm $(npm -v)"

# 2. Setup Server
log "Setting up Backend (Server)..."
if [ ! -d "server" ]; then
    error "Server directory not found!"
fi

cd server
if [ ! -d "node_modules" ] || [ package.json -nt node_modules ]; then
    log "Installing/Updating server dependencies..."
    npm install
else
    log "Server dependencies are up to date."
fi
cd ..

# 3. Setup Client
log "Setting up Frontend (Client)..."
if [ ! -d "client" ]; then
    error "Client directory not found!"
fi

cd client
if [ ! -d "node_modules" ] || [ package.json -nt node_modules ]; then
    log "Installing/Updating client dependencies..."
    npm install
else
    log "Client dependencies are up to date."
fi
cd ..

# 4. Final Verification
log "Complete dev setup finished successfully!"
exit 0
