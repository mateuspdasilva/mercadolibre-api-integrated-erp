# Use a base Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server directory
COPY server/ ./server

# Copy other necessary files and folders
COPY sequelize.js ./

# Expose the desired port (change PORT_NUMBER to your desired port)
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
