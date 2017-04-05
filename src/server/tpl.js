// @flow

import { readFileSync } from 'fs'
import { join } from 'path'

type UserData = {
  email: string,
  name: string,
  photo: string
}

type AppData = {
  view: ?string,
  user: ?UserData
}

const raw = readFileSync(join(__dirname, '..', 'tpl.html'), 'utf8')

// use minified sources in prod
const tpl = process.env.NODE_ENV === 'production' ?
      raw.replace(/(index|vendor)\.js/g, '$1.min.js') :
      raw

module.exports = function (data: AppData) {
  return tpl.replace('<!--content-->', `<script>window.__app_data = ${JSON.stringify(data)}</script>`)
}
