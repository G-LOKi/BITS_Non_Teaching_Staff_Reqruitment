var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var multer = require("multer");
var multiparty = require('multiparty');

var flag;

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        flag=file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, flag);
    }
});

var upload = multer({
    storage: Storage
}).single("file");



module.exports =  function(req, res, next) {

    upload(req, res, function(err) {
        if (err) {
            console.log('Error');
        }
        console.log('File uploaded');
    });


    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "bitsreq"
        });

        //here you can read the appropriate fields/files

        if(fields!=null){
            var info = {
                name: req.body.name,
                location : req.body.location,
                mobileno: req.body.phoneno,
                landline: req.body.stdno + "-" + req.body.landline,
                email: req.body.email,
                dob: req.body.date,
                qualification: req.body.qualification,
                experience: req.body.experience,
                currentemployer: req.body.currentemployer,
                designation: req.body.designation,
                lsw: req.body.lsw,
                expectedsalary: req.body.expectedsalary,
                remarks: req.body.remarks,
                attach: "www.localhost:8080/uploads/"+flag
            };


            con.query('INSERT INTO userinfo SET ?', info, function(err,resp){
                if(err) throw err;

                return console.log('Last insert ID:', resp.insertId);
            });
            console.log('Not null');
             return res.render('applied', { title: 'Express' });
        }
        else {
            console.log('null');
            return res.render('index', {title: 'Express'});
        }

    });

};

