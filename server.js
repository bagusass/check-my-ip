// server.js
const express = require('express');
const requestIp = require('request-ip');
const useragent = require('useragent');
const dns = require('dns');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware untuk mendapatkan IP pengguna
app.use(requestIp.mw());
app.use(express.static('public'));

// Handler untuk rute root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/ip-info', async (req, res) => {
  const clientIp = req.clientIp;
  const userAgent = req.get('user-agent');

  const agent = useragent.parse(userAgent);
  const browserInfo = {
    name: agent.family,
    version: agent.major
  };
  const osInfo = {
    name: agent.os.family,
    version: agent.os.major
  };

  // Deteksi informasi DNS (contoh menggunakan google.com)
  dns.lookup('google.com', async (err, addresses) => {
    if (err) throw err;

    const dnsInfo = addresses;

    // Deteksi informasi negara berdasarkan IP menggunakan ipinfo.io

    const ipInfoResponse = await axios.get(`https://ipinfo.io/${clientIp}?token=95a742abcac2ea`);
    const ipInfoData = ipInfoResponse.data;


    // Mendapatkan kode negara dan bendera dari ipinfo.io
    const city = ipInfoData.city;
    const region = ipInfoData.region;
    const countryCode = ipInfoData.country;
    const flagEmoji = countryCode;

    // Mengirim informasi sebagai JSON
    res.json({
      ip: clientIp,
      userAgent: userAgent,
      browser: browserInfo,
      os: osInfo,
      dns: dnsInfo,
      country: ipInfoData.country,
      flag: flagEmoji,
      city: city,
      region: region
    });
  });
});

// Menjalankan server pada port tertentu
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

