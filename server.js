require('dotenv').config();

const https = require('https');
const fs = require('fs');
const express = require('express');
const uuid = require('uuid').v4;

const questsRoute = require('./server/routes/quests');
const profileRoute = require('./server/routes/profile');
const { Profile, Quest } = require('./server/models');

const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERTIFICATE)
};

// Initiate express server
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/quests', questsRoute);
app.use('/profile', profileRoute);
app.use(express.static('public'));
app.use('/profile_pics', express.static('profile_pics'));

// Initialize server
const server = https.createServer(sslOptions, app)
.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
})
