# Use an official Alpine image with Nginx
FROM nginx:alpine

# Install Tor
RUN apk update && apk add tor

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Tor configuration
COPY torrc /etc/tor/torrc

# Expose the HTTP port for Nginx and SOCKS5 port for Tor
EXPOSE 10000 9050

# Run Nginx and Tor
CMD ["sh", "-c", "tor -f /etc/tor/torrc & nginx -g 'daemon off;'"]
