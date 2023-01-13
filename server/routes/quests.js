const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const { Quest, Profile } = require('../models');

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

router.put('/complete', async (req, res) => {
  // req.body.questId
  const { user } = req.body;
  try {
    await Quest.update({completed: true}, {
      where: {quest_id: req.body.questId}
    });
    // await Profile.update({exp}, 
    //   {where: {profile_id: req.body.user}}
    // );
    const targetProfile = await Profile.findByPk(user);
    const nextLevel = Math.floor(100 * Math.pow(1.1, targetProfile.level - 1));
    const profileUpdate = {};

    if ((targetProfile.exp += 10) > nextLevel) {
      profileUpdate.level = ++targetProfile.level;
    }
    profileUpdate.exp = (targetProfile.level === profileUpdate.level) 
      ? targetProfile.exp - nextLevel 
      : targetProfile.exp;
    Profile.update(profileUpdate, {
      where: {profile_id: user}
    });

    res.status(200).send(profileUpdate);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
  
router.post('/delete', async (req, res) => {
  try {
    await Quest.destroy({
      where: {
        quest_id: req.body.questId
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
        owner_id: user,
        completed: false
      }
    });        
    res.json(userQuestList);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;