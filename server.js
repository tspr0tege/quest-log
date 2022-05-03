require('dotenv').config();
const express = require('express');
const Storm = require('stormdb');
const Quest = require('./server/quest')

const engine = new Storm.localFileEngine('./server/db.stormdb');
const db = new Storm(engine);
db.default({ userProfiles: {}, quests: {} })
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});

app.post('/quests/create', (req, res) => {
  let newQuest = Quest.create(req.body);
  db.get('quests').set(newQuest.id, newQuest).save();

  res.send(db.get('quests').get(newQuest.id).value());
});

app.put('/quests/edit', (req, res) => {
  const { id } = req.body;
  db.get('quests').get(id).set(req.body).save();
  res.send(db.get('quests').get(id).value());
});

app.post('/quests/get', (req, res) => {
  const { questList } = req.body;
  let response = {};

  // if no selections are made, return the full list
  if (!questList?.length >= 1) { 
    response = db.get('quests').value();
    res.json(response);

  // else: populate an object with the requested quests
  } else {
    if (typeof questList === 'string') {
      response[questList] = db.get('quests').get(questList).value();
    } else {
      questList.forEach((item, index) => {
        response[item] = db.get('quests').get(item).value();
      });
    }
    res.json(response);
  }
});

app.delete('/quests/delete/:id', (req, res) => {
  try {
    console.log('Deleting quest: ' + req.params.id);
    db.get('quests').get(req.params.id).delete(true);
    db.save();
    res.status(200).end()
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.use(express.static('public'));



const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-6-2fm190.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/login', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/dashboard', (req, res) => {
  res.send('Auth0 authentication successful');
});
