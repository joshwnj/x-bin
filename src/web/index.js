const appData = global.__app_data || {}
const MediumEditor = require('medium-editor')

if (appData.view === 'create') {
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
}
