const { userModel, expenseModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;

    res.render('expenses/create', { user });
}

async function createExpense(req, res, next) {
    const user = req.user;
    let { merchant, total, category, description, report } = req.body;

    if (report === 'on') {
        report = true;
    } else {
        report = false;
    }

    const newExpense = {
        merchant,
        total,
        category,
        description,
        report,
        creator: user._id
    }

    try {
        const expense = await expenseModel.create(newExpense);
        await userModel.update({ _id: user._id }, { $push: { expenses: expense._id } });

        res.redirect('/');
    } catch (e) {
        handleError(res, e);

        const options = [
            { title: 'Advertising', selected: 'Advertising' == category },
            { title: 'Benefits', selected: 'Benefits' == category },
            { title: 'Car', selected: 'Car' == category },
            { title: 'Equipment', selected: 'Equipment' == category },
            { title: 'Fees', selected: 'Fees' == category },
            { title: 'Home Office', selected: 'Home Office' == category },
            { title: 'Insurance', selected: 'Insurance' == category },
            { title: 'Interest', selected: 'Interest' == category },
            { title: 'Labor', selected: 'Labor' == category },
            { title: 'Maintenance', selected: 'Maintenance' == category },
            { title: 'Materials', selected: 'Materials' == category },
            { title: 'Meals and Entertainment', selected: 'Meals and Entertainment' == category },
            { title: 'Office Supplies', selected: 'Office Supplies' == category },
            { title: 'Other', selected: 'Other' == category },
            { title: 'Professional Services', selected: 'Professional Services' == category },
            { title: 'Rent', selected: 'Rent' == category },
            { title: 'Taxes', selected: 'Taxes' == category },
            { title: 'Travel', selected: 'Travel' == category },
            { title: 'Utilities', selected: 'Utilities' == category }
        ];

        res.render('expenses/create', { user, expense: newExpense, options })
    }
}

function reportExpense(req, res, next) {
    const user = req.user;
    const expenseId = req.params.id;

    expenseModel.findById(expenseId)
        .then(expense => {
            let formattedDate = '';

            let year = expense.date.getFullYear();
            let month = expense.date.getMonth();
            let date = expense.date.getDate();

            formattedDate = `${year}-${month}-${date}`;

            expense.formattedDate = formattedDate;

            res.render('expenses/report', { user, expense });
        })
        .catch(err => {
            next(err);
        })
}

async function deleteExpense(req, res, next) {
    const user = req.user;
    const expenseId = req.params.id;

    try {
        await expenseModel.findByIdAndRemove(expenseId);
        await userModel.updateOne({ _id: user._id }, { $pull: { expenses: expenseId } });

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getCreate,
    createExpense,
    reportExpense,
    deleteExpense
}