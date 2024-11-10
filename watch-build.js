import { exec } from 'child_process';
import chokidar from 'chokidar';

// Initialize watcher with proper options
const watcher = chokidar.watch(['src/**/*.{ts,tsx,css,html}'], {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 100
  }
});

let isBuilding = false;

// Handle file changes
watcher.on('change', async (path) => {
  if (isBuilding) return;
  
  isBuilding = true;
  console.log(`File ${path} changed. Rebuilding...`);

  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error(`Build error: ${stderr}`);
    } else {
      console.log(stdout);
      console.log('Build completed successfully');
    }
    isBuilding = false;
  });
});

console.log('Watching for file changes...');