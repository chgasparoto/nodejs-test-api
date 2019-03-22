const { get } = require('lodash')

module.exports = (response, additionalPath = [], isListItems = true) => {
  // Check when it must return an object list or a single object.
  const productKey = `viaplay:product${isListItems ? 's' : ''}`

  // Path to extract data from viaplay response:
  // _embedded[“viaplay:blocks”][0]._embedded[“viaplay:product”]
  const path = ['_embedded', 'viaplay:blocks', '0', '_embedded', productKey]

  // Return false if doesn't find.
  return get(response, path.concat(additionalPath), false)
}
