const express = require('express')
const router = express.Router()
const db = require('../models');
const { where } = require('sequelize');
const multer = require("multer");
const path = require("path");
const { QueryTypes } = require('sequelize');



//for pix
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "public/images"); // Store images in the public/images directory
  },
  filename: function (request, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API'
  })
})

const getEmployees = async () => {
  const res = db.employee.findAll({
    include: [
      {
        model: db.coronainfo
      }
    ]
  })

  return res 
}

// get all employees
router.get('/employees', async (request, response) => {
  response.json({
    info: await getEmployees()
  })
})


//add an employee
router.post('/employees', async (request, response) => {
  const body = request.body

  const first_name = body.first_name
  const last_name = body.last_name
  const tz = body.tz
  const address = body.address
  const dob = body.dob
  const landline = body.landline
  const mobile_phone = body.mobile_phone
 

  try {
    const employee = await db.employee.create({
      first_name: first_name,
      last_name: last_name,
      tz: tz,
      address: address,
      dob: dob,
      landline: landline,
      mobile_phone: mobile_phone,
     
    })
    response.json({
      info: 'Employee with tz:',
      tz: tz,
      info: 'created and succesfully added to database '
    })

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const errors = error.errors.map((e) => ({
        field: e.path,
        message: e.message
      }))
      response.status(400).json({ errors })
    } else {
      console.error(error)
      response.status(500).json({ info: error.message })
    }
  }
})


//adds coronainfo 
router.post('/coronainfos', async (request, response) => {
  const body = request.body
  const tz = body.tz
  const vaccination_date = body.vaccination_date
  const vaccination_manufacturer = body.vaccination_manufacturer
  const exposure_date = body.exposure_date
  const recovery_date = body.recovery_date
  const corona_rows = await db.coronainfo.findAll({
    where: {
      tz: tz,
      vaccination_date: {
        [db.Sequelize.Op.not]: null
      }
    }
  })
  const employee_row = await db.employee.findAll({
    where: {
      tz: tz
    }
  }
  )

  try {
    // create the new row in the "covid" tnable

    //ensures not adding blank row
    if (exposure_date == null && vaccination_date == null)
      throw ("must input corona data")
    
      //enusres if exposure date input must have recovery date input
    if (exposure_date && recovery_date == null)
      throw ("if patient was sick he must have a recovery date")
    
      //enusres if recovery date input  must have exposure date input
    if (exposure_date == null && recovery_date)
      throw ("if has recovery date must have exposure date")

      //ensures if vaccinated , has vaccination manufacturer
    if (vaccination_date && vaccination_manufacturer == null)
      throw ("if had vaccine  must have vaccine manufacture")

       //ensures if has vaccination manufacturer, must be vaccinated 
    if (vaccination_date == null && vaccination_manufacturer)
      throw ("if have vaccination manufacturer must be vaccinated")

      //ensures that employee with tz inout exists
    if (employee_row.length == 0)
      throw ("no employee with this tz exist")

      //ensures that if inputing exposure date, a different exposure date doesnt exist
    if (exposure_date) {
      const coronaInfos = await db.coronainfo.findAll({
        where: {
          tz: tz,
          exposure_date: {
            [db.Sequelize.Op.not]: null
          }
        }
      });
      if (coronaInfos.length > 0)
        throw ("patient was already sick with corona")

    }

    //enusres no more than 4 vaccines input
    if (corona_rows.length == 4 && (vaccination_date != null))
      throw ("already has 4 vaccines")

    const covid = await db.coronainfo.create({

      tz: tz,
      vaccination_date: vaccination_date,
      vaccination_manufacturer: vaccination_manufacturer,
      exposure_date: exposure_date,
      recovery_date: recovery_date,
    });
    console.log(request.body);
    response.status(201).json(covid);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const errors = error.errors.map((e) => ({
        field: e.path,
        message: e.message
      }))
      response.status(400).json({ errors })
    } else {
      console.error(error)
      response.status(500).json({ info: error })
    }
  }
});

const getCovid = async () => {
  return await db.coronainfo.findAll({
    
  })
}

// get all corona info
router.get('/coronainfos', async (request, response) => {
  response.json({
    info: await getCovid()
  })
})

//gets corona info for specific patient with tz
router.get('/coronainfos/:tz', async (request, response, next) => {
  try {
    const coronainfo = await db.coronainfo.findAll({
      where: {
        tz: request.params.tz
      }
    });

    if (coronainfo.length == 0) {
      response.status(500).json({ message: 'Corona info for employye with following tz not found:' });
    }

    response.json(coronainfo);
  } catch (err) {
    next(err);
  }
});

 //gets info for specific employee with tz
 router.get('/employees/:tz', async (request, response, next) => {
  try {
    const employeeinfo = await db.employee.findAll({
      where: {
        tz: request.params.tz
        
      }
    });

    if (employeeInfo.length == 0) {
      response.status(500).json({ message: 'employee with following tz not found' });
    }

    response.json(employeeinfo);
  } catch (err) {
    next(err);
  }
 });


module.exports = router
