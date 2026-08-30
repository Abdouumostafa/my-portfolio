const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @font-face {
          font-family: 'BBH Bartle';
          src: url('http://localhost:3001/_next/static/media/bbh-bartle.woff2') format('woff2');
        }
        body { font-family: 'BBH Bartle', sans-serif; font-size: 100px; text-transform: uppercase; letter-spacing: -0.025em; }
        .line { display: inline-block; white-space: nowrap; }
      </style>
    </head>
    <body>
      <span class="line" id="test">Abdelrahman</span>
    </body>
    </html>
  `);
  
  // Wait for font to load
  await page.evaluate(() => document.fonts.ready);
  
  const width = await page.evaluate(() => {
    return document.getElementById('test').getBoundingClientRect().width;
  });
  
  console.log("Width at 100px:", width);
  console.log("CQI:", 10000 / width);
  
  await browser.close();
})();
