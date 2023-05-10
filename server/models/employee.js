const { Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      }, 

      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      
      tz: {
        type: Sequelize.INTEGER(9),
        primaryKey: true,
        validate: {
          isInt: true,
          len: [9, 9]},
        allowNull: false,
      },

      address: {
        type: Sequelize.JSON,
        allowNull: false, fields: {
          city: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          street: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          number: {
            type: Sequelize.STRING,
            allowNull: false,
          } }
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        }
      },

      landline:{
        type: Sequelize.INTEGER(8),
        validate: {
          isInt: true,
          len: [8, 8]},
        allowNull: false,

      },
      mobile_phone:{
        type: Sequelize.INTEGER(9),
        validate: {
          isInt: true,
          len: [9, 9]},
        allowNull: false,

      },
      
      });
     
      Employee.associate = (models) => {
        Employee.hasMany(models.coronainfo, {
          foreignKey: 'tz',
          onDelete: 'CASCADE',
        });
      };
      
    return Employee; 
  };
