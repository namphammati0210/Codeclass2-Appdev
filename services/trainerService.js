const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const { Trainer } = database.db;

const findTrainerById = async (id) => {
  const trainer = await Trainer.findOne({
    where: {
      id
    }
  })

  return trainer;
}

const deleteById = async (id) => {
  const deletedTrainer = await Trainer.destroy({
    where: {
      id
    }
  })

  return deletedTrainer;
}

module.exports = {
  findTrainerById,
  deleteById
}