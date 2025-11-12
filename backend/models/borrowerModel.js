const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    username: String,
    // lender_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Lender'
    // }
}, {timestamps: true});

const borrower = mongoose.model('Borrower', borrowerSchema);
module.exports = borrower;