module.exports = {
  up: queryInterface => queryInterface.bulkInsert('employees__groups', [{
    employeeId: 1,
    groupId: 1,
    createdAt: '2018-12-20 23:29:14',
    updatedAt: '2018-12-20 23:29:14',
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('employees__groups', null, {}),
};
