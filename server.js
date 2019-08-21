const http = require('./libs/http')
const {addRouter} = require('./libs/router')
const {addGoods, findByName} = require('./routers')

addRouter('get', '/addGoods', addGoods)
addRouter('get', '/findOneGoods', findByName)
