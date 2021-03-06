'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return queryInterface.createTable(
        'Consultations',
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
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
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
    return queryInterface.dropTable('consultation');
  },
};
