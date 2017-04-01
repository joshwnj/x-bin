const React = require('react')

module.exports = function (props) {
  if (props.isLoading) {
    return <div>Loading...</div>
  }

  if (!props.content) {
    return <div>
      <a href="/#">Back</a>
      <div>Not found</div>
    </div>
  }

  return <div>
    <a href="/#">Back</a>
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
}
