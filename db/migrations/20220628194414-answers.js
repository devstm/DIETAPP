'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Answers',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          recommendations: {
            type: Sequelize.STRING,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          consultation_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'consultations',
              key: 'id',
            },
          },
          is_draft: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deleted_at: {
            allowNull: true,
            type: Sequelize.DATE,
          },
          created_by: {
            type: Sequelize.INTEGER,
          },
          updated_by: {
            type: Sequelize.INTEGER,
          },
        },
        { transaction: t },
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('answers');
  },
};
