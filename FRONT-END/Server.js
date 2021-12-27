var http= require('http');
var app= require('./app');
http.createServer(app.handleRequest).listen(8000);
console.log("server listening at 8000");