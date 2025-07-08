const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');
require('dotenv').config();

//create a wkl database before use, in mysql
//create database wkl;
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true //for doing multiple query
})

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());

connection.connect();

//create table and stuff
connection.query(
    `
    CREATE TABLE IF NOT EXISTS users(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE
    );
    CREATE TABLE IF NOT EXISTS transactions(
        transaction_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        amount DECIMAL(10,2),
        transaction_type ENUM('Borrow', 'Receive'),
        date DATE,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
    `, (err, result) => {
    if (err) throw err;
}
)

//get users, use this for selecting user in dropdown
app.get('/user/get-user', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});
//get users with transaction, for displaying all the transaction along with the user
app.get('/user/get-transaction', (req, res) => {
    const { name } = req.query;

    console.log(name);
    //user search
    if (name) {
        connection.query(`SELECT * FROM users JOIN transactions USING(user_id) WHERE name LIKE ? ORDER BY date DESC`, [`%${name}%`], (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    } else{
        connection.query(`SELECT * FROM users JOIN transactions USING(user_id) ORDER BY date DESC LIMIT 5 OFFSET 0`, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    }
})

//add user with transaction
app.post('/user/add', (req, res) => {
    const { name, amount, transaction_type, date } = req.body;
    connection.query(`
        INSERT IGNORE INTO users(name) VALUES(?);
        INSERT INTO transactions(user_id, amount, transaction_type, date)
        SELECT user_id, ?, ?, ? FROM users WHERE name = ?;
        `, [name, amount, transaction_type, date, name], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});
//edit a transaction
app.patch('/user/edit', (req, res) => {
    console.log(req.body.name);
    const { transaction_id, name, amount, transaction_type, date } = req.body;

    connection.query(`
            INSERT IGNORE INTO users(name)
            VALUES(?);

            UPDATE transactions
            SET user_id = (SELECT user_id FROM users WHERE name = ?), amount = ?, transaction_type = ?, date = ?
            WHERE transaction_id = ?
        `, [name, name, amount, transaction_type, date, transaction_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
    console.log('update req: ', req.body);
});
//delete a trasaction
app.delete('/user/delete', (req, res) => {
    connection.query(`
        DELETE FROM transactions WHERE transaction_id = ?
        `, [req.body.transaction_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
//summary
app.get('/user/summary', (req, res) => {
    connection.query(`
            SELECT user_id, name, sum(amount) AS amount FROM users JOIN transactions USING(user_id) GROUP BY name, user_id;
        `, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.listen(3000);