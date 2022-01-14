const CourseCategoryService = require('../services/courseCategoryService');

const renderCreateView = async (req, res) => {
  res.render('templates/master', { 
    title: 'Create course category page',
    content: '../courseCategory_view/create',
  });
}

const create = async (req, res) => {
  try {
    const { name, description } = req.body;
      
    // Create course category
    const data = {
      name,
      description
    }
    const courseCategory = await CourseCategoryService.create(data);
        
    // If Everything work fine
    res.redirect('/staff');
   
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
    res.redirect('/staff/createCourseCategory');
  }
}

const destroy = async(req, res) => {
  const {categoryId} = req.params;

  const deletedTrainer = await CourseCategoryService.deleteById(categoryId);

  res.redirect('/staff'); 
}


module.exports = {
  renderCreateView,
  create,
  destroy
}