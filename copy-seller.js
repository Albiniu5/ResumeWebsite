const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('pictures/seller');
const destDir = path.resolve('public/projects/seller');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file.toLowerCase());
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to ${file.toLowerCase()}`);
});
console.log('Done copying Seller images.');
