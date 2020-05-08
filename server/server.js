const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
require('dotenv').config({ path: './server/config/config.env' })

const app = express()

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//db
connectDB()

//routes
app.use('/', require('./routes/index'))
app.use('/url/api/v1/shorten', require('./routes/url'))

//morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server Runnng in ${process.env.NODE_ENV} mode on port ${PORT} ...`))