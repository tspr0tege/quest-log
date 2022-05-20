require('dotenv').config();
const express = require('express');
const uuid = require('uuid').v4;
const { auth, requiresAuth } = require('express-openid-connect');
// const Sequelize = require('sequelize')
// const sequelize = require('./server/util/database.js');
const questsRoute = require('./server/routes/quests');
const { Profile, Quest } = require('./server/models');

// Setup and initialize stormdb
const Storm = require('stormdb');
const engine = new Storm.localFileEngine('./server/db.stormdb');
const db = new Storm(engine);
db.default({ userProfiles: {}, quests: {} })

// const quest = require('./server/quest')

const {
  URL,
  AUTH0_SECRET,
  AUTH0_CLIENT_ID,
  AUTH0_URL,
  DATABASE_URL
} = process.env

const auth_config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_URL
};

// Instantiate express server
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(auth(auth_config));
app.use('/quests', questsRoute);

// Get homepage and core application files
app.get('/', requiresAuth(), async (req, res) => {  
  const { user } = req.oidc;
  const profileId = user.sub.split('|')[1];

  let profile = await Profile.findByPk(profileId);

  if (!profile) {
    profile = await Profile.create({
      profile_id: profileId,
      name: user.nickname,
      photo_url: user.picture
    })
  }
  
  res.cookie('profile', profile, {maxAge: 60000*60*24, encode: String});
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:filename', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.filename}`);
});

app.get('/build/:filename', (req, res) => {
  res.sendFile(__dirname + `/public/build/${req.params.filename}`);
});

// Initialize server
app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});
