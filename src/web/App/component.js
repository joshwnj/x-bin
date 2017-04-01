const React = require('react')

const Create = require('../Create')

module.exports = function (props) {
  switch (props.url) {
  case 'new':
    return <Create />
  }
  if (props.loading) {
    return <div>loading</div>
  }

  return <a href="/#new">create</a>
}
