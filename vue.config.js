const CopyWebpackPlugin = require('copy-webpack-plugin')

const isPro = process.env.NODE_ENV
const plugins = []

if (isPro) {
  plugins.push(
    new CopyWebpackPlugin([{
      from: './README.md',
      to: './'
    }])
  )
}

module.exports = {
  configureWebpack: {
    plugins
  }
}
