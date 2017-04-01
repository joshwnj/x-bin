const React = require('react')

const Create = require('../Create')
const View = require('../View')
const Edit = require('../Edit')

function renderRoute (props) {
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

module.exports = function (props) {
  if (!props.user) {
    return <div>
      <a className="action" href="/auth/google">Log in</a>
    </div>
  }

  const user = props.user
  return <div>
    <div>
      <img src={user.photo} />
      wb {user.name}
    </div>
    {renderRoute(props)}
  </div>
}
