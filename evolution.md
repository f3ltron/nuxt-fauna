developer experience:

- clarity
    Documentation is progressive. You can start fast, check the example folder or read more about the documentation
- consistency
    Parameters pass to functions has the same data structure.
- simplicity
    the plugin make it super easy to use with this high level of abstraction.
- modularity
    in the nuxtServerMiddleware version you can override default functions
- easy development setup
    one secret propety to define
    logs that help you during all the process
- evolution
    check roadmap
- contributing
    explain how to contribute and where to start with setup and roadmap

History:

Question: What is Fauna
Discussion: Discussion on slack channel and read documentation and articles
Solution: Fauna support graphql, FQL langage. Learn enough to be able to use CRUD. Not choosing Graphql to not spend so much time but create
enought abstraction to implement it later.

Question: Possibility to create multiple instance of faune db
Discussion: Added at the begining a "instance like" so you can call multiple faunaDb client
Solution: Create a wrapper class that expose client and addClient based on the nuxt.config.js

Question: Want to support netlify functions
Discussion: Make it enough modular to wrap for netlify function and SSG context.
Solution: Easy to create a wrapper around so you can expose for netlify functions

Question: Question about CRUD and the security key
Discussion: Discussion in faun slack channel with community about it.
Solution: Come back to only plugin without server middleware. And add multiple instance possibility for fauna db
