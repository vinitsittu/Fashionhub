const { exec } = require('child_process');
const path = require('path');

// Get the absolute path to the fas.html file
const filePath = path.join(__dirname, 'fas.html');

// Determine the command to open the file based on the OS
const openCommand =
  process.platform === 'win32' ? `start "" "${filePath}"` :
  process.platform === 'darwin' ? `open "${filePath}"` :
  `xdg-open "${filePath}"`;

// Execute the command to open the file
exec(openCommand, (error) => {
  if (error) {
    console.error('Error opening fas.html:', error);
  } else {
    console.log('fas.html opened in the default browser');
  }
});
