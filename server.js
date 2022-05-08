require('dotenv').config();
const express = require('express');
const path = require('path');

const Storm = require('stormdb');
const engine = new Storm.localFileEngine('./server/db.stormdb');
const db = new Storm(engine);
db.default({ userProfiles: {}, quests: {} })

const Quest = require('./server/quest')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});

app.post('/quests/create', (req, res) => {
  let newQuest = Quest.create(req.body.details);
  db.get('quests').set(newQuest.id, newQuest).save();
  db.get('userProfiles').get(req.body.user).get('dayFocus').push(newQuest.id).save();

  res.send(db.get('quests').get(newQuest.id).value());
});

app.put('/quests/edit', (req, res) => {
  const { id } = req.body;
  db.get('quests').get(id).set(req.body).save();
  res.send(db.get('quests').get(id).value());
});

app.post('/quests/get', (req, res) => {
  const { user, questList } = req.body;
  let response = {};

  // if no selections are made, return the full list
  if (!questList?.length >= 1) {
    // console.log('User: ' + user)
    const userQuestList = db.get('userProfiles').get(user).get('dayFocus').value();
    // console.log('User Quest List: ' + JSON.stringify(userQuestList));
    userQuestList.forEach((qid) => {
      response[qid] = db.get('quests').get(qid).value();
    })
    res.json(response);

  // else: populate an object with the requested quests
  } else {
    if (typeof questList === 'string') {
      response[questList] = db.get('quests').get(questList).value();
    } else {
      questList.forEach((qid) => {
        response[qid] = db.get('quests').get(item).value();
      });
    }
    res.json(response);
  }
});

app.delete('/quests/delete/:id', (req, res) => {
  try {    
    // console.log('Deleting quest: ' + req.params.id);
    // console.log('User: ' + req.body.user);
    db.get('quests').get(req.params.id).delete(true);
    db.get('userProfiles').get(req.body.user).get('dayFocus').filter(id => id != req.params.id);
    db.save();
    res.status(200).end()
  } 
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const { auth, requiresAuth } = require('express-openid-connect');

const auth_config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-6-2fm190.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(auth_config));

app.get('/', requiresAuth(), (req, res) => {
  // Handle new user creation here
  const { user } = req.oidc;
  if (!db.get('userProfiles').get(user.nickname)?.value()) {
    db.get('userProfiles').set(user.nickname, 
      {
        user: user.nickname,
        name: user.nickname,
        dayFocus: [],
        weekFocus: [],
        level: 1,
        exp: 0,
        nextLevel: 100,
        photo: user.picture
      }
    ).save();
  }

  res.cookie('user', user, {maxAge: 60000*60*24, encode: String});
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:filename', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.filename}`);
});

app.get('/build/:filename', (req, res) => {
  res.sendFile(__dirname + `/public/build/${req.params.filename}`);
});
