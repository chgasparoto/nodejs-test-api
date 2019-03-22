const axios = require('axios')
require('dotenv').config()

exports.viaplay = axios.create({
  baseURL: process.env.VIAPLAY_API_URL,
  timeout: process.env.API_TIMEOUT,
})

exports.tmdb = axios.create({
  baseURL: process.env.TMDB_API_URL,
  timeout: process.env.API_TIMEOUT,
  params: {
    language: process.env.LANGUAGE,
    api_key: process.env.TMDB_API_KEY
  }
})
