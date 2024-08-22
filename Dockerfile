# Base image with Node.js
FROM node:18

# Install Tor
RUN apt-get update && apt-get install -y tor

# Set up the working directory
WORKDIR /app

# Copy application files
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Copy the Tor configuration file
COPY torrc /etc/tor/torrc

# Expose ports for HTTP proxy server
EXPOSE 3000

# Start both Tor and the Node.js proxy server
CMD tor & node index.js
