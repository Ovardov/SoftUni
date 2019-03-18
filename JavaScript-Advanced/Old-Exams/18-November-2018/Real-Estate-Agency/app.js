function realEstateAgency() {
    let regOfferButton = $('#regOffer button');
    regOfferButton.on('click', regOffer);

    let findOfferButton = $('#findOffer button');
    findOfferButton.on('click', findOffer);

    function regOffer() {
        let rentElement = $('#regOffer input[name=apartmentRent]');
        let typeElement = $('#regOffer input[name=apartmentType]');
        let commissionElement = $('#regOffer input[name=agencyCommission]');

        let rent = +rentElement.val();
        let type = typeElement.val();
        let commission = +commissionElement.val();

        if (rent > 0 && type && !type.includes(':') && commission >= 0 && commission <= 100) {
            $('#message').text('Your offer was created successfully.');

            let div = $('<div>')
                .addClass('apartment');

            let pForRent = $('<p>')
                .text(`Rent: ${rent}`)
                .appendTo(div);

            let pForType = $('<p>')
                .text(`Type: ${type}`)
                .appendTo(div);

            let pForCommission = $('<p>')
                .text(`Commission: ${commission}`)
                .appendTo(div);

            $('#building').append(div);
        } else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        rentElement.val('');
        typeElement.val('');
        commissionElement.val('');
    }

    function findOffer() {
        let budgetElement = $('#findOffer input[name=familyBudget]');
        let typeElement = $('#findOffer input[name=familyApartmentType]');
        let nameElement = $('#findOffer input[name=familyName]');

        let agencyProfitElement = $('#roof h1');

        let budget = +budgetElement.val();
        let type = typeElement.val();
        let name = nameElement.val();

        if (budget > 0 && type && name) {
            let findApartments = $('#building p:nth-child(2)')
                .toArray();


            for (let apartment of findApartments) {

                let currentApartmentType = apartment
                    .textContent
                    .split(': ')[1];

                if (currentApartmentType === type) {
                    let parent = $(apartment).parent();

                    let rentElement = $(parent).children()[0];
                    let rentPrice = +$(rentElement)
                        .text()
                        .split(': ')[1];


                    let commissionElement = $(parent).children()[2];
                    let commissionPercent = +$(commissionElement)
                        .text()
                        .split(': ')[1];

                    let totalPrice = rentPrice + (rentPrice * commissionPercent / 100);


                    if (budget >= totalPrice) {
                        let agencyProfit = +agencyProfitElement
                            .text()
                            .split(': ')[1]
                            .split(' ')[0];


                        agencyProfit += (rentPrice * commissionPercent / 100) * 2;
                        agencyProfitElement.text(`Agency profit: ${agencyProfit} lv.`);

                        $('#message').text('Enjoy your new home! :))');

                        parent.children().remove();

                        let pForFamily = $('<p>')
                            .text(name)
                            .appendTo(parent);

                        let pForText = $('<p>')
                            .text('live here now')
                            .appendTo(parent);

                        let moveOutButton = $('<button>')
                            .text('MoveOut')
                            .appendTo(parent);

                        moveOutButton.on('click', function () {
                            parent.remove();

                            $('#message').text(`They had found cockroaches in ${name}'s apartment`);

                        });
                    }

                } else {
                    $('#message').text('We were unable to find you a home, so sorry :(');
                }
            }
        }

        budgetElement.val('');
        typeElement.val('');
        nameElement.val('');
    }
}