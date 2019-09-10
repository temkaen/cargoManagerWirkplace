const express = require('express');
const companiesRoute = require('./routes/companiesRoute.js');
const usersRoute = require('./routes/usersRoute.js');

const router = express.Router();

router.use('/', companiesRoute);
router.use('/', usersRoute);

module.exports = router;