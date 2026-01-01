/**
 * PWA Icon Generator Script
 * Run with: npx tsx scripts/generate-pwa-icons.ts
 * 
 * This script generates PWA icons from the source logo.
 * Make sure to install sharp: npm install sharp --save-dev
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const SOURCE_LOGO = path.join(rootDir, 'src/assets/logo.png');
const PUBLIC_DIR = path.join(rootDir, 'public');

// Icon sizes to generate - Logo takes up most of the icon space (minimal padding)
const ICONS = [
  { name: 'pwa-192x192.png', size: 192, padding: 10 },  // Minimal padding for larger logo
  { name: 'pwa-512x512.png', size: 512, padding: 25 },
  { name: 'pwa-maskable-192x192.png', size: 192, padding: 30 }, // Maskable needs safe zone
  { name: 'pwa-maskable-512x512.png', size: 512, padding: 80 },
  { name: 'apple-touch-icon.png', size: 180, padding: 8 },
  { name: 'favicon.ico', size: 32, padding: 2 },
];

async function generateIcons() {
  console.log('Generating PWA icons...\n');

  for (const icon of ICONS) {
    try {
      const logoBuffer = await sharp(SOURCE_LOGO)
        .resize(icon.size - (icon.padding * 2), icon.size - (icon.padding * 2), {
          fit: 'contain',
          background: { r: 250, g: 248, b: 245, alpha: 1 } // cream background
        })
        .toBuffer();

      // Create canvas with background and centered logo
      await sharp({
        create: {
          width: icon.size,
          height: icon.size,
          channels: 4,
          background: { r: 250, g: 248, b: 245, alpha: 1 }
        }
      })
        .composite([{
          input: logoBuffer,
          top: icon.padding,
          left: icon.padding
        }])
        .png()
        .toFile(path.join(PUBLIC_DIR, icon.name));

      console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${icon.name}:`, error);
    }
  }

  console.log('\n✨ PWA icons generated successfully!');
}

generateIcons().catch(console.error);
