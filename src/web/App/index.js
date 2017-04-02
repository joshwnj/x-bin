const React = require('react')
const xhr = require('xhr')

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

  logout: function () {
    this.setState({ loading: true })

    xhr({
      method: 'post',
      uri: '/auth/logout'
    }, (err, resp) => {
      if (err || resp.statusCode !== 200) {
        console.error(err || resp)
        alert('Logout failed')
        return
      }

      location.href = '/'
    })
  },

  render: function () {
    return <Component
      {...this.state}
      user={this.props.user}
      logout={this.logout} />
  }
})
