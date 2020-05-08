const router = require('express').Router()
const shortId = require('shortid')
const validUrl = require('valid-url')

const Url = require('../models/UrlSchema')

//@route    POST url/api/v1/shorten
//desc      Create short URL

router.post('/', async (req, res) => {
  const { realUrl } = req.body
  const baseUrl = process.env.BASE_URL

  //check base url
  if(!validUrl.isUri(baseUrl)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid base url'
    })
  }

  //create urlShortCode
  const urlShortCode = shortId.generate()

  //check realUrl
  if(validUrl.isUri(realUrl)) {
    try {
      //check availability in database 
      let url = await Url.findOne({ realUrl })

      if(url) {
        res.status(200).json({
          success: true,
          url
        })
      } 
      //if false, create and save to db
      else {
        const shortUrl = `${baseUrl}/${urlShortCode}`

        url = new Url({
          realUrl,
          urlShortCode,
          shortUrl
        })

        await url.save()

        res.status(201).json({
          success: true,
          url
        })
      }

    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }

  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid Url'
    })
  }

})

module.exports = router