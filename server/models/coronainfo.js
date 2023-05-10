const { Sequelize } = require('sequelize');
const moment = require('moment');
const db = require('../models');


module.exports = (sequelize, Sequelize) => {
    const Corona_info = sequelize.define("coronainfo", {  
    tz: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    
    vaccination_date: {
    type:Sequelize.DATEONLY,
    allowNull: true,
     },

    vaccination_manufacturer: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isIn: {
        args: [['Pfizer', 'Moderna', 'Johnson & Johnson', 'Sinovac", "AstraZeneca',
        'pfizer', 'moderna', 'johnson & johnson', 'sinovac', 'astrazeneca']],
        msg: "Invalid manufacturer"
      }
    }
    },
  
    exposure_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
   
    },
    recovery_date: {
    type: Sequelize.DATEONLY,
     allowNull: true,
     validate: {
      isAfterGettingsickdate: function (value) {
        if (value && this.exposure_date) {
          if (value < this.exposure_date) {
            throw new Error("Heal date must be after getting sick date");
          }
          const weeksDiff = moment(value).diff(
            moment(this.exposure_date),
            "weeks"
          );
          if (weeksDiff < 2 ) {
            throw new Error(
              "Heal date must be at least 2 weeks after getting sick date"
            );
          }
        }
      },
    },
  },
  
     

    });
  
     Corona_info.associate = (models) => {
      Corona_info.belongsTo(models.employee, {
        foreignKey: 'tz',
        onDelete: 'CASCADE',
      });
    };
    
     
    return Corona_info;
  };