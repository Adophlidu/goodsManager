const db = require('../libs/database')

module.exports = function (res, get, post, file) {
    let {goodsName, goodsPrice, goodsCount} = get
    if (!goodsName || !goodsPrice || !goodsCount) {
        res.end('params can not be null')
    } else {
        db.query('insert into goods(goodsName,goodsPrice,goodsCount) values(?,?,?)', [goodsName, goodsPrice, goodsCount], err => {
            if (err) {
                res.writeHead(500)
                res.end('database error')
            } else {
                res.end('insert sucess')
            }
        })
    }
}