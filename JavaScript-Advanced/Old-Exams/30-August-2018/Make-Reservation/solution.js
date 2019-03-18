function makeReservation(selector) {
    let submitButton = $('#submit');
    submitButton.on('click', submitForm);

    let editButton = $('#edit');

    let continueButton = $('#continue');
    continueButton.on('click', makePaymentView);


    let fullNameElement = $('#fullName');
    let emailElement = $('#email');
    let phoneNumberElement = $('#phoneNumber');
    let addressElement = $('#address');
    let postalCodeElement = $('#postalCode');

    function submitForm() {
        let fullName = fullNameElement.val();
        let email = emailElement.val();
        let phoneNumber = phoneNumberElement.val();
        let address = addressElement.val();
        let postalCode = postalCodeElement.val();

        if (fullName && email) {
            let ul = $('#infoPreview');

            let liForFullName = $('<li>')
                .text(`Name: ${fullName}`)
                .appendTo(ul);

            let liForEmail = $('<li>')
                .text(`E-mail: ${email}`)
                .appendTo(ul);

            let liForPhone = $('<li>')
                .text(`Phone: ${phoneNumber}`)
                .appendTo(ul);

            let liForAddress = $('<li>')
                .text(`Address: ${address}`)
                .appendTo(ul);

            let liForPostalCode = $('<li>')
                .text(`Postal Code: ${postalCode}`)
                .appendTo(ul);

            submitButton.prop('disabled', true);
            editButton.prop('disabled', false);
            continueButton.prop('disabled', false);

            clearForm();

            editButton.on('click', function () {
                fullNameElement.val(fullName);
                emailElement.val(email);
                phoneNumberElement.val(phoneNumber);
                addressElement.val(address);
                postalCodeElement.val(postalCode);

                $('#infoPreview').children().remove();

                submitButton.prop('disabled', false);
                editButton.prop('disabled', true);
                continueButton.prop('disabled', true);
            });
        }
    }

    function clearForm() {
        fullNameElement.val('');
        emailElement.val('');
        phoneNumberElement.val('');
        addressElement.val('');
        postalCodeElement.val('');
    }

    function makePaymentView() {
        submitButton.prop('disabled', true);
        editButton.prop('disabled', true);
        continueButton.prop('disabled', true);

        let div = $(selector);

        let h2 = $('<h2>')
            .text('Payment details')
            .appendTo(div);

        let selectOption = $('<select>')
            .attr('id', 'paymentOptions')
            .addClass('custom-select');

        $('<option selected="" disabled="" hidden="">Choose</option>').appendTo(selectOption);


        let optionForCreditCard = $('<option>')
            .val('creditCard')
            .text('Credit Card')
            .appendTo(selectOption);


        let optionForBankTransfer = $('<option>')
            .val('bankTransfer')
            .text('Bank Transfer')
            .appendTo(selectOption);

        let extraDetails = $('<div>').attr('id', 'extraDetails');

        div.append(selectOption);
        div.append(extraDetails);

        selectOption.change(makePayment);
    }

    function makePayment() {
        let selectedOption = $('#paymentOptions option:selected').val();

        let extraDetails = $('#extraDetails');
        extraDetails.empty();

        let checkOutButton = $('<button>')
            .attr('id', 'checkOut')
            .text('Check Out');

        checkOutButton.on('click', checkOut);


        if (selectedOption === 'creditCard') {

            let divForCardNumber = $('<div>')
                .addClass('inputLabel')
                .text('Card Number')
                .append($('<input>'))
                .appendTo(extraDetails);

            extraDetails.append($('<br>'));

            let divForDate = $('<div>')
                .addClass('inputLabel')
                .text('Expiration Date')
                .append($('<input>'))
                .appendTo(extraDetails);

            extraDetails.append($('<br>'));

            let divForSecurity = $('<div>')
                .addClass('inputLabel')
                .text('Security Numbers')
                .append($('<input>'))
                .appendTo(extraDetails);

            extraDetails.append($('<br>'));

            extraDetails.append(checkOutButton);
        } else if (selectedOption === 'bankTransfer') {

            let p = $('<p>')
                .html('You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890')
                .appendTo(extraDetails);

            extraDetails.append(checkOutButton);
        }
    }

    function checkOut() {
        let wrapper = $('#wrapper');

        wrapper.empty();

        let h4 = $('<h4>')
            .text('Thank you for your reservation!')
            .appendTo(wrapper);
    }
}