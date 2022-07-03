'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Votes',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          answer_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'Answers',
              key: 'id',
            },
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          vote: {
            allowNull: false,
            type: Sequelize.ENUM('up', 'down'),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
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
      await queryInterface.sequelize.query(
        `ALTER TABLE Votes
        ADD uniq_answer_id_user_id VARCHAR(255) AS (
         CONCAT(
          answer_id,'|',user_id, '|', ifnull(user_id, 0)
         )
       ) UNIQUE;`,
        { transaction: t },
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes');
  },
};
