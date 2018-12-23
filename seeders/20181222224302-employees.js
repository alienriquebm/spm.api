module.exports = {
  up: queryInterface => queryInterface.bulkInsert('employees', [{
    userId: 1,
    position: 'Administrator',
    createdAt: '2018-12-20 23:29:14',
    updatedAt: '2018-12-20 23:29:14',
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('employees', null, {}),
};
