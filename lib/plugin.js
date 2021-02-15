import Fauna from './fauna'
const faunadb = require('faunadb')
const q = faunadb.query

class FaunaInstance {
    constructor(options) {
        this.options = options
        this.instance = {}
        this.q = q
    }

    addClient(name, secret) {
        this.instance[name] = new Fauna(secret)
    }

    client(name =  'default') {
        if (!this.instance[name]) throw new Error(`fauna instance ${name} not found`)
        return this.instance[name]
    }
}

export default (_, inject) => {

    const options = <%= options %>

    const faunaInstance = new FaunaInstance(options)

    Object.keys(options).forEach(name => {
        faunaInstance.addClient(name, options[name].secret)
    })

    inject('fauna', faunaInstance)
}