const database = require('../database/models/index');
const { Account, Role } = database.db;

const findAllByRole = async (roleName) => {
  const accounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: roleName
      }
    },
  })

  return accounts;
}

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

const create = async (data, transaction) => {
  const account = await Account.create(data, {transaction});
  return account;
}

module.exports = {
  deleteById,
  findById,
  changePassById,
  create,
  findAllByRole
}