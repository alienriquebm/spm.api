module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Observations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      table: {
        type: Sequelize.STRING,
      },
      objectId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })),
  down: queryInterface => queryInterface.dropTable('Observations'),
};
