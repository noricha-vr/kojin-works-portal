const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// アイコンのサイズ設定
const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

// 基本のアイコンファイルパス
const sourceIcon = path.join(__dirname, '../src/app/icon.png');

// 各サイズのアイコンを生成
async function createIcons() {
  for (const { name, size } of sizes) {
    try {
      await sharp(sourceIcon)
        .resize(size, size, { 
          fit: 'cover',
          kernel: 'nearest' // ピクセルアート風を保つ
        })
        .toFile(path.join(__dirname, '../public', name));
      console.log(`Created ${name}`);
    } catch (err) {
      console.error(`Error creating ${name}:`, err);
    }
  }
}

createIcons();