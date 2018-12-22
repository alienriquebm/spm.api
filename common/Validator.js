const Validator = require('validatorjs');

const defaultMessages = () => ({
  email: 'Escriba una dirección de correo válida',
  required: 'Campo requerido',
});

Validator.doValidation = (fields, validationRules) => new Promise((resolve) => {
  const {
    rules,
  } = validationRules;
  const messages = Object.assign(defaultMessages(), validationRules.messages);
  const isValid = new Validator(fields, rules, messages);
  isValid.checkAsync(() => resolve(true), () => resolve(isValid.errors.all()));
});

module.exports = Validator;
