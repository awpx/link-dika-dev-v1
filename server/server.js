const express = require('express')
require('dotenv').config({ path: './server/config/config.env' })

const app = express()

app.get('/', (req,res) => {
  res.send('hello')
})

//morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server Runnng in ${process.env.NODE_ENV} mode on port ${PORT}`))