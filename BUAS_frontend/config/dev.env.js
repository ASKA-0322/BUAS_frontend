'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""', /* 指定绑定的后端接口路径 也是基本url前缀 localhost:xxxx */
})
