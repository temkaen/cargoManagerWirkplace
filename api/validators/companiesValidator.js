const Joi = require('joi');

const companiesSchema ={
  body: Joi.object().keys({
    id: Joi.string().length(9).optional(),
    name: Joi.string().trim().min(1).required(),
    address: Joi.string().trim().min(1).required(),
    contactPerson: Joi.string().trim().min(1).required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().regex(/^(\+?375-?|8-?0)(29|25|44|33|17)-?\d{3}-?\d{2}-?\d{2}$/).required(),
    status: Joi.valid(['Active', 'Pause']).optional()
  })
};

module.exports = companiesSchema;