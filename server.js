require('dotenv').config();
const path = require('path');
const express = require('express');
const questsRoute = require('./server/routes/quests');
const profileRoute = require('./server/routes/profile');
const { Profile, Quest } = require('./server/models');

// Instantiate express server
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/quests', questsRoute);
app.use('/profile', profileRoute);

// console.log(path.join(__dirname, 'public'))

app.use(express.static('public'));
app.use('/profile_pics', express.static('profile_pics'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Initialize server
app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});