handlers.getEditor = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let userId = sessionStorage.getItem('id');

    receiptService.getActiveReceipt(userId)
        .then(function (res) {

            if (res.length === 0) {
                ctx.redirect('#/editor/createReceipt');

            } else {
                let receiptId = res[0]._id;
                ctx.receiptId = receiptId;

                receiptService.getEntries(receiptId)
                    .then(function (res) {

                        let entries = res;

                        entries
                            .forEach((entry) => {
                                entry.subTotal = Number(entry.qty) * Number(entry.price);
                                entry.price = Number(entry.price).toFixed(2);
                                entry.subTotal = Number(entry.subTotal).toFixed(2);

                                return entry;
                            });

                        let total = entries
                            .map((x) => x.subTotal)
                            .reduce((a, b) => Number(a) + Number(b), 0)
                            .toFixed(2);

                        ctx.entries = entries;
                        ctx.total = total;
                        ctx.productCount = entries.length;


                        ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs'
                        })
                            .then(function () {
                                this.partial('./templates/receipt/createReceipt.hbs');
                            })
                            .catch(function (err) {
                                notifications.handleError(err);
                            });
                    });
            }
        });
};

handlers.createReceipt = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    let data = {
        "active": true,
        "productCount": 0,
        "total": 0
    };

    receiptService.createReceipt(data)
        .then(function () {
            ctx.redirect('#/editor');
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.getOverview = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let userId = sessionStorage.getItem('id');


    receiptService.getAllMyReceipts(userId)
        .then(function (res) {

            let receipts = res;

            let allReceiptsTotal = 0;

            for (let i = 0; i < receipts.length; i++) {
                allReceiptsTotal += Number(receipts[i].total);

                let [date, time] = receipts[i]._kmd.ect.split(/[T.]/);

                receipts[i]['date'] = date;
                receipts[i]['time'] = time;
            }


            allReceiptsTotal = allReceiptsTotal.toFixed(2);

            ctx.receipts = receipts;
            ctx.allReceiptsTotal = allReceiptsTotal;


            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/receipt/allReceipts.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.addEntry = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('id');

    receiptService.getActiveReceipt(userId)
        .then(function (res) {

            let id = res[0]._id;

            let data = {...ctx.params, receiptId: id};


            if (data.type === '') {
                notifications.showError('Product name must be a non-empty string');
            } else if (+data.qty === 0) {
                notifications.showError('Quantity must be a number');
            } else if (+data.price === 0) {
                notifications.showError('Price must be a number');
            } else {
                receiptService.addEntry(data)
                    .then(function () {
                        notifications.showInfo('Entry added');

                        ctx.redirect('#/editor');
                    })
                    .catch(function (error) {
                        notifications.handleError(error);
                    })
            }
        })


};

handlers.deleteEntry = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    receiptService.deleteEntry(id)
        .then(function () {

            notifications.showInfo('Entry removed');

            ctx.redirect('#/editor');
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.checkout = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    if (ctx.params.productCount == 0) {
        notifications.showError('Receipt must contains at least one entry.');
    } else {
        let receiptId = ctx.params.receiptId;
        let data = {
            "active": false,
            "productCount": ctx.params.productCount,
            "total": ctx.params.total
        };

        receiptService.receiptCheckout(receiptId, data)
            .then(function () {
                notifications.showInfo('Receipt checked out');

                ctx.redirect('#/editor');
            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }
};

handlers.getReceiptDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    receiptService.getAReceipt(id)
        .then(function (res) {

            let receiptId = res._id;


            receiptService.getEntries(receiptId)
                .then(function (res) {
                    let entries = res;

                    entries.forEach(x => x.total = (Number(x.qty) * Number(x.price)).toFixed(2));

                    ctx.entries = res;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    })
                        .then(function () {
                            this.partial('./templates/receipt/receiptDetails.hbs');
                        })
                        .catch(function (err) {
                            notifications.handleError(err);
                        });
                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};


