const AccountService = require('../services/accountService');

const index = async function(req, res, next) {
  const trainerAccounts = await AccountService.findAllByRole('trainer');

  res.render('templates/master', { 
    title: 'Admin page', 
    content: '../admin_view/index',
    trainerAccounts
  });
}

module.exports = {
  index
}