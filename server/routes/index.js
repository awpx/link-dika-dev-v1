const router = require('express').Router()

const Url = require('../models/UrlSchema')

//@route    GET /:urlShortCode
//desc      redirect to realUrl

router.get('/:urlShortCode', async (req, res) => {
  try {
    //find urlShort code in db
    const url = await Url.findOne({ urlShortCode: req.params.urlShortCode })

    if(url) {
      return res.redirect(url.realUrl)
    } else {
      res.status(404).json({
        succes: false,
        message: 'Url not found'
      })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({
      succes: false,
      message: 'Server error'
    })
  }
})

module.exports = router