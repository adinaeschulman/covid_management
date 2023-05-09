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
  //const { Op } = require("sequelize");


  // const result1 = await db.Corona_info.findAll({ 
  //   attributes: [
  //     "tz",
  //     [Sequelize.fn("string_agg", Sequelize.col("vaccination_date")), "vaccination_dates"],
  //     [Sequelize.fn("string_agg", Sequelize.col("vaccination_manufacturer")), "vaccination_manufacturers"],
  //     [Sequelize.fn("string_agg", Sequelize.col("exposure_date")), "exposure_dates"],
  //     [Sequelize.fn("string_agg", Sequelize.col("recovery_date")), "recovery_dates"]
  //   ],
  //   group: "tz",
  //   raw: true
  // });
  // console.log(result);


  //     const result = await db.sequelize.query(`
  //     SELECT e.*, c.*
  //     FROM employees e 
  //     JOIN result1 c ON e.tz = c.tz
  // `, { type: QueryTypes.SELECT });
  //    return result 

  const result = await db.sequelize.query(`
    SELECT e.*, c.*
    FROM employees e 
    JOIN (
      SELECT tz,
             public.string_agg(vaccination_date, ', ') AS vaccination_dates,
             public.string_agg(vaccination_manufacturer, ', ') AS vaccination_manufacturers,
             public.string_agg(exposure_date , ', ') AS exposure_dates,
             public.string_agg(recovery_date, ', ') AS recovery_dates
      FROM coronainfos
      GROUP BY tz
    ) c ON e.tz = c.tz
`, { type: QueryTypes.SELECT });

  return result;
}

// get all employees
router.get('/employees', async (request, response) => {
  response.json({
    info: await getEmployees()
  })
})








router.post('/employees', async (request, response) => {
  const body = request.body

  const first_name = body.first_name
  const last_name = body.last_name
  const tz = body.tz
  const address = body.address
  const dob = body.dob
  const landline = body.landline
  const mobile_phone = body.mobile_phone
  //const image_path = request.file ? '/images/' + request.file.filename : null;
  // const image_path = body.image_path

  try {
    const employee = await db.employee.create({
      first_name: first_name,
      last_name: last_name,
      tz: tz,
      address: address,
      dob: dob,
      landline: landline,
      mobile_phone: mobile_phone,
      // image_path: image_path
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



router.post('/coronainfos', async (request, response) => {
  const body = request.body
  const tz = body.tz
  const vaccination_date = body.vaccination_date
  const vaccination_manufacturer = body.vaccination_manufacturer
  const exposure_date = body.exposure_date
  const recovery_date = body.recovery_date
  //const temp =  db.Employee.findByPk(tz)
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
    if (exposure_date == null && vaccination_date == null)
      throw ("must input corona data")
    if (exposure_date && recovery_date == null)
      throw ("if sick must heal")
    if (exposure_date == null && recovery_date)
      throw ("if has recovery date must have exposure date")
    if (vaccination_date && vaccination_manufacturer == null)
      throw ("if had vaccine  must have vaccine manufacture")
    if (vaccination_date == null && vaccination_manufacturer)
      throw ("if have vaccination manufacturer must be vaccinated")

    if (employee_row.length == 0)
      throw ("no employee with this tz exist")

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
        throw ("already was sick with corona")

    }
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

// get all employees
router.get('/coronainfos', async (request, response) => {
  response.json({
    info: await getCovid()
  })
})

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


router.get('/employees/:tz', async (request, response, next) => {
  try {
    const employeeInfo = await db.Employee.findAll({
      where: {
        tz: request.params.tz
      }
    });

    if (employeeInfo.length == 0) {
      response.status(500).json({ message: 'employee with following tz not found' });
    }

    response.json(employeeInfo);
  } catch (err) {
    next(err);
  }
});


module.exports = router
