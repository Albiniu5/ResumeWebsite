const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'pictures', 'videomaker');
const destDir = path.resolve(__dirname, 'public', 'projects', 'videomaker');

console.log('Source:', srcDir);
console.log('Destination:', destDir);

try {
    if (!fs.existsSync(srcDir)) {
        console.log('Source directory NOT FOUND.');
        process.exit(1);
    }

    const publicDir = path.resolve(__dirname, 'public');
    const projectsDir = path.resolve(publicDir, 'projects');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    if (!fs.existsSync(projectsDir)) {
        fs.mkdirSync(projectsDir);
    }
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }

    const files = fs.readdirSync(srcDir);
    let copied = 0;
    for (const file of files) {
        if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.png')) continue;
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file.toLowerCase());
        fs.copyFileSync(srcFile, destFile);
        copied++;
    }
    console.log(`Successfully copied ${copied} files.`);
} catch (e) {
    console.error('ERROR:', e);
}
