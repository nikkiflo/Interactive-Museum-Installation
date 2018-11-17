var express = require('express');

var app = express();
var port = 3333;
var server = require('http').createServer(app); //default setting
var io = require('socket.io')(server);
// var url = require('url');
var fs = require('fs'); //write files



app.use(express.static(__dirname + '/'));

io.on('connection', function(socket){

  socket.on('imageData', function(data){

    // var json = JSON.stringify(data, null, 2);
    var json = JSON.stringify(data);

    fs.writeFile("data.json", json);
    console.log("yeahhhhh");
  });
  socket.on('message', function(data){
    console.log(data);
  })

});

server.listen(3333);
