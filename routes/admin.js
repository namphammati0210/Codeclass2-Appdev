var express = require('express');
var router = express.Router();
const {db} = require('../database/models/index')
const sequelize = db.sequelize;
const database = require('../database/models/index');

const {Trainer, Account, Role} = database.db;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const trainerAccounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: 'trainer'
      }
    },
  })

  res.render('templates/master', { 
    title: 'Admin page', 
    content: '../admin_view/index',
    trainerAccounts
  });
});

router.get('/createTrainer', async (req, res) => {

  const trainerRole = await Role.findOne({
    where: {
      name: 'trainer'
    }
  })

  res.render('templates/master', { 
    title: 'Create trainer page',
    content: '../trainer_view/create',
    roleId: trainerRole.id  
  });
})


router.post('/addTrainer', async (req, res) => {
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

    // If create trainer's info failed then back to the create trainer page
    if(!trainer) {
      await t.rollback();
      res.redirect('/admin/createTrainer') // body guard
    }
  
    // Create trainer's account   
    const trainerAccount = await Account.create({
      username,
      password,
      userId: trainer.id,
      roleId
    }, {transaction: t})

    // If create trainer's account failed then back to the create trainer page
    if(!trainerAccount) {
      await t.rollback();
      res.redirect('/admin/createTrainer')
    }

    // If Everything work fine
    await t.commit();
    res.redirect('/admin');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    await t.rollback();
    res.redirect('/admin/createTrainer');
  }
})

module.exports = router;
