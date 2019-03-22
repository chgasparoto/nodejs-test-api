const express = require('express')

const cache = require('../utils/cache')
const controller = require('../controllers/trailer')

const router = express.Router()
const ttl = 3600 // 1h

router.get('/trailers/:id', cache(ttl), controller.getTrailers)

module.exports = router
