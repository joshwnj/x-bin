const React = require('react')

const cmz = require('cmz')
const Atoms = require('../styles/atoms')

module.exports = function AuthorInfo (props) {
  const mod = cmz('AuthorInfo', {
    root: [
      'display: flex',
      'align-items: center',
      'margin: 8px'
    ],

    photo: [
      'width: 64px',
      'height: 64px',
      'border-radius: 64px',
      'margin-right: 8px'
    ],

    info: [
      'flex: 1',
    ],

    name: [

    ],

    createdAt: [
      'color: #999',
      'font-size: .8em'
    ]
  })

  return <div className={mod.root}>
    <img className={mod.photo} src={props.photo} />
    <div className={mod.info}>
      <div className={mod.name}>{props.name || props.email}</div>
      <div className={mod.createdAt}>{props.createdAt}</div>
    </div>
  </div>
}
