const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'pictures', 'Sproutly');
const destDir = path.join(__dirname, 'public', 'projects', 'sproutly');

console.log('Starting copy process...');
console.log('Source:', srcDir);
console.log('Destination:', destDir);

try {
    if (!fs.existsSync(destDir)) {
        console.log('Creating destination directory...');
        fs.mkdirSync(destDir, { recursive: true });
    }

    if (!fs.existsSync(srcDir)) {
        console.error('Source directory does not exist!');
        process.exit(1);
    }

    const files = fs.readdirSync(srcDir);
    console.log(`Found ${files.length} files in source. Coping...`);

    let copiedCount = 0;
    files.forEach(file => {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file.toLowerCase()); // Make lowercase
        console.log(`Copying ${file} to ${file.toLowerCase()}...`);
        fs.copyFileSync(srcFile, destFile);
        copiedCount++;
    });

    console.log(`Successfully copied ${copiedCount} files.`);
} catch (error) {
    console.error('Error occurred:', error);
}
