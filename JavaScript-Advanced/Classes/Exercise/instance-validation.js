class checkingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(input) {
        if (Number.isInteger(+input) && input.length === 6) {
            this._clientId = input;
        } else {
            throw new TypeError('Client ID must be a 6-digit number');
        }
    }

    get email() {
        return this._email;
    }

    set email(input) {
        if (input.match(/^[0-9a-z]+@[a-z\.]+$/)) {
            this._email = input;
        } else {
            throw new TypeError('Invalid e-mail');
        }
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(input) {
        if (input.match(/^[a-zA-z]{3,20}$/)) {
            this._firstName = input;
        } else if (!input.match(/^[a-zA-z]+$/) && input.length >= 3 && input.length <= 20) {
            throw new TypeError('First name must contain only Latin characters');
        } else if (input.match(/^[a-zA-z]+$/) && !(input.length >= 3 && input.length <= 20)) {
            throw new TypeError('First name must be between 3 and 20 characters long')
        }
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(input) {
        if (input.match(/^[a-zA-z]{3,20}$/)) {
            this._lastName = input;
        } else if (!input.match(/^[a-zA-z]+$/) && input.length >= 3 && input.length <= 20) {
            throw new TypeError('Last name must contain only Latin characters');
        } else if (input.match(/^[a-zA-z]+$/) && !(input.length >= 3 && input.length <= 20)) {
            throw new TypeError('Last name must be between 3 and 20 characters long')
        }
    }
}

let test = new checkingAccount('266565', 'ivan@abv.bg', 'Ivan', 'Petrov');
console.log(test.firstName);

