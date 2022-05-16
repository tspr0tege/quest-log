require('dotenv').config();
const express = require('express');
const uuid = require('uuid').v4;
const { auth, requiresAuth } = require('express-openid-connect');
// const Sequelize = require('sequelize')
const sequelize = require('./server/util/database.js');
const { Profile, Quest } = require('./server/models');

const Storm = require('stormdb');

// Setup and initialize stormdb
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
// auth router attaches /login, /logout, and /callback routes to the baseURL

app.post('/quests/create', async (req, res) => {
  let newQuest;
  try {
    newQuest = await Quest.create({
      quest_id: uuid(),
      title:  req.body.title || '',
      notes:  req.body.notes || null,
      owner_id: req.body.userId,
    });
  } catch (err) {
    console.log(err);
  }

  res.send(newQuest);
});

app.put('/quests/edit', async (req, res) => {
  
  try {
    const changeProps = JSON.parse(JSON.stringify(req.body));
    delete changeProps.quest_id;

    console.log('changeProps: ' + JSON.stringify(changeProps));
    console.log('req.body.quest_id: ' + JSON.stringify(req.body.quest_id));
    
    await Quest.update(changeProps, {
      where: {quest_id: req.body.quest_id}
    });
    
    const updatedQuest = await Quest.findByPk(req.body.quest_id);

    res.status(200).json(updatedQuest);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }


});

app.post('/quests/getout', async (req, res) => {
  const { user, questList } = req.body;
  let response = {};

  // if no selections are made, return the full list
  if (!questList?.length >= 1) {
    const userQuestList = await Quest.findAll({
      where: {
        owner_id: user
      }
    })
    userQuestList.forEach((qid) => {
      response[qid] = db.get('quests').get(qid).value();
    })
    res.json(response);

  } else {
    // else: populate an object with the requested quests
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

app.post('/quests/get', async (req, res) => {
  const { user, questList } = req.body;
  const userQuestList = await Quest.findAll({
    where: {
      owner_id: user
    }
  });
    
  res.json(userQuestList);
});

app.delete('/quests/delete/:id', async (req, res) => {
  try {
    await Quest.destroy({
      where: {
        quest_id: req.params.id
      }
    })
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

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
