const express = require('express')

const controller = require('../controllers/movie')
const cache = require('../utils/cache')
const { viaplay } = require('../utils/api')

const router = express.Router()
const ttl = 3600 // 1h

router.get('/movies/:type?', cache(ttl), controller.getMovies)

module.exports = router
