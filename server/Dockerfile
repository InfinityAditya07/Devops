# Stage 1: Build Client (Frontend)
FROM node:20-bullseye-slim AS client-builder
WORKDIR /app/client
# Copy all source first, then install - ensures native binaries are built for Linux
COPY client/ ./
# Remove any lock files that may reference Mac-specific native binaries
RUN rm -f package-lock.json node_modules/.package-lock.json
RUN npm install
RUN npm run build

# Stage 2: Build Server (Backend)
FROM node:18-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./

# Stage 3: Production
FROM node:18-alpine
# Use the built-in non-root 'node' user
USER node

WORKDIR /app

# Copy necessary server files from the server-builder stage
COPY --from=server-builder --chown=node:node /app/server/package*.json ./
COPY --from=server-builder --chown=node:node /app/server/node_modules ./node_modules
COPY --from=server-builder --chown=node:node /app/server/src ./src

# Copy built frontend files from the client-builder stage into the public directory
COPY --from=client-builder --chown=node:node /app/client/dist ./public

# Expose the API port
EXPOSE 5001

# Add HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

# Start the Node.js app
CMD ["npm", "start"]
