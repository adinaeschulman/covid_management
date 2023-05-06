const express = require('express')
const router = express.Router()
const db = require('../models');

router.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})

const getEmployees = async ()=>{
    return await db.Employee.findAll({
        attributes: ['last_name'], 
    })
}

// get all employees
router.get('/employees', async (request, response) => {
    response.json({
        info: await getEmployees()
    })
})


// // add employee
// router.post('/employee', async (request, response) => {
//     const body = request.body

//     response.json({
//         info: await getEmployees()
//     })
// })


// // get vaccinations
// router.get('/vaccinations', async (request, response) => {
//     response.json({
//         info: await getEmployees()
//     })
// })

module.exports = router
