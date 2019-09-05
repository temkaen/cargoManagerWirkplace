const express = require('express');
const router = express.Router();
const paginationController = require('../controllers/paginationController');
const exspressJoi = require('express-joi-validator');
const companiesSchema = require('../validators/companiesValidator');

router.get(
  '/api/companies/items',
  paginationController.getCompaniesItems
);

router.put(
  '/api/companies/items',
  paginationController.putCompaniesItems
);

module.exports = router;
