const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

//Router
const borrowerRoutes = require('./routes/lender');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

mongoose.connect(process.env.DB_URL)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());


app.use('/', borrowerRoutes);