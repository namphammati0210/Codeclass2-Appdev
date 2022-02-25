const database = require('../database/models/index');
const { Trainer } = database.db;

const findAllTrainers = async () => {
  try {
    const trainers = await Trainer.findAll();
    return trainers;
  } catch (error) {
    console.log("🚀 ~ file: trainerService.js ~ line 9 ~ findAllTrainers ~ error", error)
    return error;
  }
}

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

const create = async (data, transaction) => {
  const trainer = await Trainer.create(data, {transaction});
  return trainer;
}

const findUnassignedTrainers = async ( selectedTrainerId ) => {
  try {
    const trainers = await Trainer.findAll({
      where: {
        [database.db.Sequelize.Op.not]: {
          id: selectedTrainerId
        }
      }
    });
    return trainers;
  } catch (error) {
    console.log("🚀 ~ file: trainerService.js ~ line 50 ~ findUnassignedTrainers ~ error", error)
    return error;
  }
}

module.exports = {
  findTrainerById,
  deleteById,
  create,
  findAllTrainers,
  findUnassignedTrainers
}