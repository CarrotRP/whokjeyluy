const express = require('express');
const mysql = require("mysql2");
const sqlite3 = require("sqlite3");
const cors = require('cors');
require('dotenv').config();

//db file for sqlite
//if you dont have it, it will create itself, no worries
const db = new sqlite3.Database('./db/wkl.db');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());

//create table
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    );
    `);
    db.run(`
    CREATE TABLE IF NOT EXISTS transactions(
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount NUMERIC,
        transaction_type TEXT,
        date TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    ); 
    `)
})

//get users, use this for selecting user in dropdown
app.get('/user/get-user', (req, res) => {
    db.all(`SELECT * FROM users`, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
    db.all(`SELECT * FROM users`, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

//get users with transaction, for displaying all the transaction along with the user
app.get('/user/get-transaction', (req, res) => {
    const { name, page, limit } = req.query;
    const offset = (page - 1) * limit;

    //user search
    if (name) {
        db.all(`SELECT COUNT(*) as total FROM users JOIN transactions USING(user_id) WHERE name LIKE ?`,
            [`%${name}%`], (err, countResult) => {
                if (err) throw err;
                const total = countResult[0].total;
                const totalPage = Math.ceil(total / limit);

                db.all(`SELECT * FROM users JOIN transactions USING(user_id) WHERE name LIKE ? ORDER BY date DESC LIMIT ? OFFSET ? `,
                    [`%${name}%`, parseInt(limit), parseInt(offset)], (err, result) => {
                        if (err) throw err;
                        res.json({ result, totalPage });
                    })
            });
    } else {
        db.all(`SELECT COUNT(*) AS total FROM transactions`, (err, countResult) => {
            if (err) throw err;
            const total = countResult[0].total;
            const totalPage = Math.ceil(total / limit);

            db.all(`SELECT * FROM users JOIN transactions USING(user_id) ORDER BY date DESC LIMIT ? OFFSET ?`,
                [parseInt(limit), parseInt(offset)], (err, result) => {
                    if (err) throw err;
                    res.json({ result, totalPage });
                })
        });
    }
})

//add user with transaction
app.post('/user/add', (req, res) => {
    const { name, amount, transaction_type, date } = req.body;
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users(name) VALUES(?);`, [name]);
        db.run(`INSERT INTO transactions(user_id, amount, transaction_type, date)
            SELECT user_id, ?, ?, ? FROM users WHERE name = ?;
            `, [amount, transaction_type, date, name], (err) => {
            if (err) throw err;
            res.json({message: 'user and transaction added'});
        });
    });
});
//edit a transaction
app.patch('/user/edit', (req, res) => {
    console.log(req.body.name);
    const { transaction_id, name, amount, transaction_type, date } = req.body;

    db.run(`
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
    db.run(`
        DELETE FROM transactions WHERE transaction_id = ?
        `, [req.body.transaction_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
//summary
app.get('/user/summary', (req, res) => {
    db.all(`
        SELECT user_id, name, sum(amount) AS amount FROM users JOIN transactions USING(user_id) GROUP BY name, user_id;
    `, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    })
})

app.listen(3000);