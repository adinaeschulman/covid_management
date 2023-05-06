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
        where: {
            id: 4
        }
    })
}

// get all employees
router.get('/employees', async (request, response) => {
    response.json({
        info: await getEmployees()
    })
})


// add employee
router.post('/employees', async (request, response) => {
    const body = request.body

    const first_name = body.first_name
    const last_name = body.last_name

    console.log('hello', body)
    db.Employee.create({
        first_name: first_name, 
        last_name: last_name
    })
    
    response.json({
        info: 'hello there'})
})


// // get vaccinations
// router.get('/vaccinations', async (request, response) => {
//     response.json({
//         info: await getEmployees()
//     })
// })

module.exports = router
