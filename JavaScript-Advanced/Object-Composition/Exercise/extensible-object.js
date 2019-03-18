function solve() {

    let myObj = {
        extend: function (template) {
            let entries = Object.entries(template);

            for (let [key, value] of entries) {
                if (typeof value === 'function') {
                    let prototype = Object.getPrototypeOf(myObj);

                    prototype[key] = value;
                } else {
                    this[key] = value;
                }
            }
        }
    };

    return myObj;
}

let test = solve();

test.extend({
    extensionMethod: function () {
    },
    extensionProperty: 'someString'
});

console.log(Object.getPrototypeOf(test));
console.log(test);
