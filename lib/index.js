import path from 'path'
import defu from 'defu'

const shouldHaveDefault = (options) => {
  const hasDefault = Object.keys(options).find((e) => e === 'default')
  if (!hasDefault)
    throw new Error('[FAUNA CONFIG] you should have at least a default config')
}

const validateOneOption = (key, options) => {
  if (typeof options.secret === 'undefined')
    throw new Error(`[FAUNA CONFIG] ${key} should have secret property`)
}

export default function (moduleOptions) {
  const options = defu(moduleOptions, this.options.fauna)

  shouldHaveDefault(options)
  Object.keys(options).forEach((opt) => {
    validateOneOption(opt, options[opt])
  })

  // add plugin to simplify calling fauna
  this.addPlugin({
    filename: 'plugin',
    src: path.resolve(__dirname, 'plugin.js'),
    options: JSON.stringify(options),
  })

  this.addTemplate({
    filename: 'fauna',
    src: path.resolve(__dirname, 'fauna.js'),
  })

  this.addTemplate({
    filename: 'functions',
    src: path.resolve(__dirname, 'functions.js'),
  })

  this.addTemplate({
    filename: 'validators',
    src: path.resolve(__dirname, 'validators.js'),
  })
}
