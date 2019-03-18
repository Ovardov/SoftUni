(function () {

    String.prototype.ensureStart = function (string) {
        if (this.startsWith(string)) {
            return this.toString();
        } else {
            return `${string}${this}`;

        }

    };

    String.prototype.ensureEnd = function (string) {
        if (this.endsWith(string)) {
            return this.toString();
        }

        return `${this}${string}`;
    };

    String.prototype.isEmpty = function () {
        return this.toString() === '';
    };

    String.prototype.truncate = function (number) {
        if (number < 4) {
            return `${'.'.repeat(number)}`;
        } else {
            if (number >= this.toString().length) {
                return this.toString();
            } else {
                let lastSpaceIndex = this.toString()
                    .substring(0, number - 1)
                    .lastIndexOf(' ');

                if (lastSpaceIndex === -1) {
                    return `${this.toString().substring(0, number - 3)}...`;
                } else {
                    let text = this.toString().substring(0, lastSpaceIndex);
                    let countOfEllipsis = 0;

                    if (number - text.length > 3) {
                        countOfEllipsis = 3;
                    } else {
                        countOfEllipsis = number - text.length;
                    }

                    return `${text}${'.'.repeat(countOfEllipsis)}`
                }
            }
        }
    };

    String.format = function (text, ...args) {
        let pattern = /{[0-9]}/g;

        while ((valid = pattern.exec(text)) !== null) {
            let index = text.indexOf(valid[0]);

            if (args.length > 0) {
                let wordToReplaced = args.shift();

                text = text.replace(valid[0], wordToReplaced);
            }
        }

        return text;
    };

})();


let testString = 'the quick brown fox jumps over the lazy dog';

console.log(testString.truncate(10));
console.log(testString.truncate(12));