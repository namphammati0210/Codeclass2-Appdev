const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const { Account } = database.db;

const findById = async (id) => {
  const account = await Account.findOne({
    where: {
      id
    }
  })

  return account;
}

const deleteById = async (id) => {
  const deletedAccount = await Account.destroy({
    where: {
      id
    }
  })

  return deletedAccount;
}

const changePassById = async (id, newPassword) => {
  const newAccount = await Account.update({ password: newPassword}, {
    where: {
      id
    }
  });

  return newAccount;
}

module.exports = {
  deleteById,
  findById,
  changePassById
}