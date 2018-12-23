const Sequelize = require('sequelize');
const cn = require('../common/dbconnection');

const fields = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Group id',
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Group title',
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Group description',
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

const model = cn.define('groups', fields);
module.exports = model;
