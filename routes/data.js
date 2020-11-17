'use strict'
const express = require('express')
const router = express.Router()
const data = require('../controllers/data')

// some routes

router.get('/palmares', data.getPalmares)
// router.get('/market', data.getMarket)
// router.post('/convert', data.convert)
// router.get('/news', data.getNews)
// export router
module.exports = router
