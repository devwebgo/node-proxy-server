# Use an official Tor image
FROM alpine:3.14

# Install Tor
RUN apk update && apk add tor

# Copy Tor configuration
COPY torrc /etc/tor/torrc

# Expose the SOCKS5 port
EXPOSE 9050

# Run Tor when the container starts
CMD ["tor", "-f", "/etc/tor/torrc"]
