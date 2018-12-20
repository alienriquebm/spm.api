const Sequelize = require('sequelize');
const cn = require('../common/dbconnection');

const fields = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Observations id',
  },
  table: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: 'Table name',
  },
  objectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Object id',
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

const model = cn.define('observations', fields);
module.exports = model;
