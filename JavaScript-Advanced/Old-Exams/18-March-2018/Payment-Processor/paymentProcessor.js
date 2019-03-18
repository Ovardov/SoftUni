class PaymentProcessor {
    constructor(options) {
        this.options = options;
        this.collection = {};
    }

    get options() {
        return this._options;
    }

    set options(inputObject) {
        if (inputObject === undefined) {
            this._options = {
                types: ["service", "product", "other"],
                precision: 2
            }
        } else {
            this._options = inputObject;

            if (!inputObject.hasOwnProperty('types')) {
                this._options.types = ["service", "product", "other"];
            } else if (!inputObject.hasOwnProperty('precision')) {
                this._options.precision = 2;
            }
        }
    }

    setOptions(inputObject) {
        if (inputObject.hasOwnProperty('types') && !inputObject.hasOwnProperty('precision')) {
            this.options.types = inputObject.types;
        } else if (inputObject.hasOwnProperty('precision') && !inputObject.hasOwnProperty('types')) {
            this.options.precision = inputObject.precision;
        } else {
            this.options.types = inputObject.types;
            this.options.precision = inputObject.precision;
        }
    }


    get(id) {
        if (this.collection.hasOwnProperty(id)) {
            let output = '';

            output += `Details about payment ID: ${id}\n`;
            output += `- Name: ${this.collection[id].name}\n`;
            output += `- Type: ${this.collection[id].type}\n`;
            output += `- Value: ${this.collection[id].value}`;

            return output;
        } else {
            throw Error('ID not found');
        }
    }


    registerPayment(id, name, type, value) {
        let idValidation = id !== '';
        let nameValidation = name !== '';
        let typeValidation = this.options.types.includes(type);
        let valueValidation = typeof value === 'number';

        if (!idValidation) {
            throw Error('invalid id');
        } else if (!nameValidation) {
            throw Error('invalid name')
        } else if (!typeValidation) {
            throw Error('invalid type');
        } else if (!valueValidation) {
            throw Error('invalid value');
        } else {
            if (this.collection.hasOwnProperty(id)) {
                throw Error('Adding duplicate ID');

            } else {
                value = value.toFixed(this.options.precision);

                this.collection[id] = {
                    name,
                    type,
                    value
                }
            }
        }
    }

    deletePayment(id) {
        if (this.collection.hasOwnProperty(id)) {
            delete this.collection[id];
        } else {
            throw Error('ID not found');
        }
    }

    toString() {
        let output = 'Summary:\n';
        output += `- Payments: ${Object.keys(this.collection).length}\n`;

        let balance = Object.values(this.collection)
            .map(x => x.value)
            .reduce((a, b) => Number(a) + Number(b), 0);


        output += `- Balance: ${balance.toFixed(this.options.precision)}`;

        return output;

    }
}

const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);

console.log(generalPayments.toString());

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));

generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());
