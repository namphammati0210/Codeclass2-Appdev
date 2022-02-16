const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const RoleService = require('../services/roleService');
const TrainerService = require('../services/trainerService');
const AccountService = require('../services/accountService');
const CourseService = require('../services/courseService');
const TrainerCourseService = require('../services/trainerCourseService');

const renderCreateView = async (req, res) => {
  const trainerRole = await RoleService.findRoleByName('trainer');

  res.render('templates/master', { 
    title: 'Create trainer page',
    content: '../trainer_view/create',
    roleId: trainerRole.id  
  });
}

const create = async (req, res) => {
  try {
    let data;
    var transaction = await sequelize.transaction();

    const {
      username, password, fullname, specialty, age, address, email, roleId
    } = req.body;
  
    // Create trainer's info
    data = {
      fullname,
      specialty,
      age,
      address,
      email
    }
    const trainer = await TrainerService.create(data, transaction);

    // Create trainer's account
    data = {
      username,
      password,
      userId: trainer.id,
      roleId,
    }
    const trainerAccount = await AccountService.create(data, transaction);
        
    // If Everything work fine
    await transaction.commit();
    res.redirect('/admin');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    await transaction.rollback();
    res.redirect('/admin/createTrainer');
  }
}

const view = async (req, res) => {
  const {userId} = req.params; 
  const trainer = await TrainerService.findTrainerById(userId);

  res.render('templates/master', { 
    title: 'View trainer',
    content: '../trainer_view/view',
    trainer,
  });
}

const destroy = async(req, res) => {
  const {id, userId} = req.params;

  const deletedTrainer = await TrainerService.deleteById(userId);

  const deletedTrainerAccount = await AccountService.deleteById(id);

  res.redirect('/admin'); 
}

const assignTrainer = async(req, res, next) => {
  try {
    const trainers = await TrainerService.findAllTrainers();
    const courses = await CourseService.findAllCourses();

    return res.render('templates/master', { 
      title: 'Assign trainer page',
      content: '../assignTrainer_view/create',
      trainers,
      courses
    }); // ctrl + alt + l
  } catch (error) {
    console.log("🚀 ~ file: trainerController.js ~ line 83 ~ assignTrainer ~ error", error)
    next(error)
  }
}

const addTrainerCourse = async (req, res, next) => {
  // return res.send(req.body);
  try {
    const { trainerId, courseId } = req.body;
    const trainerCourse = await TrainerCourseService.assignTrainerIntoCourse(trainerId, courseId);
    
    if(!trainerCourse) res.redirect('/staff/assignTrainer');

    res.redirect('/staff');

  } catch (error) {
    console.log("🚀 ~ file: trainerController.js ~ line 106 ~ addTrainerCourse ~ error", error)
    res.redirect('/staff/assignTrainer');
  }
}

module.exports = {
  renderCreateView,
  create,
  view,
  destroy,
  assignTrainer,
  addTrainerCourse
}