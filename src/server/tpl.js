// @flow

import { readFileSync } from 'fs'
import { join } from 'path'

type AppData = {
  view: string
}

const tpl = readFileSync(join(__dirname, '..', 'web', 'static', 'index.html'), 'utf8')
module.exports = function (data: AppData) {
  return tpl.replace('<!--content-->', `<script>window.__app_data = ${JSON.stringify(data)}</script>`)
}
