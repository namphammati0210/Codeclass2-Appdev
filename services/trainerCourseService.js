const database = require('../database/models/index');
const { TrainerCourse } = database.db;

const assignTrainerIntoCourse = async (trainerId, courseId) => {
  try {
    const result = await TrainerCourse.create({trainerId, courseId});
    console.log("🚀 ~ file: trainerCourseService.js ~ line 6 ~ assignTrainerIntoCourse ~ result", result)
    return result;
  } catch (error) {
    console.log("🚀 ~ file: trainerCourseService.js ~ line 9 ~ assignTrainerIntoCourse ~ error", error)
    return error
  }
}

module.exports = {
  assignTrainerIntoCourse
}