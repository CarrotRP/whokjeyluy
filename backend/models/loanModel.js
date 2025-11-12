const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    lender_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lender',
        required: true
    },
    borrower_id: {
        type: Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true
    },
    date: {
        type: Date,
    },
    amount: {
        type: Number,
        required: true
    },
    lend_type: {
        type: String,
        enum: ["Borrow", "Receive"],
        default: "Borrow"
    }
})

const loan = mongoose.model('Loan', loanSchema);

module.exports = loan;