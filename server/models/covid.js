// //const { Employee } = require(".");
// const { Sequelize } = require('sequelize');
// const moment = require('moment');



// module.exports = (sequelize, Sequelize) => {
//     const Covid = sequelize.define("covids", {  
//       tz: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true, 
        
       
//       },
//     //works bh allowes more than 4
//   vaccination_date: {
//     type: Sequelize.ARRAY(Sequelize.DATEONLY),
//     allowNull: true,
//     defaultValue: [],
//     get() {
//       return this.getDataValue('vaccination_dates') || [];
//     },
//     set(value) {
//       if (Array.isArray(value)) {
//         // Check if all dates in array are valid
//         const invalidDates = value.filter(date => !moment(date, 'YYYY-MM-DD', true).isValid());
//         if (invalidDates.length > 0) {
//           throw new Error(`Invalid dates: ${invalidDates.join(', ')}`);
//         }
//         this.setDataValue('vaccination_dates',value);
//       } else {
//         this.setDataValue('vaccination_dates', []);
        
      
     
//     }
    
//     },
   
//   },
//   //works bh
//   vaccination_manufacturer: {
//     type: Sequelize.ARRAY(Sequelize.STRING),
//     allowNull: true,
    
//     defaultValue: [],
//     get() {
//       return this.getDataValue('vaccination_manufacturers') || [];
//     },
    
//     set(value) {
      
//       if (Array.isArray(value)) {
        
//         this.setDataValue('vaccination_manufacturers', value);
//       } else {
//         this.setDataValue('vaccination_manufacturers', []);
        
      
     
//     }
    
//     },
   
    
//   },
  
//   gettingsickdate: {
//     type: Sequelize.DATEONLY,
//     allowNull: true,
//     validate: {
//       isDate: true,
//     }
//   },
//   healdate: {
//     type: Sequelize.DATEONLY,
//     allowNull: true,
//     validate: {
//       isDate: true,
//     },
//     validate: {
//       isAfterGettingsickdate: function (value) {
//         if (value && this.gettingsickdate) {
//           if (value < this.gettingsickdate) {
//             throw new Error("Heal date must be after getting sick date");
//           }
//           const weeksDiff = moment(value).diff(
//             moment(this.gettingsickdate),
//             "weeks"
//           );
//           if (weeksDiff < 2 ) {
//             throw new Error(
//               "Heal date must be at lwast 2 weeks after getting sick date"
//             );
//           }
//         }
//       },
//     },
//   }
  


//     });
  
    
//     return Covid;
//   };