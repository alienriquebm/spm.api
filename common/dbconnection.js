const Sequelize = require('sequelize');
const configDb = require('../config/db');

const cn = new Sequelize(configDb.database, configDb.username, configDb.password, {
  host: configDb.host,
  dialect: configDb.dialect,
  timezone: configDb.timezone,
  operatorsAliases: false,
});

cn.getValue = async (table, id, field) => {
  const instance = await cn
    .query(
      `SELECT ${field} FROM ${table} WHERE id = :id limit 1`,
      {
        replacements: { id },
        type: cn.QueryTypes.SELECT,
      },
    );
  if (instance.length) {
    return instance[0];
  }
  return null;
};

module.exports = cn;
