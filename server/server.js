var http = require('http');
var express = require('express')

var app = express()

var server = http.createServer(app);
server.listen(3000, () => {
    console.log("Server listening on port 3000!")
})