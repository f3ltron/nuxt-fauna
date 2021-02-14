import faunaModule from './lib'

export default {
  target: 'server',
  rootDir: 'example',
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', { handler: faunaModule }],
  fauna: {
    secret: process.env.FAUNA_KEY,
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
}
