const fs = require('fs');
const path = require('path');
const src = 'c:/ANTIGRAVITY-PROJECTS-2026/ResumeWebsite/pictures/Sproutly';
const dest = 'c:/ANTIGRAVITY-PROJECTS-2026/ResumeWebsite/public/projects/sproutly';
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
}
const files = fs.readdirSync(src);
files.forEach(file => {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
});
console.log('Copied ' + files.length + ' files.');
