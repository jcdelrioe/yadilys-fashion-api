const boom = require('@hapi/boom');
const joi = require('joi');

const validate = (data, schema) => {
  // const { error } = joi.object(schema).validate(data);
  const { error } = schema.validate(data);

  return error;
};

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
