const React = require('react')
const { render } = require('react-dom')
const App = require('./App')

const appData = global.__app_data || {}

render(
  <App user={appData.user} />,
  document.getElementById('root')
)
