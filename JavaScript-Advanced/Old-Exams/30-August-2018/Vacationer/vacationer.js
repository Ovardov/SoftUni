class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        this.creditCard = creditCard;
        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(arr) {
        if (arr.length === 3) {
            let [firstName, middleName, lastName] = arr;

            let pattern = /^[A-Z][a-z]+$/g;

            if (firstName.match(pattern) && middleName.match(pattern) && lastName.match(pattern)) {
                this._fullName = {
                    firstName,
                    middleName,
                    lastName,
                }
            } else {
                throw Error('Invalid full name');
            }
        } else {
            throw Error('Name must include first name, middle name and last name');
        }
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(arr) {
        this.addCreditCardInfo(arr);
    }

    generateIDNumber() {
        let firstNameFirstLetterCode = this.fullName.firstName
            .charCodeAt(0);
        let middleNameLength = this.fullName.middleName
            .length;
        let lastNameLastLetter = this.fullName.lastName
            .slice(-1);


        let idNumber = (231 * firstNameFirstLetterCode) + (139 * middleNameLength);

        let vowels = ['a', 'e', 'o', 'i', 'u'];

        if (vowels.indexOf(lastNameLastLetter) !== -1) {
            idNumber += '8';
        } else {
            idNumber += '7';
        }

        return idNumber;
    }

    addCreditCardInfo(arr) {
        if (arr === undefined) {
            this._creditCard = {
                cardNumber: 1111,
                expirationDate: '',
                securityNumber: 111
            }
        } else {
            if (arr.length === 3) {
                let [cardNumber, expirationDate, securityNumber] = arr;

                if (typeof cardNumber === 'number' && typeof securityNumber === 'number') {
                    this._creditCard = {
                        cardNumber,
                        expirationDate,
                        securityNumber,
                    }
                } else {
                    throw Error('Invalid credit card details');
                }

            } else {
                throw Error('Missing credit card information');
            }
        }
    }

    addDestinationToWishList(destination) {
        if (this.wishList.indexOf(destination) === -1) {

            if (typeof destination === 'string') {
                this.wishList.push(destination);

                this.wishList
                    .sort((a, b) => a.length - b.length);
            }

        } else {
            throw Error('Destination already exists in wishlist');
        }
    }

    getVacationerInfo() {
        let output = '';

        output += `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n`;
        output += `ID Number: ${this.idNumber}\n`;
        output += `Wishlist:\n`;

        if (this.wishList.length === 0) {
            output += `empty\n`;
        } else {
            output += `${this.wishList.join(', ')}\n`;
        }

        output += 'Credit Card:\n';
        output += `Card Number: ${this.creditCard.cardNumber}\n`;
        output += `Expiration Date: ${this.creditCard.expirationDate}\n`;
        output += `Security Number: ${this.creditCard.securityNumber}`;

        return output;
    }
}


let test0 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777]);

console.log(typeof test0.generateIDNumber);
console.log(test0.creditCard);

test0.addDestinationToWishList('Bulgaria');
test0.addDestinationToWishList('Germany');

console.log(test0.wishList);
console.log(test0.getVacationerInfo());
