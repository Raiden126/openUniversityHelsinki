const blogRouter = require('./controllers/blogs');
const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => {
    logger.info('connecting to mongodb')
})
.catch((error) => {
    logger.error('error connecting to mongodb', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app