var express = require('express');
var nodeExcel = require('excel-export');
var router = express.Router();
var mysql = require("mysql");


module.exports =  function(req, res, next) {
    var conf={};


    conf.cols=[{
        caption:'id',
        type:'number',
        width:3
    },
        {
            caption:'name',
            type:'string',
            width:50
        },
        {
            caption:'age',
            type:'number',
            width:15
        }
    ];


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "bitsreq"
    });

    con.query("SELECT * FROM userinfo",function(err,rows) {
        arr = [];
        for (i = 0; i < rows.length; i++) {
            id= rows[i].id;
            name = rows[i].name;
            age = rows[i].age;
            a = [id,name,age];
            arr.push(a);

        }
        console.log(arr);
        conf.rows=arr;
        var result=nodeExcel.execute(conf);
        res.setHeader('Content-Type','application/vnd.openxmlformates');
        res.setHeader("Content-Disposition","attachment;filename="+"list.xlsx");
        res.end(result,'binary');
    });

};

