'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users',{
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password : {
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
      }
    )

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users');

  }
};
