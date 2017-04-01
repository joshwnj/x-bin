module.exports = {
  entry: 'src/web/index.js',
  output: {
    dir: 'dist',
    vendor: 'vendor.js'
  },
  packs: [
    require('monobrow-react-pack')
  ]
}
