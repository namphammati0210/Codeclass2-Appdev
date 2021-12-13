const database = require('../database/models/index');
const { TrainingStaff } = database.db;

const create = async (data, transaction) => {
  const staff = await TrainingStaff.create(data, {transaction});
  return staff;
}

const findStaffById = async (id) => {
  const staff = await TrainingStaff.findOne({
    where: {
      id
    }
  })

  return staff;
}

const deleteById = async (id) => {
  const deletedStaff = await TrainingStaff.destroy({
    where: {
      id
    }
  })

  return deletedStaff;
}

module.exports = {
  create,
  findStaffById,
  deleteById
}