var express = require('express');
var nodeExcel = require('excel-export');
var router = express.Router();
var mysql = require("mysql");


module.exports =  function(req, res, next) {
    var conf={};


    conf.cols=[
        {
            caption:'name',
            type:'string',
            width:100
        },
        {
            caption:'location',
            type:'string',
            width:100
        },
        {
            caption:'phoneno',
            type:'string',
            width:100
        },
        {
            caption:'email',
            type:'string',
            width:100
        },
        {
            caption:'dob',
            type:'string',
            width:100
        },
        {
            caption:'qualification',
            type:'string',
            width:100
        },
        {
            caption:'experience',
            type:'string',
            width:100
        },
        {
            caption:'currentemployer',
            type:'string',
            width:100
        },
        {
            caption:'designation',
            type:'string',
            width:100
        },
        {
            caption:'lsw',
            type:'string',
            width:100
        },
        {
            caption:'expectedsallary',
            type:'string',
            width:100
        },
        {
            caption:'remarks',
            type:'string',
            width:600
        },
        {
            caption:'attach',
            type:'string',
            width:600
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
            name= rows[i].name;
            location = rows[i].location;
            phoneno = rows[i].phoneno;
            email= rows[i].email;
            dob = rows[i].dob;
            qualification = rows[i].qualification;
            experience = rows[i].experience;
            currentemployer = rows[i].currentemployer;
            designation = rows[i].designation;
            lsw = rows[i].lsw;
            expectedsalary = rows[i].expectedsalary;
            remarks = rows[i].remarks;
            attach = rows[i].attach;
            a = [name,location,phoneno,email,dob,qualification,experience,currentemployer,designation,lsw,expectedsalary,remarks,attach];
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

