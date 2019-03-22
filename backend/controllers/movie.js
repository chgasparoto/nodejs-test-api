const { viaplay } = require('../utils/api')
const extractData = require('../utils/viaplay')

exports.getMovies = async (req, res, next) => {
  const { type } = req.params

  try {
    const response = await viaplay.get(`film${type ? '/' + type : ''}`)
    const data = extractData(response.data)

    return res.json({
      status: 200,
      data: data.filter(movie => movie.content.imdb).map(movie => ({
        id: movie.content.imdb.id,
        title: movie.content.title,
        slug: movie.publicPath,
        boxArt: movie.content.images.boxart.url,
        synopsis: movie.content.synopsis,
        duration: movie.content.duration.readable,
        actors: movie.content.people.actors,
        directors: movie.content.people.directors,
        year: movie.content.production.year,
        genres: movie._links['viaplay:genres'].map(genre => genre.title)
      }))
    })

  } catch (error) {
    console.log(error.message)
    res.status(500)
    return res.json('Something went wrong. Please contact the administrator.')
  }
}
