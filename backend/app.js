const express = require('express');
const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
})

const app = express();

connection.connect(err => {
    //create database
    connection.query(
        'CREATE DATABASE IF NOT EXISTS wkl', (err, result) => {
            if(err) throw err;
        }
    );
    
    console.log('connected');
});

app.listen(3000);

app.get('/test', (req, res) => {
    res.json('hello')
})