class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
        this.resultString = innerString;
    }

    decrease(number) {
        if (this.innerLength - number < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength -= number;
        }

        if (this.resultString.length > this.innerLength) {
            if (this.innerLength === 0) {
                this.resultString = '';
            } else {
                let difference = this.resultString.length - this.innerLength;
                this.resultString = this.resultString.substr(0, difference);
            }
        }
    }

    increase(number) {
        this.innerLength += number;

        this.resultString = this.innerString.slice(0, this.innerLength);


    }

    toString() {
        if (this.resultString.length < this.innerString.length) {
            return `${this.resultString}${'.'.repeat(3)}`;
        } else {
            return this.innerString;
        }
    }
}


let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(5);
console.log(test.toString()); //Test



