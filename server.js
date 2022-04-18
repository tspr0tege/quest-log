const express = require('express');
const Storm = require('stormdb');

const engine = new Storm.localFileEngine('./server/db.stormdb');
const db = new Storm(engine);
db.default({ userProfiles: {}, quests: {} })
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});

app.post('/newQuest', (req, res) => {
  console.log('CREATE new quest: ' + req.body)
  db.get('quests').set(req.body.quest).save();
  res.send(db.get('quests').value())
});

app.post('/questList', (req, res) => {
  console.log('GET quests')
  let response = db.get('quests').value();
  res.send(response);
});

app.use(express.static('public'));