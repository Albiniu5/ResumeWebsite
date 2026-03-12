const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
    try {
        console.log(`Running: ${cmd}`);
        const out = execSync(cmd, { stdio: 'pipe' }).toString();
        fs.appendFileSync('setup_log.txt', `\n--- RUN: ${cmd} ---\n${out}\n`);
    } catch (e) {
        fs.appendFileSync('setup_log.txt', `\n--- ERROR: ${cmd} ---\n${e.message}\n${e.stdout ? e.stdout.toString() : ''}\n${e.stderr ? e.stderr.toString() : ''}\n`);
    }
}

fs.writeFileSync('setup_log.txt', 'Starting setup...\n');

// Init git if not present
run('git init');
run('git add .');
run('git commit -m "Initial commit with responsive fixes"');

// Create GitHub repo using gh CLI
run('gh repo create ResumeWebsite --public --source=. --remote=origin || echo "Repo might already exist"');
run('git branch -M main');
run('git push -u origin main');

// Vercel link and deploy
run('npx vercel link --yes');
run('npx vercel --prod --yes');

console.log('Done script.');
