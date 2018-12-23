module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Employee id',
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Employee position',
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
  down: queryInterface => queryInterface.dropTable('employees'),
};
