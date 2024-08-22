const http = require('http');
const httpProxy = require('http-proxy');
const { SocksProxyAgent } = require('socks-proxy-agent');

const port = process.env.PORT || 8080;

// Create a SOCKS proxy agent
const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

// Create a proxy server
const proxy = httpProxy.createProxyServer({
    agent: agent,
    secure: false, // Disable SSL verification for outgoing connections (if necessary)
});

// Create an HTTP server that uses the proxy server
const server = http.createServer((req, res) => {
    if (req.method === 'CONNECT') {
        // Handle CONNECT method used for HTTPS tunneling
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('502 Bad Gateway');
    } else {
        const target = req.url || '';
        proxy.web(req, res, {
            target: target,
            changeOrigin: true,
        }, (error) => {
            console.error('Proxy error:', error.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error: ' + error.message);
        });
    }
});

// Handle errors globally
server.on('error', (error) => {
    console.error('Server error:', error.message);
});

server.listen(port, () => {
    console.log(`HTTP Proxy server is running on port ${port}`);
});
