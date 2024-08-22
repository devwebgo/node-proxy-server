# Use an official Alpine image with Nginx
FROM nginx:alpine

# Install Tor and Privoxy
RUN apk update && apk add tor privoxy

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Tor configuration
COPY torrc /etc/tor/torrc

# Copy Privoxy configuration
COPY privoxy.conf /etc/privoxy/config

# Expose the HTTP port for Nginx and Privoxy
EXPOSE 10000

# Run Nginx, Privoxy, and Tor
CMD ["sh", "-c", "tor -f /etc/tor/torrc & privoxy --no-daemon /etc/privoxy/config & nginx -g 'daemon off;'"]
