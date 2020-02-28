var express = require('express');
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var router = express.Router();


router.post('/set',function(req, res){
  var result = {};
  var sql1 = 'SELECT userid FROM fcm_key WHERE userid = ?';
  var params1 = [req.body.userid];
  connection.query(sql1, params1,function(err, rows) {
    
    if(err) throw err;
    var cnt = 0;
    cnt = rows.length;

    if(cnt > 0){
        console.log(cnt + '/ data 존재');
        var sql2 = 'UPDATE fcm_key SET fcmkey = ? WHERE userid = ?';
        var params = [req.body.fcmkey, req.body.userid];
        connection.query(sql2, params, function(err, rows, fields){
          if(err) console.log(err);
          result = {"result" : "success"};
          res.json(result);
      });
    }else{
        console.log(cnt + '/ data 없어');
        var sql2 = 'INSERT INTO fcm_key (userid,fcmkey) VALUES( ?, ?)';
        var params = [req.body.userid, req.body.fcmkey];
        connection.query(sql2, params, function(err, rows, fields){
          if(err) console.log(err);
          result = {"result" : "success"};
          res.json(result);
      });
    }
  });
});

router.post('/push',function(req, res){
   //put your server key here
        var serverKey = 'AAAAXCXVOMk:APA91bG2XIxw9D1Wpm2Krm-U6ENmDQ2YgQBTXHY1eMlHRU7DgPpv4EyU8MYnny3fKCAxPkdizLdIIbcV6q4JHS0mTpFYla4g5Z-u5gTPZEEUsjBuyQvZ0l9zfwqy2s4rH8vz-xOPWacb'; 
        var FCM = require('fcm-node');
        var fcm = new FCM(serverKey);

        
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: 'et9l9zyWIA4:APA91bGgzyGW29okG8jpARzKJTdUldgz_CViV8adBhmxaaBgTpwSL4bwt3xJg76tEf7Q3YjwhcQJtfe6Nqk2BDCZZhsmqh2NXEt4_orldQLufKeLIM83tUWGCNt6T1csnCpVYfmk8ZQD',       
            
            priority : 'high',

            data: {  //you can send only notification or only data(or include both)
                title: req.body.userid,
                body: req.body.username
            }
        
        };

        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
});


module.exports = router;
