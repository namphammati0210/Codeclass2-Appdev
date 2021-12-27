var express = require('express');
var router = express.Router();
const TraineeController = require('../controllers/traineeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Training staff routes');
});

/* Trainee section */
router.get('/createTrainee', TraineeController.renderCreateView);

router.post('/addTrainee', TraineeController.create);


module.exports = router;