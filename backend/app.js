const express = require('express');
const mysql = require("mysql2");
require('dotenv').config();

//create a wkl database before use
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: 'wkl',
    multipleStatements: true
})

const app = express();
app.use(express.json());

connection.connect(err => {
    //create database
    connection.query(
        `
        CREATE DATABASE IF NOT EXISTS wkl;
        USE wkl;
        `, (err, result) => {
            if (err) throw err;
            console.log('hello')
        }
    );

    console.log('connected')
});
connection.query(
    `
    CREATE TABLE IF NOT EXISTS user(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name varchar(50)
    );
    CREATE TABLE IF NOT EXISTS transition(
        trans_id int primary key auto_increment,
        user_id int,
        amount decimal(5, 2),
        date date,
        foreign key(user_id) references user(user_id)
    );
    `, (err , result) =>  {
        if(err) throw err;
    }
)

app.get('/test', (req, res) => {
    res.json('hello')
})
app.get('/user', (req, res) => {
    res.json('get user');
});
app.post('/user/add', (req, res) => {
    const { user } = req.body;
    console.log('add req: ', user);
});
app.patch('/user/edit', (req, res) => {
    console.log('update req: ', req.body);
});
app.delete('/user/delete', (req, res) => {
    console.log('del req: ', req.body);
})

app.listen(3000);