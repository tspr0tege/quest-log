const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const { Quest } = require('../models');

router.use(express.json());

// create quest
router.route('/')
  .post(async (req, res) => {
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
  })
  .put(async (req, res) => {
  
    try {
      const changeProps = JSON.parse(JSON.stringify(req.body));
      delete changeProps.quest_id;
      await Quest.update(changeProps, {
        where: {quest_id: req.body.quest_id}
      });
      const updatedQuest = await Quest.findByPk(req.body.quest_id);
      res.status(200).json(updatedQuest);
    } 
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  router.delete('/:id', async (req, res) => {
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

  router.post('/get', async (req, res) => {
    const { user, questList } = req.body;

    // default get when request body is empty
    try {
      const userQuestList = await Quest.findAll({
        where: {
          owner_id: user
        }
      });        
      res.json(userQuestList);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


/* **OLD GET ENDPOINT**

  router.post('/quests/getout', async (req, res) => {
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
*/





module.exports = router;