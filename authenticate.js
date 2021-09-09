function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('B is Authenticated');
    return res.redirect('/todos');
  }

  //console.log("B is not Authenticated")
  return next();
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('A is Authenticated');
    return next();
  }

  //console.log("A is not Authenticated")
  return res.redirect('/login');
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
