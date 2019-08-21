//数据库基本配置

const mysql = require('mysql')
const co = require('co-mysql')

let {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} = require('../configs')

let conn = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})

module.exports = co(conn)