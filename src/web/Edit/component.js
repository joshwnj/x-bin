const React = require('react')

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

  return <div>
    <a className="action" href="/#">Home</a>
    <a className="action" href={`/#doc/${props.id}`}>View</a>
    <div
      id="editor"
      className="editable"
      dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
}
