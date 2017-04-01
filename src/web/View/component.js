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
    <a className="action" href={`/#edit/${props.id}`}>Edit</a>
    <div className="editable" dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
}
