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

app.post('/newquest', (req, res) => {
  console.log('CREATE new quest: ' + req.body)
  let newQuest = Quest.create(req.body.quest);
  db.get('quests').set(newQuest.id, newQuest).save();

  res.send(db.get('quests').get(newQuest.id).value());
});

app.post('/getquests', (req, res) => {
  const { questList } = req.body;
  console.log('GET quest(s)');
  console.log('req.body.questList: ' + questList);
  let response = {};

  // if no selections are made, return the full list
  if (!questList || questList.length < 1) { 
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

app.use(express.static('public'));