var express = require('express');
var router = express.Router();
const TraineeController = require('../controllers/traineeController');
const TrainingStaffController = require('../controllers/trainingStaffController');
const CourseCategoryController = require('../controllers/courseCategoryController');

/* GET home page. */
router.get('/', TrainingStaffController.index);

/* Trainee section */
router.get('/createTrainee', TraineeController.renderCreateView);

router.post('/addTrainee', TraineeController.create);

router.get('/updateTrainee/:traineeId', TraineeController.renderUpdateView);

router.post('/updateTrainee', TraineeController.update);

// Course category section
router.get('/createCourseCategory', CourseCategoryController.renderCreateView);

router.post('/addCourseCategory', CourseCategoryController.create);

module.exports = router;