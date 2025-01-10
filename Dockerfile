# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Create directory for MongoDB data
RUN mkdir -p /data/db

# Expose the port the app runs on
EXPOSE 5000

# Create a script to start MongoDB and the Node.js app
RUN echo "#!/bin/bash\nmongod --fork --logpath /var/log/mongodb.log\nnpm start" > /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Set environment variables
ENV MONGODB_URI=mongodb://localhost:27017/sortelegal
ENV JWT_SECRET=your_jwt_secret_here
ENV ENCRYPTION_KEY=your_32_character_encryption_key

# Start MongoDB and the Node.js app
CMD ["/usr/src/app/start.sh"]

