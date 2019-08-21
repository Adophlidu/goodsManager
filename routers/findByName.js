const db = require('../libs/database')

module.exports = function (res, get ,post, file) {
    let {goodsName} = get
    db.query(`select * from goods where goodsName='${goodsName}'`, (error, data) => {
        if (error) {
            res.writeHead(500)
            console.log(error)
            res.end('database error')
        } else {
            let result = JSON.stringify(data)
            res.setHeader('content-type', 'text/json')
            res.end(result)
        }
    })
}