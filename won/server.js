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

    var sql1 = 'select * from mil_dev_info_emergency where userid = 1';
    connection.query(sql1,function(err, rows) {

        if(err) throw err;
        var cnt = 0;
        cnt = rows.length;

        //update
        if(cnt > 0){
            var sql2 = 'UPDATE mil_dev_info_emergency SET emergency = ? WHERE userid = 1';
            var params = parseInt(rows[0].emergency) + 1;
            connection.query(sql2, params, function(err, rows2, fields){
            if(err) console.log(err);
        
            });
        }

        //insert
        else{
            var sql2 = 'INSERT INTO mil_dev_info_emergency (userid,username,emergency) VALUES( 1, 김**,1)';
            connection.query(sql2, function(err, rows3, fields){
            if(err) console.log(err);
            });
        }
    });

    
    //put your server key here
    var serverKey = 'AAAAXCXVOMk:APA91bG2XIxw9D1Wpm2Krm-U6ENmDQ2YgQBTXHY1eMlHRU7DgPpv4EyU8MYnny3fKCAxPkdizLdIIbcV6q4JHS0mTpFYla4g5Z-u5gTPZEEUsjBuyQvZ0l9zfwqy2s4rH8vz-xOPWacb'; 
    var FCM = require('fcm-node');
    var fcm = new FCM(serverKey);

    
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'epcWMWSeYvk:APA91bFJ5iluDBoR-FDN-QksHF7Jy9ykLUpQC3gFQQ6jwqj7CPhaFl5K8RLeOZDdUD7hR-ZmWVf6T17HI8qlG8-4pEy6eDGkoOKr0Yzu85cM77avDMZ0URLBFmqCABFlTO0qoRo8sSE2',       
        
        priority : 'high',

        data: {  //you can send only notification or only data(or include both)
            title: '응급 상황 발생',
            body: '응급 상황 발생!'
        }
    
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
            // result = {"reseult" : "success"};
            // res.json(result);

        }
    });
            
    
 });


 // force client disconnect from server
 socket.on('forceDisconnect', function() {
     console.log('forceDisconnet');
     socket.disconnect();
 });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });

     // login
  socket.on('login', function(data) {
    console.log(data);
    socket.emit('loginresult',{
        result : "success"
    });

    });
 });

 module.exports = socketApi;

