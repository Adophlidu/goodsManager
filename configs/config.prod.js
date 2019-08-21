// 生产环境下的配置

const path = require('path')

module.exports = {
    //数据库
    DB_HOST: '1.10.25.21',
    DB_PORT: '3309',
    DB_USER: 'root',
    DB_PASSWORD: '123',
    DB_DATABASE: 'users',
    //http
    HTTP_PORT: '8080',
    HTTP_STATIC: path.resolve(__dirname, '../static/')
}