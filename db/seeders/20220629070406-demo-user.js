'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const users = [...Array(70)].map((user) => ({
  userName: faker.internet.userName(),
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: '$2a$10$xGyLOTENzyLW0iv3GCyJMuRxxBE8W59xTtw3fABKUHIbc.PUosQV.',
  role: 'user',
}));
const consultations = [...Array(30)].map((user) => ({
  userName: faker.internet.userName(),
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: '$2a$10$xGyLOTENzyLW0iv3GCyJMuRxxBE8W59xTtw3fABKUHIbc.PUosQV.',
  role: 'consultant',
}));
const toInsert = users.concat(consultations);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', toInsert, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
