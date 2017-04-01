const React = require('react')

const Create = require('../Create')
const View = require('../View')
const Edit = require('../Edit')

module.exports = function (props) {
  if (props.url === 'new') {
    return <Create />
  }

  const matches = props.url.match(/(doc|edit)\/(\w+)/)
  if (matches) {
    const Component = matches[1] === 'doc' ? View : Edit
    return <Component id={matches[2]} />
  }

  if (props.loading) {
    return <div>loading</div>
  }

  return <a className="action" href="/#new">create</a>
}
