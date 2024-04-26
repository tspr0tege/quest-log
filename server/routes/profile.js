const express = require('express');
const router = express.Router();
const multer = require('multer');
// const uuid = require('uuid').v4;
const { Profile } = require('../models');

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));

// Setup Multer
let fileSaved;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profile_pics');
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname, file)
    const time = '' + Date.now();
    const rando = Math.floor(Math.random() * 50000);
    const ext = file.mimetype.split('/')[1];
    // console.log("Multer file name: " + file.filename);
    cb(null, `${time}_${rando}.${ext}`);
  }
});
function fileFilter (req, file, cb) {
  const acceptedFileTypes = ['png', 'jpeg', 'jpg'];
  const ext = file.mimetype.split('/')[1];  
  if (acceptedFileTypes.includes(ext)) {  // Run for acceptable files
    fileSaved = true;
    cb(null, true);
  } else {  // Run for rejected files
    fileSaved = false;
    cb(null, false);
  }
}
const upload = multer({storage: storage, fileFilter});

// create quest
router.route('/:user')
  .get(async (req, res) => {
    let profileData;
    try {
      console.log('Searching for user with id: ' + req.params.user)
      profileData = await Profile.findOne({where: {'profile_id': req.params.user}});
      console.log("Profile data retrieved as: " + profileData);
      res.send(profileData);
    }
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  
router.route('/')
  .post(upload.single('profilepic'), async (req, res, next) => {
    console.log('Profile POST received.')
    const responseObj = {};
    if (fileSaved) { //  success
      responseObj.photo_url = '/profile_pics/' + req.file.filename;
      responseObj.profile_id = req.body.profile_id;
      responseObj.name = req.body.username;
      try {
        responseObj.dbResponse = await Profile.create({...responseObj});
      } catch (err) {
        console.log(err);
      }
      res.status(200).send(responseObj);
    } else {  //  error
      console.log('ERROR:', error)
      responseObj.error = "Unable to save file. Please upload: jpg, jpeg, or png format.";
      res.status(500).send(responseObj);
    }
  });
  // .post(async (req, res) => {
  //   let newQuest;
  //   try {
  //     newQuest = await Quest.create({
  //       quest_id: uuid(),
  //       title:  req.body.title || '',
  //       notes:  req.body.notes || null,
  //       owner_id: req.body.userId,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   res.send(newQuest);
  // })
  // .put(async (req, res) => {
  
  //   try {
  //     const changeProps = JSON.parse(JSON.stringify(req.body));
  //     delete changeProps.quest_id;
  //     await Quest.update(changeProps, {
  //       where: {quest_id: req.body.quest_id}
  //     });
  //     const updatedQuest = await Quest.findByPk(req.body.quest_id);
  //     res.status(200).json(updatedQuest);
  //   } 
  //   catch (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   }
  // });

module.exports = router;