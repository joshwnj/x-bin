const MediumEditor = require('medium-editor')

const editor = new MediumEditor('#root', {
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

window.editor = editor
