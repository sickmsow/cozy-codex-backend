# Use official Node.js LTS image as base
FROM node:23-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from current directory (book-service)
COPY package*.json ./

# Install dependencies (production only)
RUN npm install 

# Copy the rest of the app source code
COPY . .

# Expose the port your app listens on
EXPOSE 7000

# Define the command to run your app (adjust path if server.js is inside src/)
CMD ["node", "src/server.js"]
