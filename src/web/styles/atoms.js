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

  buttonBase: `
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #000;
    font-family: sans-serif;
    padding: .5rem;
    margin: .5rem 0 .5rem .5rem;
    font-size: .8rem;
    text-transform: uppercase;
  `
})

Atoms.add({
  button: [
    Atoms.buttonBase,
    `
    background: #FFF;
    border: 1px solid #000;
    border-radius: .5rem;
    `
  ],

  textButton: [
    Atoms.buttonBase,
    `
    letter-spacing: .15em;
    font-family: "Source Sans Pro", HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 12px;
    background: transparent;
    border: none;
    color: #CCC;
    `
  ]
})

module.exports = Atoms
