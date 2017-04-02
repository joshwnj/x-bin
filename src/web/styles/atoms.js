const cmz = require('cmz')

const Atoms = cmz('Atoms', {
  mainColumn: `
    max-width: 960px;
    margin: 0 auto;
  `,

  vertCenteredRow: [
    'display: flex',
    'justify-content: space-between',
    'align-items: center'
  ],

  button: `
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #000;
    font-family: sans-serif;
    background: #FFF;
    padding: .5rem;
    margin: .5rem 0 .5rem .5rem;
    font-size: .8rem;
    text-transform: uppercase;
    border: 1px solid #000;
    border-radius: .5rem;
  `
})

module.exports = Atoms
