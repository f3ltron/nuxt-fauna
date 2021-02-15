# Nuxt Faunadb

Thanks for trying nuxt fauna module! Nuxt fauna is a simple way to use fauna inside your nuxt application.

# Links

- [Preview](https://nuxt-fauna.herokuapp.com/)
- [Example](/example)
- [Fauna](https://fauna.com/)
- [Nuxt Server middleware](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware)
- [Nuxt plugins](https://nuxtjs.org/docs/2.x/directory-structure/plugins)

# Features

- Read documents from a collection
- Update a document from a collection
- Override those functions to create your own

# Getting started

If you just want to see a concrete example check the [example folder](/example)

It's not currently on npm. But you can clone the repo and play with it.

It's as simple as: 
- Add `FAUNA_KEY` to your `.env`
- Add the following to your `nuxt.config.js`

```js
modules: ['nuxt-fauna'],
fauna: {
    secret: process.env.FAUNA_KEY,
}
```
- Run `yarn dev`

And voila!

# Implementation

Before we go into detail about how to use the module. I am assuming you are using faunaDB with nuxtSSR. What does it mean? That means you will be able to hide the faunaDB secret key as you need more than just to read data.

We will use [Nuxt server middleware](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware) to call faundaDB.

After that we will use nuxt plugin to simplify the call to the faundDB.

All fauna configurations should be present in the `fauna` folder at the root of your project.

## Nuxt Server Middleware

To create our endpoints we are defining a list of handlers / functions that you will be able to use. They are basically express handler.

**Optional**:

You can override the default handlers. If you want to override them you will have to create there mirror files inside `fauna/functions` folder.

Here are the list of files you can override:

- get-collections.js
- update-collections.js

Here an example of what it should looks like

```js
module.exports = async (req, res) => {
  res.json({
    message: 'bonjour',
  })
}
```

## Nuxt plugins

We are injecting `$fauna` into your application. 

You will have access to `pullData` and `pushData` everywhere in your application server side or client side.

### pullData

Pull data will need an array of collections where it will get data.

You will receive an object with each of the keys you asked for.

data return object will like.

```js
{
  'key1': {
    data: [datas]
  },
  'key2': {
    data: [datas]
  }
}
```

Example:

```js
export default {
  async asyncData(ctx) {
    const data = await ctx.$fauna.pullData(['storehouses', 'customers'])
    return data
  },
}
```

### pushData

Push data is a method to update a document in your faunaDB from a collection.

```js
export default {
  methods: {
    async update(data) {
        try {
          await this.$fauna.pushData(data)
        } catch (e) {
        // ...
        }
    },
  }
}
```

data should build like this.

```js
{
    collection: 'name of your collection',
    id: 'the ref id you want to update',
    data: {} // the data can be any of your document type. You can just send what 
    // key data you want to update it doesnt has to be the full object. Faunadb is smart enough to update even nested objects
}
```

# Contribute

Ok so now you know how to use it. Do you want to contribute ? Make sure to check the [roadmap](#roadmap) first.

Check [Getting started](#getting-started) to know what you will have to configure.

Create a pull request. We will be really happy to see your contribution.

# Roadmap

We will create a github project so you can easily see what we are working on. But for now there is a list of elements that can improve the module:

- Adding Typescript support.
- Allow the possibility to create custom handlers that are not present in the list.
- Ability to call multiple faunaDB.
- Create a wrapper for netlify so you will be able to use it in SSG (static site generation) applications.
- FaunaDB gives you the ability to send your schema type so during the application build it would be able to call import endpoint to update the schema already in place