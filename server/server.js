const express = require('express')
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//db
connectDB()

//routes
app.use('/', require('./routes/index'))
app.use('/url/api/v1/shorten', require('./routes/url'))

//static
//production build
if(process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, '../client', 'build')
  console.log(root)

  app.use(express.static(root))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')))
  console.log(path.resolve())
} else {
  app.get('/', (req, res) => {
    res.send('api services running')
  })
}

//morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server Runnng in ${process.env.NODE_ENV} mode on port ${PORT} ...`))