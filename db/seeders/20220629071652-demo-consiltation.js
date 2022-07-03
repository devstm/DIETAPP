'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const consultations = [...Array(100)].map((consultation, i) => ({
      title: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      user_id: Math.floor(Math.random() * (70 - 1 + 1)) + 1,
    }));
    return queryInterface.bulkInsert('consultations', consultations, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('consultations', null, {});
  },
};
