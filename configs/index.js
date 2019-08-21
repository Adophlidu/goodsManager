//简单判断当前的生产环境,并导出对应的配置

const process = require('process')

let mode = (process.env.OS == 'Windows_NT' ? 'dev' : 'prod')

module.exports = {
    mode,
    ...(mode === 'dev' ? require('./config.dev') : require('./config.prod'))
}