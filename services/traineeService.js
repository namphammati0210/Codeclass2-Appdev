const database = require('../database/models/index');
const { Trainee } = database.db;

const create = async (data, transaction) => {
  const trainee = await Trainee.create(data, {transaction});
  return trainee;
}

module.exports = {
  create
}