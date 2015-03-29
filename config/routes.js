module.exports.routes = {
  "get /": "Home$Controller.find",
  "get /login": "LoginController.get_find",
  "post /signup": "SignupController.post_create",
  "post /login": "LoginController.post_create",
  "get /user": "UserController.find",
  "get /signup": "SignupController.get_find"
};