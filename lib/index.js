import defu from 'defu'
const handler = require('./handler')

export default function (moduleOptions) {
  const options = defu(moduleOptions, this.options.fauna)
  // create a wrapper to be abdle to call it with netlify
  this.addServerMiddleware(handler(options, this.options))

  // this.addPlugin({
  //     src: path.resolve(__dirname, 'plugin.js'),
  //     options: JSON.stringify(options),
  //     mode: 'server'
  // })
}
