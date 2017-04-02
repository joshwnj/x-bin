const cmz = require('cmz')
const React = require('react')

const Create = require('../Create')
const View = require('../View')
const Edit = require('../Edit')

const Atoms = require('../styles/atoms')

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

  return <div className={Atoms.mainColumn}>
    <a className={Atoms.button} href="/#new">new</a>
  </div>
}

function UserBar (props) {
  const mod = cmz('UserBar', {
    root: [
      'background: #222',
      'color: #FFF',
      'padding: .5rem'
    ],

    inner: [
      Atoms.mainColumn,
      Atoms.vertCenteredRow
    ],

    logo: [
      'margin-left: .5rem',
      'font-weight: bold',
      'font-style: italic'
    ],

    actions: Atoms.vertCenteredRow,

    button: [
      Atoms.textButton
    ],

    userInfo: [
      Atoms.vertCenteredRow,
      'font-family: "Source Sans Pro", sans-serif'
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
  const userInfo = props.name && <span className={mod.userInfo}>
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
