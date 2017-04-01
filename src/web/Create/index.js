const React = require('react')
const MediumEditor = require('medium-editor')
const xhr = require('xhr')

module.exports = React.createClass({
  displayName: 'CreateState',

  componentDidMount: function () {
    this.editor = new MediumEditor('#editor', {
      toolbar: {
        buttons: [
          'h2',
          'h3',
          'bold',
          'italic',
          'anchor',
          'quote',
          'orderedList',
          'unorderedList',
          'pre',
          'removeFormat'
        ]
      }
    })

    // TODO: autosave draft to localstorage every couple of seconds
    // ...

  },

  save: function () {
    const content = this.editor.getContent()
    xhr({
      method: 'post',
      uri: '/api/doc',
      json: true,
      body: {
        id: 'test' + Date.now(),
        content
      }
    }, (err, resp, body) => {
      console.log({err, resp, body})
      if (err || resp.statusCode !== 200) {
        alert('Saving failed')
        return console.error(err || resp)
      }

      location.hash = `doc/${body.id}`
    })
  },

  render: function () {
    return <div>
      <a className="action" href="/#">Home</a>
      <a className="action" onClick={this.save}>Save</a>
      <div id="editor" className="editable"></div>
    </div>
  }
})
