const React = require('react')

const cmz = require('cmz')
const Atoms = require('../styles/atoms')
const mod = cmz('Create', {
  actions: []
})

module.exports = function (props) {
  if (props.isLoading) {
    return <div>Loading...</div>
  }

  if (!props.content) {
    return <div>
      <a className="action" href="/#">Home</a>
      <div>Not found</div>
    </div>
  }

  return <div className={Atoms.mainColumn}>
    <div className={mod.actions}>
      <a className={Atoms.button} href="/#">Home</a>
      <a className={Atoms.button} href={`/#doc/${props.id}`}>View</a>
    </div>
    <div
      id="editor"
      className="editable"
      dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
}
