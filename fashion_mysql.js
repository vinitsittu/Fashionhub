const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();  
const port = process.env.PORT || 9000;
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Sumit@2659',
  database: process.env.DB_NAME || 'vinit'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like HTML
app.use(express.static(__dirname)); // Serve files from the current directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/fas.html'); // Serve the registration page
});

// Register a new user
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users1 (username, email, password) VALUES (?, ?, ?)';
  const values = [username, email, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.json({ success: false, error: err.message });
    } else {
      console.log('User registered successfully:', result);
      res.json({ success: true, user: result });
    }
  });
});

// Login an existing user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users1 WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.json({ success: false, error: err.message });
    } else if (results.length > 0) {
      console.log('User logged in successfully:', results[0]);
      res.json({ success: true, user: results[0] });
    } else {
      console.log('Login failed: Invalid email or password');
      res.json({ success: false, error: 'Invalid email or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


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
