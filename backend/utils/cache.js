const mcache = require('memory-cache')

module.exports = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`
    const cachedBody = mcache.get(key)

    if (cachedBody) {
      res.send(cachedBody)
      return
    }

    // Do not cache error messages.
    if (res.statusCode === 500) {
      next()
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
    }

    next()
  }
}
