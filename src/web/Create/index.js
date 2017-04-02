const React = require('react')
const MediumEditor = require('medium-editor')
const xhr = require('xhr')

const cmz = require('cmz')
const Atoms = require('../styles/atoms')
const mod = cmz('Create', {
  actions: []
})

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
    return <div className={Atoms.mainColumn}>
      <div className={mod.actions}>
        <a className={Atoms.button} href="/#">Home</a>
        <a className={Atoms.button} onClick={this.save}>Save</a>
      </div>
      <div id="editor" className="editable"></div>
    </div>
  }
})
