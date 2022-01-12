const CourseService = require('../services/courseService');
const CourseCategoryService = require('../services/courseCategoryService');

const renderCreateView = async (req, res) => {
  const categories = await CourseCategoryService.findAllCategories();

  res.render('templates/master', { 
    title: 'Create course page',
    content: '../course_view/create',
    categories
  });
}

const create = async (req, res) => {
  try {   
    const { name, description, courseCategoryId } = req.body;
      
    // Create course
    const data = {
      name,
      description,
      courseCategoryId
    }
    const course = await CourseService.create(data);
        
    // If Everything work fine
    res.redirect('/staff');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    res.redirect('/staff/createCourse');
  }
}

const destroy = async(req, res) => {
  const { courseId } = req.params;

  const deletedCourse = await CourseService.deleteById(courseId);

  res.redirect('/staff'); 
}
module.exports = {
  renderCreateView,
  create,
  destroy
}