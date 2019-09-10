const routeUtils = require('../utils/routeUtils');
const companiesService = require('../services/companiesService');

function getCompanies() {
  return companiesService.getCompanies();
}

function addCompany(req) {
  return companiesService.addCompany(req.body);
}

module.exports = {
  getCompanies: routeUtils.handleResponse(getCompanies),
  addCompany: routeUtils.handleResponse(addCompany)
};