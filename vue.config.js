// vue.config.js
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                vue$: "vue/dist/vue.js",
            }
        },
    },
    chainWebpack: config => {
        config.module
        .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 75
            })
      },
  }