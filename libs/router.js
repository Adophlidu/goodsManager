//路由表设计

let router = {}

function addRouter(method, url, fn) { //添加路由
    method = method.toLowerCase()
    url = url.toLowerCase()

    router[method] = router[method] || {}
    router[method][url] = fn
}

function findRouter(method, url) { //查找路由
    method = method.toLowerCase()
    url = url.toLowerCase()

    if (!router[method] || !router[method][url]) {
        return null 
    } else {
        return router[method][url]
    }
}

module.exports = {
    addRouter,
    findRouter
}