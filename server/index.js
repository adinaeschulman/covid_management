const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/', routes) // Mount the router at the root level

// start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
