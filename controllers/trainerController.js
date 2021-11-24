const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const {Trainer, Account} = database.db;
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
    var t = await sequelize.transaction();

    const {
      username, password, fullname, specialty, age, address, email, roleId
    } = req.body;
  
    // Create trainer's info
    const trainer = await Trainer.create({
      fullname,
      specialty,
      age,
      address,
      email
    }, {transaction: t})
  
    // Create trainer's account   
    const trainerAccount = await Account.create({
      username,
      password,
      userId: trainer.id,
      roleId
    }, {transaction: t})

    // If Everything work fine
    await t.commit();
    res.redirect('/admin');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    await t.rollback();
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