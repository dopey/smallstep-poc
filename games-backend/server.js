#!/usr/bin/nodejs

const http = require('http'),
    concat = require('concat-stream')
    server = http.createServer().listen(8020)

const baseUrl = 'localhost'

server.on('request', (req, res) => {
    var modifyStream = concat((acctResp) => {
        var wltResp = "Successful Games Request - " + acctResp
        res.end(wltResp)
    })

    var connector = http.request({
        host: baseUrl,
        path: req.url,
        port: 8010,
        method: req.method
    }, (r2) => {
        r2.pipe(modifyStream);
    })

    req.pipe(connector)
})
