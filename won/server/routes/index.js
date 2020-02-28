var express = require('express');
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(__dirname + '/index.html');
});

/* GET contact page. */
router.get('/contact',function(req, res, next) {
  res.sendFile(__dirname + '/contact.html');
});

/* GET contact page. */
router.get('/about',function(req, res, next) {
  res.sendFile(__dirname + '/about.html');
});

router.post('/test2',function(req,res){
  var sql1 = 'INSERT INTO mil_dev_info_emergency (userid,username) VALUES (?,?)';
  var params = [req.body.userid, req.body.username];
  connection.query(sql1, params,function(err, rows) {
    if(err) throw err;

    var cnt = 0;
    cnt = rows.length;
    if(cnt > 0){
      console.log(cnt + '/ data2 존재');
      res.send('success');

    }else
      console.log(cnt + '/ data2 없어');
      res.send('success');

  });

  console.log(req.body);
});

module.exports = router;
