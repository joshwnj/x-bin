const React = require('react')
const Component = require('./component')
const router = require('../router')

module.exports = React.createClass({
  displayName: 'AppState',

  getInitialState: function () {
    return {}
  },

  componentWillMount: function () {
    this.load()

    // whenever the browser url changes, we update the state
    router.start(url => this.setState({ url }))
  },

  load: function () {
    // Load something.
    // Normally we might make an api request at this point, but
    // in this case we'll just fake it
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 200)
  },

  render: function () {
    return <Component {...this.state} />
  }
})
