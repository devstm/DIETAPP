'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const answers = [...Array(100)].map((answer) => ({
      title: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      recommendations: faker.lorem.paragraph(),
      userId: Math.floor(Math.random() * (100 - 70 + 1)) + 70,
      consultationId: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    }));
    return queryInterface.bulkInsert('answers', answers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('answers', null, {});
  },
};
