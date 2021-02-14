const path = require('path')
const fs = require('fs-extra')
const express = require('express')
const app = express()

const defaultFunctions = ['get-collections.js']

module.exports = function (options, rootOptions) {
  const cwd = path.join(
    rootOptions.rootDir || process.cwd(),
    'fauna',
    'functions'
  )
  const libCwd = path.join(__dirname, 'functions')

  defaultFunctions.forEach((fn) => {
    let filePath = path.join(cwd, fn)
    if (!fs.pathExistsSync(filePath)) {
      filePath = path.join(libCwd, fn)
    } else {
      console.log(`[FAUNA] override ${fn}`)
    }
    app.post(`/fauna/${fn.replace('.js', '')}`, async (req, res) => {
      const handler = require(filePath).handler
      const ret = await handler()
      res.status(ret.statusCode).json(ret.body)
    })
  })

  return {
    handler: app,
  }
}
