const cmz = require('cmz')
const React = require('react')

const Create = require('../Create')
const View = require('../View')
const Edit = require('../Edit')

function renderRoute (props) {
  if (props.loading) {
    return <div>loading</div>
  }

  if (!props.user) {
    return null
  }

  if (props.url === 'new') {
    return <Create />
  }

  const matches = props.url.match(/(doc|edit)\/(\w+)/)
  if (matches) {
    const Component = matches[1] === 'doc' ? View : Edit
    return <Component id={matches[2]} />
  }

  return <a className="action" href="/#new">create</a>
}

function UserBar (props) {
  const mod = cmz('UserBar', {
    root: [
      'background: #000',
      'color: #FFF',
      'padding: .5rem'
    ],

    inner: [
      'max-width: 960px',
      'margin: 0 auto',
      'display: flex',
      'justify-content: space-between',
      'align-items: center'
    ],

    logo: [
      'font-weight: bold',
      'font-style: italic'
    ],

    actions: [
      'display: flex',
      'align-items: center',
      '& > span { display: flex; align-items: center; }'
    ],

    button: [
      'text-decoration: none',
      'color: #000',
      'font-family: sans-serif',
      'background: #FFF',
      'padding: .5rem',
      'margin: .5rem 0',
      'font-size: .8rem',
      'text-transform: uppercase',
      'border: 1px solid #000',
      'border-radius: .5rem'
    ],

    photo: [
      'background: #FFF',
      'width: 3rem',
      'height: 3rem',
      'border-radius: 3rem',
      'margin: 0 1rem'
    ]
  })

  const loginButton = <a className={mod.button} href="/auth/google">Log in</a>
  const logoutButton = <button className={mod.button} onClick={props.logout}>Log out</button>
  const userInfo = props.name && <span>
    {props.name}
    <img className={mod.photo} src={props.photo} />
  </span>

  return <div className={mod.root}>
    <div className={mod.inner}>
      <div className={mod.logo}>xbin</div>
      <div className={mod.actions}>
        { userInfo }
        { props.name ? logoutButton : loginButton }
      </div>
    </div>
  </div>
}

module.exports = function (props) {
  return <div>
    <UserBar {...props.user} logout={props.logout} />
    {renderRoute(props)}
  </div>
}
