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

const tpl = readFileSync(join(__dirname, '..', 'tpl.html'), 'utf8')
module.exports = function (data: AppData) {
  return tpl.replace('<!--content-->', `<script>window.__app_data = ${JSON.stringify(data)}</script>`)
}
