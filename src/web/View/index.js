const React = require('react')
const xhr = require('xhr')
const Component = require('./component')

module.exports = React.createClass({
  displayName: 'ViewState',

  getInitialState: function () {
    return {
      isLoading: false,
      error: null,
      content: null
    }
  },

  componentWillMount: function () {
    this.fetch(this.props.id)
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.id !== this.props.id) {
      this.fetch(newProps.id)
    }
  },

  fetch: function (id) {
    this.setState({
      isLoading: true
    })

    xhr({
      json: true,
      method: 'get',
      uri: `/api/doc/${id}`
    }, (err, resp, body) => {
      if (err) {
        return console.error(err)
      }

      if (resp.statusCode === 404) {
        return this.setState({
          isLoading: false
        })
      }

      this.setState({
        isLoading: false,
        doc: body.doc,
        author: body.author
      })
    })
  },

  render: function () {
    return <Component id={this.props.id} {...this.state} />
  }
})
