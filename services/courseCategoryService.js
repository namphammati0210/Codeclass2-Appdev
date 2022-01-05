const database = require('../database/models/index');
const { CourseCategory } = database.db;

const create = async (data) => {
  const courseCategory = await CourseCategory.create(data);
  return courseCategory;
}

const findAllCategoies = async () => {
  const categories = await CourseCategory.findAll();
  return categories;
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
  findAllCategoies,
  findById,
  update
}