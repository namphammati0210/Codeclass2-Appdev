var express = require('express');
var router = express.Router();
const TraineeController = require('../controllers/traineeController');
const TrainingStaffController = require('../controllers/trainingStaffController');

/* GET home page. */
router.get('/', TrainingStaffController.index);

/* Trainee section */
router.get('/createTrainee', TraineeController.renderCreateView);

router.post('/addTrainee', TraineeController.create);

router.get('/updateTrainee/:traineeId', TraineeController.renderUpdateView);

router.post('/updateTrainee', TraineeController.update);

module.exports = router;