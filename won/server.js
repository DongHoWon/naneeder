var mysql      = require('mysql');
var dbconfig   = require('./server/config/database.js');
var connection = mysql.createConnection(dbconfig);
 
 /*** Socket.IO 추가 ***/
var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};
socketApi.io = io;

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {

// 접속한 클라이언트의 정보가 수신되면
socket.on('conn', function(data) {
    console.log('clinet : connection: '+data);
    socket.name = data;
    
 });


 // force client disconnect from server
 socket.on('forceDisconnect', function() {
     console.log('forceDisconnet');
     socket.disconnect();
 });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });
 });

 module.exports = socketApi;

