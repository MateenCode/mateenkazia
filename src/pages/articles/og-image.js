const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');

export async function generateOgImage(props) {
  const params = new URLSearchParams(props);
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og-image?${params}`;
  console.log('URL:', url);

  const hash = createHash('md5').update(url).digest('hex');
  const ogImageDir = path.join(process.cwd(), `public/og`);
  const imageName = `${hash}.png`;
  const imagePath = `${ogImageDir}/${imageName}`;
  const publicPath = `https://${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/${imageName}`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exists, so we create it
  }

  // Replace 'YOUR_API_KEY' with your Browserless API key
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.NEXT_BROWSERLESS_API_KEY}`
  });
  console.log('URL:', url);

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const buffer = await page.screenshot();
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}
