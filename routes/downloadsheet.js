var express = require('express');
var nodeExcel = require('excel-export');
var router = express.Router();
var mysql = require("mysql");


module.exports =  function(req, res, next) {
    var conf={};


    conf.cols=[
        {
            caption:'Name',
            type:'string',
            width:100
        },
        {
            caption:'Location',
            type:'string',
            width:100
        },
        {
            caption:'Mobile No.',
            type:'string',
            width:100
        },
        {
            caption:'Landline No.',
            type:'string',
            width:100
        },
        {
            caption:'Email',
            type:'string',
            width:100
        },
        {
            caption:'Date of Birth',
            type:'string',
            width:100
        },

        {
            caption:'Qualification',
            type:'string',
            width:100
        },
        {
            caption:'Experience',
            type:'string',
            width:100
        },
        {
            caption:'Current Employer',
            type:'string',
            width:100
        },
        {
            caption:'Designation',
            type:'string',
            width:100
        },
        {
            caption:'Last Salary Withdrawn',
            type:'string',
            width:100
        },
        {
            caption:'Expected Salary',
            type:'string',
            width:100
        },
        {
            caption:'Remarks',
            type:'string',
            width:600
        },
        {
            caption:'Resume Location',
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
            mobileno = rows[i].mobileno;
            landline = rows[i].landline;
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
            a = [name,location,mobileno,landline,email,dob,qualification,experience,currentemployer,designation,lsw,expectedsalary,remarks,attach];
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

