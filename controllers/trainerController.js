const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const RoleService = require('../services/roleService');
const TrainerService = require('../services/trainerService');
const AccountService = require('../services/accountService');

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

module.exports = {
  renderCreateView,
  create,
  view,
  destroy
}