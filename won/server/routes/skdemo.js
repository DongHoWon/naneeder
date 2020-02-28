var express = require('express');
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var router = express.Router();


router.get('/getAlldevs',function(req, res){
  var sql1 = 'SELECT m.userid,m.username,d.age,d.gender,m.battery,m.hrm,m.step,m.lat,m.lon,m.datetime FROM mil_dev_info_hiss m, devs d WHERE (m.userid, m.datetime) in ( select userid, max(datetime) from mil_dev_info_hiss group by userid) AND m.userid = d.dev_id order by m.userid asc;';
  var result = {};

  var sql2 = 'select m.userid, IFNULL(e.emergency,0) as eCnt ,m.datetime from mil_dev_info_hiss m LEFT OUTER JOIN mil_dev_info_emergency e on m.userid = e.userid group by m.userid order by m.userid asc';                                                    
  connection.query(sql1,function(err, rows) {
    
    if(err) throw err;
    
    var cnt = 0;
    cnt = rows.length;
    if(cnt < 0){
      result = {"status" : "fail"};
    }else{
      connection.query(sql2,function(err, rows2) {
          if(err) throw err;
          
          var cnt = 0;
          cnt = rows.length;
          if(cnt < 0){
            result = {"status" : "fail"};
          }
          result = {"status" : "success", "data" : rows, "data2" : rows2}
          res.json(result);
        });
    }
  });
});

router.get('/devs',function(req, res){
  var sql1 = 'select m.userid,m.username,m.battery,m.hrm,m.step,m.lat,m.lon,m.datetime, COUNT(e.userid) as eCnt from mil_dev_info_hiss m, mil_dev_info_emergency e where (m.userid,m.datetime) in (select userid, max(datetime) from mil_dev_info_hiss group by userid) AND m.userid  = e.userid AND m.userid=? order by datetime desc';
  var userid = req.param('userid');
  var result = {};
  connection.query(sql1,userid,function(err, rows) {
    
    if(err) throw err;
    
    var cnt = 0;
    cnt = rows.length;
    if(cnt < 0){
      result = {"status" : "fail"};
    }
    result = {"status" : "success", "data" : rows}
    res.json(result);
    });
});

router.get('/test',function(req, res){
    var sql1 = 'select * from devs where dev_id=1';
    connection.query(sql1,function(err, rows) {
      
      if(err) throw err;
      console.log(rows[0].dev_id);
      
  });
});


module.exports = router;
