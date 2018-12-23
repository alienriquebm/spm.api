const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    const plainPassword = 'admin';
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);
    return queryInterface.bulkInsert('users', [{
      email: 'admin@admin.com',
      name: 'SPM',
      lastname: 'Admin',
      password: hashedPassword,
      phone: null,
      address: null,
      isEnabled: 1,
      createdAt: '2018-12-20 23:29:14',
      updatedAt: '2018-12-20 23:29:14',
    }], {});
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
