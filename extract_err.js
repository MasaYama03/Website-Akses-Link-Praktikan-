import fs from 'fs';
const content = fs.readFileSync('public/build/assets/app-BgQIQbEv.js', 'utf8');
const lines = content.split('\n');
const line = lines[81] || lines[0]; // some minifiers put everything on 1 line
const col = 32962;
console.log(line.substring(Math.max(0, col - 80), col + 80));
