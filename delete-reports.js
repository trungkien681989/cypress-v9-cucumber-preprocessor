// delete-reports.js
const fs = require('fs');

const data = '';

// Check if reports directory exists
if (fs.existsSync('./cypress/reports')) {
  if (fs.existsSync('./cypress/reports/html')) {
    fs.unlinkSync('./cypress/reports/merge/output.json', data, { recursive: true });
    fs.rmdirSync('./cypress/reports/merge', { recursive: true });
    fs.rmdirSync('./cypress/reports', { recursive: true });
    fs.mkdirSync('./cypress/reports', { recursive: true });
    fs.mkdirSync('./cypress/reports/merge', { recursive: true });
    fs.writeFileSync('./cypress/reports/merge/output.json', data, { encoding: 'utf-8' });
  }
} else {
  fs.mkdirSync('./cypress/reports', { recursive: true });
  fs.mkdirSync('./cypress/reports/merge', { recursive: true });
  fs.writeFileSync('./cypress/reports/merge/output.json', data, { encoding: 'utf-8' });
}
