const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();
var proxy = require('http-proxy-middleware')

require('dotenv').config();




const coinProxyOptions = proxy({
  target: 'https://pro-api.coinmarketcap.com/v1',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug',
    pathRewrite: {
        '^/api' : '/'
    },
    onProxyReq: onProxyReq
});

function onProxyReq(proxyReq, req, res) {
  proxyReq.setHeader('X-CMC_PRO_API_KEY', process.env.API_KEY)
}

app.use('/api', coinProxyOptions);


// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/src/'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/src/', 'index.html'));
});

app.listen(port);
