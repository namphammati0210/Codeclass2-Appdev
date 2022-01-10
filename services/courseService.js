const database = require('../database/models/index');
const { Course } = database.db;

const create = async (data) => {
  const course = await Course.create(data);
  return course;
}

const findAllCourses = async () => {
  const categories = await Course.findAll();
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
  findAllCourses,
  findById,
  update
}