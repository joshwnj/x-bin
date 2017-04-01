const React = require('react')
const xhr = require('xhr')

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
        content: body.doc.content
      })
    })
  },

  render: function () {
    return <div>
      <a href="/#">Back</a>
      <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
    </div>
  }
})
