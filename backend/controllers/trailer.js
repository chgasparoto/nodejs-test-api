const { viaplay, tmdb } = require('../utils/api')
const extractData = require('../utils/viaplay')

require('dotenv').config()

exports.getTrailers = async(req, res, next) => {
  const { id } = req.params

  try {
    const response = await viaplay.get(`film/${id}`)
    const imdb = extractData(response.data, ['content', 'imdb'], false)

    const tmdbData = await tmdb.get(`find/${imdb.id}`, {
      params: {
        external_source: 'imdb_id'
      }
    })

    const movieId = tmdbData.data.movie_results[0].id
    const trailers = await tmdb.get(`movie/${movieId}/videos`)

    return res.send({
      status: 200,
      data: trailers.data
    })
  } catch (error) {
    console.log(error.message);
    res.status(500)
    return res.send('Something went wrong. Please contact the administrator.')
  }
}
