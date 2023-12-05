// public/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const userIpElement = document.getElementById('userIp');
    const userAgentElement = document.getElementById('userAgent');
    const browserElement = document.getElementById('browser');
    const osElement = document.getElementById('os');
    const dnsElement = document.getElementById('dns');
    const countryElement = document.getElementById('country');
    const flagElement = document.getElementById('flag');
    const cityElement = document.getElementById('city');
    const regionElement = document.getElementById('region');
  
    // Fetch information from the server
    fetch('/ip-info')
      .then(response => response.json())
      .then(data => {
        userIpElement.textContent = data.ip;
        userAgentElement.textContent = data.userAgent;
        browserElement.textContent = data.browser.name;
        osElement.textContent = data.os.name;
        dnsElement.textContent = data.dns;
        countryElement.textContent = data.country;
        cityElement.textContent = data.city;
        regionElement.textContent = data.region;
        flagElement.innerHTML = `<img src="https://whoer.net/images/flags/${data.country.toLowerCase()}.svg" alt="${data.country} Flag" class="flag-icon" />`;
      })
      .catch(error => console.error('Error:', error));
  });
  