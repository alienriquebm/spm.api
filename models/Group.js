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

const model = cn.define('groups', fields);
model.isGroupEnabled = async (groupId) => {
  const [instance] = await cn
    .query(
      `
    SELECT COUNT(*) as total FROM groups
    WHERE id = :groupId
    AND isEnabled = 1
    `,
      {
        replacements: {
          groupId,
        },
        type: cn.QueryTypes.SELECT,
      },
    );
  return !!instance.total;
};
model.index = async () => {
  const instance = await cn
    .query(
      `
      SELECT id, title, description, isEnabled
      FROM groups
      WHERE isEnabled = 1
      `,
    );
  if (instance.length) {
    return instance[0];
  }
  return instance;
};
module.exports = model;
