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

const update_loan = async (req, res) => {
    const {id} = req.params;
    const { name, lend_type, amount, date} = req.body;

    //similar to add, but in update
    const borrower = await Borrower.findOne({username: name});
    let borrower_id;

    //if theres borrower name, get the id
    if (borrower) {
        borrower_id = borrower?._id;
    } else {
        //if theres no borrower name, create it, then get id
        const borrower = await Borrower.create({ username: name });
        borrower_id = borrower?._id;
    }

    Loan.findByIdAndUpdate(id, {borrower_id, lend_type, amount, date}, {new: true})
        .then(result => res.json(result));
}

const delete_loan = (req, res) => {
    const {id} = req.params;

    Loan.findByIdAndDelete(id)
        .then(result => res.json(result));
}

const get_loan_list = async (req, res) => {
    const { page, query } = req.query;

    const limit = 10; //listile per page
    const skip = (page - 1) * limit;

    //basepipeline, find by lender_id, then populate(or join) the loan with borrower table using(borrower_id)
    //then find by username
    const basePipeline = [
        {
            $match: { lender_id: mongoose.Types.ObjectId.createFromHexString(req.user.id) }
        },
        {
            $lookup: {
                from: 'borrowers',
                localField: 'borrower_id',
                foreignField: '_id',
                as: 'borrower'
            }
        },
        {
            $unwind: '$borrower'
        },
        {
            $match: { "borrower.username": { $regex: query != "" ? query : "", $options: "i" } }
        },
        {
            $sort: {date: -1}
        }
    ]

    //total count of the document
    const count = await Loan.aggregate([
        ...basePipeline,
        {
            $count: "result"
        }
    ]);

    //result of basepipeline(a list of loans)
    const result = await Loan.aggregate([
        ...basePipeline,
        {
            $skip: skip
        },
        { 
            $limit: limit 
        },
    ])

    //calculate totalpage
    let totalPage = Math.ceil(count[0]?.result / limit);

    res.json({ totalPage, result });
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
    update_loan,
    delete_loan,
    get_loan_list,
    get_summary
}