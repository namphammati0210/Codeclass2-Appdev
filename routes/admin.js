var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const {Account, Role} = database.db;
const TrainerController = require('../controllers/trainerController');
const AccountController = require('../controllers/accountController');

/* Trainer routes */
router.get('/', async function(req, res, next) {
  const trainerAccounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: 'trainer'
      }
    },
  })

  res.render('templates/master', { 
    title: 'Admin page', 
    content: '../admin_view/index',
    trainerAccounts
  });
});

router.get('/createTrainer', TrainerController.renderCreateView);

router.post('/addTrainer', TrainerController.create);

router.get('/viewTrainer/:userId', TrainerController.view)

router.get('/deleteTrainer/:id/:userId', TrainerController.destroy)


// Change trainer's password and staff's password
router.get('/changePass/:id', AccountController.renderChangePass)

router.post('/updatePass', AccountController.changePass)

module.exports = router;
