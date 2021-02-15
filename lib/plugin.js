const axios = require('axios')

class Fauna {
    constructor() {
        this.axios = axios.create({baseURL: process.env.BASE_URL})
    }

    async pullData(collections = []) {
        try {
            const {data} =  await this.axios.post('/fauna/get-collections', {
                collections
            })
            return data
        } catch(e) {
            console.log(e)
        }
    }

    async pushData(infos) {
        try {
            const {data} = await this.axios.post('/fauna/update-collections', infos)
            return data
        } catch(e) {
            console.log(e)
        }
    }
}

export default (_, inject) => {

    const options = <%= options %> 

    inject('fauna', new Fauna())
}