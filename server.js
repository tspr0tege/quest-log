require('dotenv').config();
const express = require('express');
const uuid = require('uuid').v4;
const questsRoute = require('./server/routes/quests');
const { Profile, Quest } = require('./server/models');

// Instantiate express server
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/quests', questsRoute);

app.use(express.static('public'));

// Initialize server
app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});
