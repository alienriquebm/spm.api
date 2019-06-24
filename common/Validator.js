const Validator = require('validatorjs');
const sequelize = require('../common/dbconnection');

const defaultMessages = () => ({
  // email: 'Escriba una dirección de correo válida',
  // required: 'Campo requerido',
});

Validator.doValidation = (fields, validationRules) => new Promise((resolve) => {
  const {
    rules,
  } = validationRules;
  const messages = Object.assign(defaultMessages(), validationRules.messages);
  const isValid = new Validator(fields, rules, messages);
  isValid.checkAsync(() => resolve(true), () => resolve(isValid.errors.all()));
});

Validator.registerAsync('exists', async (value, attribute, req, passes) => {
  let valueParsed = attribute;
  valueParsed = valueParsed.split(',');
  if (valueParsed.length < 2) {
    return passes(false);
  }
  const table = valueParsed[0];
  const field = valueParsed[1];

  const instance = await sequelize.query(`SELECT id FROM ${table} WHERE ${field} = ${value}`,
    {
      type: sequelize.QueryTypes.SELECT,
    });
  if (!instance.length) {
    return passes(false);
  }
  return passes();
}, 'No existe');

module.exports = Validator;
