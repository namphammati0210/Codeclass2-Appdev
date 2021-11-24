const database = require('../database/models/index');
const sequelize = database.db.sequelize;
const { Role } = database.db;

const findRoleByName = async (name) => {
  const result = await Role.findOne({
    where: {
      name
    }
  })

  return result;
}

module.exports = {
  findRoleByName
}