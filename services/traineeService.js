const database = require('../database/models/index');
const { Trainee } = database.db;

const create = async (data, transaction) => {
  const trainee = await Trainee.create(data, {transaction});
  return trainee;
}

const findById = async (id) => {
  const trainee = await Trainee.findOne({
    where: {
      id
    }
  })

  return trainee;
}

const update = async (id, data) => {
  const updatedTrainee = await Trainee.update(data, {
    where: {
      id
    }
  });

  return updatedTrainee;
}

module.exports = {
  create,
  findById,
  update
}