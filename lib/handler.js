const path = require('path')
const fs = require('fs-extra')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// we will check this list for overriding
const defaultFunctions = ['get-collections.js', 'update-collections.js']

module.exports = function (options, rootOptions) {
  const cwd = path.join(
    rootOptions.rootDir || process.cwd(),
    'fauna',
    'functions'
  )
  const libCwd = path.join(__dirname, 'functions')

  defaultFunctions.forEach((fn) => {
    let filePath = path.join(cwd, fn)

    // if there is an override exist
    if (!fs.pathExistsSync(filePath)) {
      filePath = path.join(libCwd, fn)
    } else {
      console.log(`[FAUNA] override ${fn}`)
    }

    // create the endpoint with the handler
    app.post(`/fauna/${fn.replace('.js', '')}`, require(filePath).handler)
  })

  return {
    handler: app,
  }
}
