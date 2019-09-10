const routerUtils = require('../utils/routeUtils');
const usersService = require('../services/usersService');

function getUsers() {
  return usersService.getUsers();
}

module.exports = {
  getUsers: routerUtils.handleResponse(getUsers)
}