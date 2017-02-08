require('babel-register')

const normalizeEnv = require('../rules/env').normalize
require('./start')(normalizeEnv(process.env))
