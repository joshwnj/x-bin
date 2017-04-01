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
      body: JSON.stringify({
        id: 'test' + Date.now(),
        content
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }, (err, resp, body) => {
      console.log({err, resp, body})
    })
  },

  render: function () {
    return <div>
      <a href="/#">Back</a>
      <button onClick={this.save}>Save</button>
      <div id="editor" className="editable"></div>
    </div>
  }
})
