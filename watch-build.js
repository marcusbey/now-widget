import { exec } from 'child_process';
import chokidar from 'chokidar';

chokidar.watch(['demo-site/**/*.html', 'src/**/*.{ts,tsx}']).on('change', (path) => {
  console.log(`${path} changed. Rebuilding...`);
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error(`Build error: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });
}); 