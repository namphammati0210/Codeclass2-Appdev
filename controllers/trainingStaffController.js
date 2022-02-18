const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const RoleService = require('../services/roleService');
const AccountService = require('../services/accountService');
const TrainingStaffService = require('../services/trainingStaffService');
const CourseCategoryService = require('../services/courseCategoryService');
const CourseService = require('../services/courseService');
const TrainerCourseService = require('../services/trainerCourseService');

const index = async (req, res) => {
  const traineeAccounts = await AccountService.findAllByRole('trainee');
  const categories = await CourseCategoryService.findAllCategories();
  const courses = await CourseService.findAllCourses();
  const assignedTrainers = await TrainerCourseService.getAssignedTrainers();

  res.render('templates/master', { 
    title: 'Staff page', 
    content: '../trainingStaff_view/index',
    traineeAccounts,
    categories,
    courses,
    assignedTrainers
  });
}

const renderCreateView = async (req, res) => {
  const staffRole = await RoleService.findRoleByName('trainingStaff');

  res.render('templates/master', { 
    title: 'Create Staff page',
    content: '../trainingStaff_view/create',
    roleId: staffRole.id  
  });
}

const create = async (req, res) => {
  try {
    let data;
    var transaction = await sequelize.transaction();

    const {
      username, password, fullname, age, address, email, roleId
    } = req.body;
  
    // Create staff's info
    data = {
      fullname,
      age,
      address,
      email
    }
    const staff = await TrainingStaffService.create(data, transaction);

    // Create staff's account
    data = {
      username,
      password,
      userId: staff.id,
      roleId,
    }
    const staffAccount = await AccountService.create(data, transaction);
        
    // If Everything work fine
    await transaction.commit();
    res.redirect('/admin');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    await transaction.rollback();
    res.redirect('/admin/createStaff');
  }
}

const view = async (req, res) => {
  const {userId} = req.params; 
  const staff = await TrainingStaffService.findStaffById(userId);

  res.render('templates/master', { 
    title: 'View trainer',
    content: '../trainingStaff_view/view',
    staff,
  });
}

const destroy = async(req, res) => {
  const {id, userId} = req.params;

  const deletedStaff = await TrainingStaffService.deleteById(userId);

  const deletedStaffAccount = await AccountService.deleteById(id);

  res.redirect('/admin'); 
}

module.exports = {
  renderCreateView,
  create,
  view,
  destroy,
  index
}