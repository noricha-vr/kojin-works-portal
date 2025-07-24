const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 8x8のピクセルアート風ファビコンを作成
const width = 32;
const height = 32;
const channels = 4;

// 黒背景のバッファを作成
const buffer = Buffer.alloc(width * height * channels);

// 簡単なピクセルアートパターンを描画（黒地に紫のパターン）
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    
    // デフォルトは黒
    buffer[idx] = 0;     // R
    buffer[idx + 1] = 0; // G
    buffer[idx + 2] = 0; // B
    buffer[idx + 3] = 255; // A
    
    // 簡単な紫のパターンを追加
    if ((x > 8 && x < 24) && (y > 8 && y < 24)) {
      buffer[idx] = 128;   // R
      buffer[idx + 1] = 0; // G
      buffer[idx + 2] = 255; // B
    }
  }
}

// PNG形式で保存
sharp(buffer, {
  raw: {
    width: width,
    height: height,
    channels: channels
  }
})
  .png()
  .toFile(path.join(__dirname, '../src/app/icon.png'))
  .then(() => {
    console.log('Favicon created successfully at src/app/icon.png');
  })
  .catch(err => {
    console.error('Error creating favicon:', err);
  });