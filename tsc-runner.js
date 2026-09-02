const { execSync } = require('child_process');
const fs = require('fs');
const path = 'c:/Users/User/Desktop/realstate';
try {
  const out = execSync('npx tsc --noEmit', { cwd: path, encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync(path + '/tsc-result.txt', 'OK\n' + (out || ''));
} catch (e) {
  fs.writeFileSync(path + '/tsc-result.txt', 'FAIL exit=' + e.status + '\nSTDOUT:\n' + (e.stdout || '') + '\nSTDERR:\n' + (e.stderr || ''));
}
