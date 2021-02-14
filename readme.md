# Nuxt Faunadb

Thanks for trying nuxt fauna module! Nuxt fauna is a simple way to use fauna inside your nuxt application.

# Links

- [Preview](https://nuxt-fauna.herokuapp.com/)
- [Example](/example)
- [Fauna](https://fauna.com/)
- [Nuxt Server middleware](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware)

# Features

- Read documents from a collection
- Update a document from a collection
- Override those functions to create your own

# Getting started

It's not currently on npm. But you can clone the repo and play with it.

It's as simple as. Add `FAUNA_KEY` to your `.env`

Adding to your `nuxt.config.js`

```js
modules: ['nuxt-fauna'],
fauna: {
    secret: process.env.FAUNA_KEY,
}
```

As simple as `yarn dev`. And voila!

# Implementation

Before we go in detail how to use the module. I am assuming you are using faunaDB with nuxtSSR. What does it mean? That mean you will be able to hide properly faunaDB secret key as you need more than just read datas.

We will use [Nuxt server middleware](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware) to expose methods to your frontend.

# Usage

# Contribute

# Roadmap