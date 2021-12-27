const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const RoleService = require('../services/roleService');
const TraineeService = require('../services/traineeService');
const AccountService = require('../services/accountService');

const renderCreateView = async (req, res) => {
  const traineeRole = await RoleService.findRoleByName('trainee');

  res.render('templates/master', { 
    title: 'Create trainee page',
    content: '../trainee_view/create',
    roleId: traineeRole.id  
  });
}

const create = async (req, res) => {
  try {
    let data;
    var transaction = await sequelize.transaction();

    const {
      username, password, name, email, age, dateOfBirth, education, roleId
    } = req.body;
  
    // Create trainer's info
    data = {
      name,
      email,
      age,
      dateOfBirth,
      education
    }
    const trainee = await TraineeService.create(data, transaction);

    // Create trainer's account
    data = {
      username,
      password,
      userId: trainee.id,
      roleId,
    }
    const traineeAccount = await AccountService.create(data, transaction);
        
    // If Everything work fine
    await transaction.commit();
    res.redirect('/staff');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    await transaction.rollback();
    res.redirect('/staff/createTrainee');
  }
}

const renderUpdateView = async (req, res) => {
  const { traineeId } = req.params; // method GET

  const trainee = await TraineeService.findById(traineeId);

  res.render('templates/master', { 
    title: 'Update trainee page',
    content: '../trainee_view/update',
    trainee 
  });
}

const update = async (req, res) => {
  try {
    const { id, name, age, email, dateOfBirth, education } = req.body; // method POST

    const data = {
      name,
      age,
      email,
      dateOfBirth,
      education
    }

    const updatedTrainee = await TraineeService.update(id, data);

    res.redirect("/staff");

  } catch (error) {
    res.redirect(`/staff/updateTrainee/${id}`)
  }
}

module.exports = {
  renderCreateView,
  create,
  renderUpdateView,
  update
}