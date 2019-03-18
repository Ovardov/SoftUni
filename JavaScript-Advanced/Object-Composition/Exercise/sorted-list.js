function solve() {
    let collection = (function () {
        let numbers = [];
        let size = 0;

        let add = function (element) {
            numbers.push(element);
            numbers.sort((a, b) => a - b);

            this.size++;
        };

        let remove = function (index) {
            if (index >= 0 && index < numbers.length) {
                numbers.splice(index, 1);
                this.size--;
            }
        };

        let get = function (index) {
            if (index >= 0 && index < numbers.length) {
                return numbers[index];
            }
        };

        return {
            add,
            remove,
            get,
            size
        }
    })();

    return collection;
}

let test = solve();
console.log(test);

test.add(5);
test.add(2);

test.remove(1);

test.size;

console.log(test.get(0));