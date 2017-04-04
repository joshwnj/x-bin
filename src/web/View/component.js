const React = require('react')

const cmz = require('cmz')
const Atoms = require('../styles/atoms')
const mod = cmz('View', {
  actions: []
})

const AuthorInfo = require('../components/AuthorInfo')

module.exports = function (props) {
  if (props.isLoading) {
    return <div>Loading...</div>
  }

  const { doc } = props

  if (!doc) {
    return <div>
      <a className="action" href="/#">Home</a>
      <div>Not found</div>
    </div>
  }

  return <div className={Atoms.mainColumn}>
    <div className={mod.actions}>
      <a className={Atoms.button} href="/#">Home</a>
      <a className={Atoms.button} href={`/#edit/${props.id}`}>Edit</a>
    </div>
    <AuthorInfo {...props.author} createdAt={doc.createdAt} />
    <div
      id="editor"
      className="editable"
      dangerouslySetInnerHTML={{ __html: doc.content }} />
  </div>
}
