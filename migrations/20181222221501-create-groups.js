module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('groups', {
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
    })),
  down: queryInterface => queryInterface.dropTable('groups'),
};
