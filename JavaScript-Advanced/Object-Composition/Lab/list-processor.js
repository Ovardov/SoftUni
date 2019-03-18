function solve(arr) {

    let list = (function () {
        let words = [];

        function addElement(element) {
            words.push(element);
        }

        function removeElement(element) {
            while (words.includes(element)) {
                let index = words.indexOf(element);
                words.splice(index, 1);
            }
        }

        function printResult() {
            return words.join(',');
        }

        return {
            add: addElement,
            remove: removeElement,
            print: printResult
        }
    })();


    for (let token of arr) {
        let [command, element] = token.split(' ');

        if (command === 'add') {
            list.add(element);
        } else if (command === 'remove') {
            list.remove(element);
        } else if (command === 'print') {
            console.log(list.print());
        }
    }

}

solve(['add pesho', 'add gosho', 'add pesho', 'remove pesho', 'print']);