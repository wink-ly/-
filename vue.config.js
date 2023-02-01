const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: 'https://www.lingnotes.fun',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    name:'名字正在想'
  }
})


