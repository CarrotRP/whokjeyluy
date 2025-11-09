const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    username: String
}, {timestamps: true});

const borrower = mongoose.model('Borrower', borrowerSchema);
module.exports = borrower;