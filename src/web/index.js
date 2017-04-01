const MediumEditor = require('medium-editor')

const editor = new MediumEditor('#root', {
  toolbar: {
    buttons: [
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
