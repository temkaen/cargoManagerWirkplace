const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const exspressJoi = require('express-joi-validator');
const companiesSchema = require('../validators/companiesValidator');

router.get(
  '/api/companies',
  companiesController.getCompanies
);

router.post(
  '/api/company',
  exspressJoi(companiesSchema),
  companiesController.addCompany
);

router.put(
  '/api/company/:id',
  exspressJoi(companiesSchema),
  companiesController.editCompany
);

module.exports = router;
