const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messages')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messagesRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB succesfully connected')
    })
    .catch((err) => {
        console.log(err.message)
    })

const server = app.listen(process.env.PORT, () => {
    console.log(`Listenting to port number ${process.env.PORT}`)
})