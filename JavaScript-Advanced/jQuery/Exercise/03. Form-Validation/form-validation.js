function validate() {
    let submitButton = $('#submit');
    submitButton.click(submit);

    let isCompany = $('#company').change(isCompanyChecked);

    function submit(event) {
        event.preventDefault();

        let username = $('#username');
        usernameValidation(username);

        let password = $('#password');
        let confirmPassword = $('#confirm-password');

        passwordValidation(password, confirmPassword);

        let email = $('#email');
        emailValidation(email);

        if ($('#company').is(':checked')) {
            let companyNumberElement = $('#companyNumber');
            companyNumberValidation(companyNumberElement);
        }

        let incorrectFields = $('input')
            .toArray()
            .filter(f => f.style.borderColor === 'red')
            .length;

        if (incorrectFields > 0) {
            $('#valid').css('display', 'none')
        } else {
            $('#valid').show();
        }
    }


    function usernameValidation(username) {
        let usernamePattern = /^[A-Za-z0-9]{3,20}$/g;

        if (username.val().match(usernamePattern)) {
            username.css('border', 'none');
        } else {
            username.css('border-color', 'red');
        }
    }

    function passwordValidation(password, confirmPassword) {
        let pattern = /^[\w\d]{5,15}$/g;

        if (password.val().match(pattern) && confirmPassword.val().match(pattern) && password.val() === confirmPassword.val()) {
            password.css('border', 'none');
            confirmPassword.css('border', 'none');

        } else {
            password.css('border-color', 'red');
            confirmPassword.css('border-color', 'red');
        }
    }

    function emailValidation(email) {
        if (email.val().includes('@')) {
            let symbolsAfterAtSign = email.val()
                .slice(email.val().indexOf('@'));

            if (symbolsAfterAtSign.includes('.')) {
                email.css('border', 'none');
            } else {
                email.css('border-color', 'red');
            }
        } else {
            email.css('border-color', 'red');
        }
    }

    function isCompanyChecked() {
        if ($(this).is(':checked')) {
            $('#companyInfo').show();
        } else {
            $('#companyInfo').css('display', 'none')
        }
    }

    function companyNumberValidation(companyNumberElement) {
        let companyNumber = companyNumberElement.val();

        if (companyNumber >= 1000 && companyNumber <= 9999) {
            companyNumberElement.css('border', 'none');
        } else {
            companyNumberElement.css('border-color', 'red');
        }
    }
}


