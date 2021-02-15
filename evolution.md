developer experience:

- clarity
    documentation is progressive
- simplicity
    the plugin make it super easy to use with this high level of abstraction.
- modularity
    you can override default functions with simplicity
- easy development setup
    one secret propety to define
    logs that help you during all the process
- evolution
    adding typescript support
    Let the possibility to create custom handler that are not present in the list.
    be able to call multiple faunaDB
    Create wrapper for netlify so you will be able to use it in SSG (static site generation) application.
    faunaDB let you the possibility to send him your schema type so when application building it would be able to call import endpoint to update shema alreay in place
- contributing
    explain how to contribute and where to start with setup and roadmap


History:

- Starting by implementing all logic in front but fauna depend on your needs to have your key hidden. (write rights)
=> decided to make it oriented with server side rendering only

- Added at the begining a "instance like" so you can call multiple faunaDb client.
Was like nuxt image defining like provider.
=> move to one faunda db to start.

- made it enough modular to wrap for netlify function and SSG context.
=> creating fauna/functions. Easy to create a wrapper around so you can expose a netlify example

