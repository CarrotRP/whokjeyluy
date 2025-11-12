const Loan = require('../models/loanModel');
const Borrower = require('../models/borrowerModel');
const mongoose = require('mongoose');

const add_loan = async (req, res) => {
    const { name, lend_type, amount, date } = req.body;

    //find borrower by name
    const borrower = await Borrower.findOne({ username: name });
    let borrower_id;

    //if theres borrower name, get the id
    if (borrower) {
        borrower_id = borrower?._id;
    } else {
        //if theres no borrower name, create it, then get id
        const borrower = await Borrower.create({ username: name });
        borrower_id = borrower?._id;
    }

    Loan.create({ lender_id: req.user.id, borrower_id: borrower_id, date, amount, lend_type })
        .then(result => res.json(result));
}


const get_loan_list = (req, res) => {
    const { page } = req.query;
    const limit = 10; //listile per page
    const skip = (page - 1) * limit;
    let totalPage = 0;

    Loan.countDocuments({ lender_id: req.user.id })
        .then(count => {
            totalPage = Math.ceil(count / limit);
            return Loan.find({ lender_id: req.user.id })
                .populate('borrower_id', "_id username")
                .limit(limit)
                .skip(skip)
                .sort({ date: -1 });
        })
        .then(result => {
            res.json({totalPage, result});
        })
}

const get_summary = (req, res) => {
    Loan.aggregate(
        [
            {
                //need to convert the req.user.id to objectid
                $match: { lender_id: mongoose.Types.ObjectId.createFromHexString(req.user.id) }
            },
            {
                //join borrower doc to loan
                $lookup: {
                    from: 'borrowers',
                    localField: 'borrower_id',
                    foreignField: '_id',
                    as: 'borrower'
                }
            },
            { $unwind: '$borrower' }, //deconstruct the obj from $lookup
            {
                //group by username and sum the amount
                $group: {
                    _id: "$borrower.username",
                    totalAmount: { $sum: "$amount" },
                    userId: { $first: "$borrower._id" }
                }
            },
            { $sort: { _id: 1 } } //sort by username alphabetic order

        ]
    ).then(result => {
        res.json(result)
    });
}

module.exports = {
    add_loan,
    get_loan_list,
    get_summary
}