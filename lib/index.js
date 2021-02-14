import path from 'path'
import defu from 'defu'
const handler = require('./handler')

export default function (moduleOptions) {
  const options = defu(moduleOptions, this.options.fauna)

  // adding serverMiddleware endpoint to hide key
  this.addServerMiddleware(handler(options, this.options))

  // add plugin to simplify calling fauna
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: JSON.stringify(options),
  })
}
