'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '""',
  //访问后端接口的地址
  //改了配置文件需要重启
  BASE_API: '"http://172.20.10.4:8081"',     //指定绑定的后端接口路径 也是基本url前缀 示例：http://localhost:xxxx
})
