//开发环境下的配置

const path = require('path')

module.exports = {
    //数据库
    DB_HOST: 'localhost',
    DB_PORT: '3306',
    DB_USER: 'root',
    DB_PASSWORD: '172773LD',
    DB_DATABASE: 'users',
    //http
    HTTP_PORT: '8080',
    HTTP_STATIC: path.resolve(__dirname, '../static/'),
    HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
}