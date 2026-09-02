const fs = require('fs');
const f = 'c:/Users/User/Desktop/realstate/tsc-result.txt';
const c = fs.readFileSync(f, 'utf8');
fs.writeFileSync('c:/Users/User/Desktop/realstate/dump.txt', 'CONTENT:\n' + c + '\nEND\n');