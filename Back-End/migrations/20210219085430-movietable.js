'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable('movie_table', {
      id: {type:Sequelize.INTEGER, unique: true, allowNull:false, primaryKey:true, autoIncrement:true},
      user_id:{type:Sequelize.INTEGER, allowNull:false},
      movie_id:{type:Sequelize.INTEGER, allowNull:false}
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
