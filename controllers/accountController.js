const AccountService = require('../services/accountService');

const renderChangePass = async (req, res) => { 
  const { id } = req.params;

  const account = await AccountService.findById(id);

  res.render('templates/master', { 
    title: 'Change password',
    content: '../account_view/changePass',
    account,
  });
}

const changePass = async (req, res) => {
  // res.send(req.body);
  const { id, newPassword, confirmPassword } = req.body;

  // Validation: check if new password equal confirm password
  if(newPassword !== confirmPassword) {
    return res.redirect(`/admin/changePass/${id}`);  // ~ ``
  }

  const newAccount = await AccountService.changePassById(id, newPassword);

  return res.redirect('/admin');
}

module.exports = {
  renderChangePass,
  changePass
}