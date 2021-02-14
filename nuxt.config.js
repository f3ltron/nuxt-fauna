import faunaModule from './lib'

export default {
  target: 'server',
  rootDir: 'example',
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', { handler: faunaModule }],
  fauna: {
    secret: process.env.FAUNA_KEY,
  },
}
