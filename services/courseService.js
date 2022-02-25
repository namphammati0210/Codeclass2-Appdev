const database = require('../database/models/index');
const { Course, CourseCategory } = database.db;

const create = async (data) => {
  const course = await Course.create(data);
  return course;
}

const findAllCourses = async () => {
  const categories = await Course.findAll({include: CourseCategory});
  console.log("🚀 ~ file: courseService.js ~ line 11 ~ findAllCourses ~ categories", categories)
  return categories;
}

const findById = async (id) => {
  const course = await Course.findOne({
    where: {
      id
    },
    include: CourseCategory
  })

  return course;
}

const update = async (id, data) => {
  const updatedTrainee = await Course.update(data, {
    where: {
      id
    }
  });

  return updatedTrainee;
}

const deleteById = async (id) => {
  await Course.destroy({
    where: {
      id
    }
  });
}

const findUnassignedCoures = async ( selectedCourseId ) => {
  try {
    const courses = await Course.findAll({
      where: {
        [database.db.Sequelize.Op.not]: {
          id: selectedCourseId
        }
      }
    });
    return courses;
  } catch (error) {
    console.log("🚀 ~ file: courseService.js ~ line 55 ~ findUnassignedCoures ~ error", error)
    return error;
  }
}

module.exports = {
  create,
  findAllCourses,
  findById,
  update,
  deleteById,
  findUnassignedCoures
}