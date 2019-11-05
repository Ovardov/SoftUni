const { expenseModel, userModel } = require('../models/index');

async function getHome(req, res, next) {
    let user = req.user;

    try {
        if(user){
            user = await userModel.findById(user._id).populate('expenses');
            let formattedDate = '';
    
            if (user.expenses.length > 0) {
                user.expenses.forEach(expense => {
                    let year = expense.date.getFullYear();
                    let month = expense.date.getMonth();
                    let date = expense.date.getDate();
    
                    expense.formattedDate = `${year}-${month}-${date}`;
                })
            }
    
        }
      
        res.render('index', { user });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getHome
};