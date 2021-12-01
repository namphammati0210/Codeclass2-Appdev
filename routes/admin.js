var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const {Account, Role} = database.db;
const TrainerController = require('../controllers/trainerController');
const AccountController = require('../controllers/accountController');
const AdminController = require('../controllers/adminController');

/* Trainer routes */
router.get('/', AdminController.index);

router.get('/createTrainer', TrainerController.renderCreateView);

router.post('/addTrainer', TrainerController.create);

router.get('/viewTrainer/:userId', TrainerController.view)

router.get('/deleteTrainer/:id/:userId', TrainerController.destroy)


// Change trainer's password and staff's password
router.get('/changePass/:id', AccountController.renderChangePass)

router.post('/updatePass', AccountController.changePass)

module.exports = router;
