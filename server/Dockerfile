FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API port (adjust if your app uses a different port)
EXPOSE 5001

# Start the Node.js app
CMD ["npm", "start"]
