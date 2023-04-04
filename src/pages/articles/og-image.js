const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');
import chromium from 'chrome-aws-lambda';

export async function generateOgImage(props) {
  const params = new URLSearchParams(props);
  const url = `file://${path.join(
    process.cwd(),
    `src/pages/articles/og-image.html?${params}`
  )}`;

  const websiteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
  const absoluteUrl = `${websiteUrl}/og-image?${params}`;
  console.log('absoluteUrl:', absoluteUrl);

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
  const browser = process.env.AWS_EXECUTION_ENV
    ? await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
      })
    : await chromium.puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(absoluteUrl, { waitUntil: 'networkidle0' });
  const buffer = await page.screenshot();
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}
