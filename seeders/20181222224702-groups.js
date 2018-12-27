module.exports = {
  up: queryInterface => queryInterface.bulkInsert('groups', [{
    title: 'Administradores',
    description: 'Administradores del Sistema',
    isEnabled: true,
    createdAt: '2018-12-20 23:29:14',
    updatedAt: '2018-12-20 23:29:14',
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('groups', null, {}),
};
