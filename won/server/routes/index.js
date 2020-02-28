var express = require('express');
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var router = express.Router();
const path = require("path");


/* GET home page. */
router.get('/',function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname ,"../", "index.html"));
  console.log(__dirname);
});

/* GET contact page. */
router.get('/contact',function(req, res, next) {
  res.sendFile(__dirname + '/contact.html');
});

/* GET contact page. */
router.get('/about',function(req, res, next) {
  res.sendFile(__dirname + '/about.html');
});

module.exports = router;
