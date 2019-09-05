const routeUtils = require('../utils/routeUtils');
const companiesService = require('../services/companiesService');
const paginationService = require('../services/paginationService');


function getCompaniesItems(req, res, next) {
  return paginationService.getCompaniesItems(req, res, next);
}

function addCompany(req) {
  return companiesService.addCompany(req.body);
}

function putCompaniesItems() {
  return paginationService.putCompaniesItems(req.body);
}

module.exports = {
  getCompaniesItems: routeUtils.handleResponse(getCompaniesItems),
  putCompaniesItems: routeUtils.handleResponse(putCompaniesItems)
};
