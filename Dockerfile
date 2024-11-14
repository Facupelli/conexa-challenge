# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

RUN npm run build


FROM node:20.11.1-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on, here, I was using port 3333
EXPOSE 3000

# Command to run the app
CMD [  "npm", "run", "start:prod" ]
