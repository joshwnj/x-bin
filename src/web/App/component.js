const React = require('react')

const Create = require('../Create')
const View = require('../View')

module.exports = function (props) {
  if (props.url === 'new') {
    return <Create />
  }

  const matches = props.url.match(/doc\/(\w+)/)
  if (matches) {
    return <View id={matches[1]} />
  }

  if (props.loading) {
    return <div>loading</div>
  }

  return <a href="/#new">create</a>
}
