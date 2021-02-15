# Nuxt Faunadb

Thanks for trying nuxt fauna module! `nuxt-fauna` is a simple way to use fauna inside your nuxt application. It's important to notice that it use [fauna FQL](https://docs.fauna.com/fauna/current/api/fql/) behind the scene the native langage for fauna.

# Links

- [Preview](https://nuxt-fauna.herokuapp.com/)
- [Example](/example)
- [Fauna](https://fauna.com/)
- [Nuxt plugins](https://nuxtjs.org/docs/2.x/directory-structure/plugins)
- [Fauna FQL](https://docs.fauna.com/fauna/current/api/fql/)

# Features

- CRUD (create, read, update, delete) operations into collection

# Getting started

If you just want to see a concrete example check the [example folder](/example)

It's not currently on npm. But you can clone the repo and play with it.

It's as simple as: 
- Add `FAUNA_KEY` to your `.env`
- Add the following to your `nuxt.config.js`

```js
modules: ['nuxt-fauna'],
fauna: {
  default: {
    secret: process.env.FAUNA_KEY,
  }
  // you can add more fauna client
  /**
   * other: {
   *  secret: secretKey
   * }
   * /
}
```
- Run `yarn dev`

And voila!

**IMPORTANT**: 

It will be a direct connexion to your faunadb so make sure to create a secret key that has only read/write on your collections and not as admin.

Go to your faunadb account > Security > Roles > New Role

![Capture](https://user-images.githubusercontent.com/11556276/108035702-403fc300-7005-11eb-9267-5a9771478f24.PNG)

After that create a new key with this role.

![Capture2](https://user-images.githubusercontent.com/11556276/108035899-87c64f00-7005-11eb-8d38-e8b4402d2b92.PNG)

# Usage

We are injecting `$fauna` into your application. You need to have define at least a default faunaDB configuration in your `nuxt.config.js`

```js
fauna: {
  default: {
    secret: process.env.FAUNA_KEY,
  },
  other: {
      secret: process.env.FAUNA_KEY_OTHER,
  },
}
```

To access to a faunaDB instance you can access it like:

```js
export default {
  async asyncData(ctx) {
    await ctx.$fauna.client().read()
  },
  methods: {
    async update() {
      await this.$fauna.client('other').update()
    }
  }
}
```

As you see here If you are using `client()` without parameter, it will use the default configuration.

For each instances you will have access to
- [read](#Read)
- [readCollections](#ReadCollections)
- [create](#Create)
- [update](#Update)
- [delete](#Delete)

# Read

You will read a specific id.

```js
this.$fauna.client().read({collection: 'collectionName', id: 'refId'})
```

# ReadCollections

You will be able to call multiple collections.

```js
this.$fauna.client().readCollections({ collections: [
  'collectionName1',
  'collectionName2'
]})
```

The return object will looks like:

```js
{
  collectionName1: {
    data: []
  }
  collectionName2: {
    data: []
  }
}
```

# Create

Make sure to respect this format when calling create.

```js
this.$fauna.client().create({
  collection: 'todos',
  data: {
    name: this.name,
    description: this.description,
    done: false,
  },
})
```

The document created will be return.

# Update

FQL langage is using partial update so you just need to pass property who had changed.

```js
this.$fauna.client().update({
  collection: 'todos',
  id,
  data: {
    done,
  },
})
```

# Delete

You can delete by passing the collection and the id.

```js
this.$fauna
  .client()
  .delete({ collection: 'todos', id })
```

# Contribute

Ok so now you know how to use it. Do you want to contribute ? Make sure to check the [roadmap](#roadmap) first.

Check [Getting started](#getting-started) and [Development](#Development)  to know what you will have to configure.

Create a pull request. We will be really happy to see your contribution.

# Development

After you clone the project check lib folder.

## index.js

Here will be the module instanciation. It will validate your module configuration and add plugin.

## plugin.js

Plugin will inject `$fauna` into your application

## fauna.js

In this file you will find the current fauna client and how CRUD is implemented.

## functions.js

Here you will find every functions that are dispatch into your clients.

## validators.js

In this file you will find every validator that will be executed for each functions.

# Roadmap

- Adding Typescript support.
- Allow the possibility to create custom validators.
- Override / Complete the default functions
- FaunaDB gives you the ability to send your schema type so during the application build it would be able to call import endpoint to update the schema already in place
- Implement graphql interface even if fauna matainer prefer to use the native FQL langage