'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('States', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
    })
 
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('States');

  }
};
