export default {
    head: {
      title: 'app_perfeed',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'My Nuxt.js project' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    
    srcDir: 'src/',
  
    buildModules: ['@nuxt/typescript-build'],
  
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/auth-next'
    ],
  
    axios: {
      baseURL: 'http://localhost:3000', 
    },
  
    auth: {
      strategies: {
        local: {
          token: {
            property: 'token',
            type: 'Bearer',
            maxAge: 1800
          },
          user: {
            property: 'user',
            autoFetch: true
          },
          endpoints: {
            login: { url: '/api/auth/login', method: 'post' },
            logout: { url: '/api/auth/logout', method: 'post' },
            user: { url: '/api/auth/user', method: 'get' }
          }
        }
      }
    },
  
    build: {
      extend(config, ctx) {
        //  configurações do Webpack
      }
    }
  }
  