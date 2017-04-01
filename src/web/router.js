module.exports = {
  cb: () => {},

  updateLocation: function (url) {
    if (typeof url !== 'string' || !url) {
      url = location.hash.replace(/^#/, '') || ''
    }

    this.cb(url)
  },

  start: function (cb) {
    this.cb = cb
    window.onhashchange = this.updateLocation.bind(this)
    this.updateLocation()
  }
}
