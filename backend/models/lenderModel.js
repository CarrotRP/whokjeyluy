const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lenderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
}, {timestamps: true});

const lender = mongoose.model('Lender', lenderSchema);

module.exports = lender;