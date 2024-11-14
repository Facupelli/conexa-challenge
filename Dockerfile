# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies for building
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm ci --only=production

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npm run start:prod"]
