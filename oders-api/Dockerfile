#nodejs image
FROM node:22-alpine

# Working directory
WORKDIR /app

#copy package files
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm","start"]
