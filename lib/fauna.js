import {
  readFn,
  createFn,
  updateFn,
  deleteFn,
  readCollectionsFn,
} from './functions'
import {
  createValidator,
  readValidator,
  updateValidator,
  deleteValidator,
  readCollectionsValidator,
} from './validators'
const faunadb = require('faunadb')
const q = faunadb.query

export default class {
  constructor(secret) {
    this.client = new faunadb.Client({
      secret,
    })
    this.q = q
  }

  create({ collection, data }) {
    createValidator({ collection })
    return createFn.bind(this)({ collection, data })
  }

  read({ collection, id }) {
    readValidator({ collection, id })
    return readFn.bind(this)({ collection, id })
  }

  readCollections({ collections = [] }) {
    readCollectionsValidator({ collections })
    return readCollectionsFn.bind(this)({ collections })
  }

  update({ collection, data, id }) {
    updateValidator({ collection, id })
    return updateFn.bind(this)({ collection, data, id })
  }

  delete({ collection, id }) {
    deleteValidator({ collection, id })
    return deleteFn.bind(this)({ collection, id })
  }
}
