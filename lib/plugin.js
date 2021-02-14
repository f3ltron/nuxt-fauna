const faunadb = require('faunadb')
const q = faunadb.query
const axios = require('axios')

class FaunaDb {
    constructor(dbConfig) {
        this.validate(dbConfig)
        this.client = new faunadb.Client({
            secret: dbConfig.secret
        })
        this.q = q
    }

    validate(dbConfig) {
        // if (typeof dbConfig.secret === 'undefined') 
            // throw new Error('your database config should have at least a secret property')
    }

    buildCollection(collection) {
        return q.Map(
            q.Paginate(q.Documents(q.Collection(collection))),
            q.Lambda(x => q.Get(x))
        )
    }

    async pullData(collections = []) {
        try {
            const res =  await axios.get('http://localhost:3000/api')
            console.log(res)
        } catch(e) {
            console.log(e)
        }
        // if (!Array.isArray(collections)) throw new Error('collections should be an array of collection name')
        // if (!process.server) throw new Error('should be executed in server context to hide secret key')
        // try {
        //     const data = await this.client.query(
        //         collections.map(c => this.buildCollection(c))
        //     )

        //     const final = {}
        //     collections.forEach((c, index) => {
        //         final[c] = data[index] 
        //     })
        //     console.log(final)
        //     return final
        // } catch(e) {
        //     console.log(e)
        // }
    }

    pushData(data) {

    }
}

class Fauna {
    constructor(options) {
        this.instances = []
     
        Object.keys(options).map(k => {
            this.instances[k] = new FaunaDb(options[k])
        })
    }

    client(name) {
        if (!this.instances[name]) throw new Error('client not found')
        return this.instances[name]
    }
}

export default (_, inject) => {

    const options = <%= options %>;

    inject('fauna', new Fauna(options))
}