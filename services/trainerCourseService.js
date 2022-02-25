const database = require('../database/models/index');
const { TrainerCourse, Course, Trainer } = database.db;

const assignTrainerIntoCourse = async (trainerId, courseId) => {
  try {
    const result = await TrainerCourse.create({trainerId, courseId});
    return result;
  } catch (error) {
    console.log("🚀 ~ file: trainerCourseService.js ~ line 9 ~ assignTrainerIntoCourse ~ error", error)
    return error
  }
}

const getAssignedTrainers = async() => {
  try {
    const assignedTrainers = await TrainerCourse.findAll({
      include: [ Course, Trainer ]
    });
    return assignedTrainers;
  } catch (error) {
    console.log("🚀 ~ file: trainerCourseService.js ~ line 19 ~ getAssignedTrainers ~ error", error)
    return error;
  }
}

const removeAssignedTrainer = async ( trainerId, courseId ) => {
  try {
    const result = await TrainerCourse.destroy({
      where: {
        trainerId,
        courseId
      }
    });
    return result;
  } catch (error) {
    console.log("🚀 ~ file: trainerCourseService.js ~ line 36 ~ removeAssignedTrainer ~ error", error)
    return error;
  }
}

const updateAssignedTrainer = async ( trainerId, courseId, selectedTrainerId, selectedCourseId ) => {
  console.log(trainerId, courseId, selectedTrainerId, selectedCourseId);
  try {
    const result = await TrainerCourse.update(
      {
        trainerId,
        courseId
      },
      {
        where: {
          trainerId: selectedTrainerId,
          courseId: selectedCourseId
        }
      }
    );
    console.log("🚀 ~ file: trainerCourseService.js ~ line 49 ~ updateAssignedTrainer ~ result", result)
    return result;
  } catch (error) {
    console.log("🚀 ~ file: trainerCourseService.js ~ line 51 ~ updateAssignedTrainer ~ error", error)
    return error;
  }
}

module.exports = {
  assignTrainerIntoCourse,
  getAssignedTrainers,
  removeAssignedTrainer,
  updateAssignedTrainer
}