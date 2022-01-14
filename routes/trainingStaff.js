var express = require('express');
var router = express.Router();
const TraineeController = require('../controllers/traineeController');
const TrainingStaffController = require('../controllers/trainingStaffController');
const CourseCategoryController = require('../controllers/courseCategoryController');
const CourseController = require('../controllers/courseController');

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

router.get('/deleteCourseCategory/:categoryId', CourseCategoryController.destroy)

// Course section
router.get('/createCourse', CourseController.renderCreateView);

router.post('/addCourse', CourseController.create);

router.get('/deleteCourse/:courseId', CourseController.destroy);

router.get('/updateCourse/:courseId', CourseController.renderUpdateView);

router.post('/updateCourse', CourseController.update);

module.exports = router;