const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log('server is running at port',PORT)
})