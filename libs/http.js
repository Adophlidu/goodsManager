const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const url = require('url')
const querystring = require('querystring')
const {Form} = require('multiparty')

const {HTTP_PORT, HTTP_STATIC, HTTP_UPLOAD} = require('../configs')
const {findRouter, addRouter} = require('./router')

http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true)

    if (req.method == 'POST') {
        //普通post请求
        if (req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
            let ary = []
            req.on('data', buffer => {
                ary.push(buffer)
            })
            req.on('end', () => {
                let post = querystring.parse(Buffer.concat(ary).toString())
                // 查找路由
                handleRouter(req.method, pathname, query, post, {})
            })
        } else {
            //文件post
            let form = new Form({
                uploadDir: HTTP_UPLOAD
            })
            form.parse(form)

            let post = {}
            let files = {}

            form.on('field', (name, value) => { //普通参数
                post[name] = value
            })
            form.on('file', (name, value) => { //文件
                files[name] = value
            })
            form.on('error', error => {
                console.log('解析文件post出错' + error)
            })
            form.on('close', () => { // 结束, 数据已经全部解析完毕
                handleRouter(req.method, pathname, get, post, files)
            })
        }
    } else {
        //get请求
        handleRouter(req.method, pathname, query, {}, {})
    }

    async function handleRouter (method, url, get, post, file) {
        let fn = findRouter(method, url)
        if (!fn) {
            //文件
            let path = HTTP_STATIC + pathname
            fs.stat(path, (error, stat) => { // 判断该路径是否存在
                if (error) {
                    res.writeHead(404)
                    res.end('404 not found')
                } else {
                    let rs = fs.createReadStream(path)
                    let gzip = zlib.createGzip()

                    rs.on('error', () => {
                        res.writeHead(500)
                        res.end('2222')
                    })
                    res.setHeader('content-encoding', 'gzip')
                    rs.pipe(gzip).pipe(res)
                }
            })
        } else {
            //接口
            try {
                fn(res, get, post, file)
            } catch (e) {
                console.log(e)
                res.writeHead(500)
                res.end('123123')
            }
        }
    }
}).listen(HTTP_PORT, () => {
    console.log(`the server is running at ${HTTP_PORT}`)
})