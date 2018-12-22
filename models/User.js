const Sequelize = require('sequelize');
const cn = require('../common/dbconnection');

const fields = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: 'User id',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'User name',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'User name',
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'User lastname',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'User Password',
  },
  phone: {
    type: Sequelize.STRING(30),
    allowNull: true,
    comment: 'User phone',
  },
  address: {
    type: Sequelize.STRING(30),
    allowNull: true,
    comment: 'User phone',
  },
  isEnabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    comment: 'The user is or not enabled',
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

const model = cn.define('users', fields);
module.exports = model;
