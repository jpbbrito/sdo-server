'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Occurrences', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        problem: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        note:{
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        state: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        typeService: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        closedDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        user:{
            allowNull: true,
            type: Sequelize.TEXT
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

      return queryInterface.dropTable('Occurrences');
  }
}
