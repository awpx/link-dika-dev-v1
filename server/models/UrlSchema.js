const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
  urlShortCode: String,
  realUrl: String,
  shortUrl: String,
  createdAt: {
    type: Date, 
    expires: 604800,
    default: Date.now,
  }
})

module.exports = mongoose.model('Url', UrlSchema)