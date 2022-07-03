'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          username: {
            type: Sequelize.STRING,
          },
          first_name: {
            type: Sequelize.STRING,
          },
          middle_name: {
            type: Sequelize.STRING,
          },
          last_name: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
          },
          password: {
            type: Sequelize.STRING,
          },
          role: {
            type: Sequelize.ENUM('user', 'consultant', 'moderator'),
            defaultValue: 'user',
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
            type: Sequelize.DATE,
          },
          created_by: {
            type: Sequelize.INTEGER,
            defaultValue: this.id,
          },
          updated_by: {
            type: Sequelize.INTEGER,
          },
        },
        {
          transaction: t,
        },
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE Users
       ADD uniq_username_deleted_at VARCHAR(255) AS (
        CONCAT(
          username,'|',deleted_at, '|', ifnull(deleted_at, 0)
        )
      ) UNIQUE;`,
        { transaction: t },
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
