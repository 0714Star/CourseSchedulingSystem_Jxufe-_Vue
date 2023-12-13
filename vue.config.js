const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    https:false,
    port: 714,
    // proxy: {
    //   target:"localhost:8080",
    // }
  }
})
