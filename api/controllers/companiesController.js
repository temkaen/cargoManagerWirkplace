const routeUtils = require('../utils/routeUtils');
const companiesService = require('../services/companiesService');

function getCompanies() {
  return companiesService.getCompanies();
}

function addCompany(req) {
  return companiesService.addCompany(req.body);
}

function editCompany(req) {
  return companiesService.editCompany(req.params.id, req.body);
}

module.exports = {
  getCompanies: routeUtils.handleResponse(getCompanies),
  addCompany: routeUtils.handleResponse(addCompany),
  editCompany: routeUtils.handleResponse(editCompany)
};
