const express = require('express');
const { SocksProxyAgent } = require('axios-socks-proxy-agent');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Configure SOCKS proxy agent to use Tor
const agent = new SocksProxyAgent({
    hostname: '127.0.0.1',
    port: 9050
});

// HTTP Proxy route
app.use('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a URL to proxy via the "url" query parameter.');
    }

    try {
        const response = await axios.get(url, { httpAgent: agent, httpsAgent: agent });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the requested URL: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`HTTP Proxy server is running on port ${port}`);
});
