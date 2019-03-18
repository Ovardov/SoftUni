function displayInfo() {

    let info = {};

    for (let i = 0; i < arguments.length; i++) {
        let currentArgument = arguments[i];
        let typeOfCurrentArgument = typeof currentArgument;

        info.hasOwnProperty(typeOfCurrentArgument)
            ? info[typeOfCurrentArgument].push(currentArgument)
            : info[typeOfCurrentArgument] = [currentArgument];

        console.log(`${typeOfCurrentArgument}: ${currentArgument}`);
    }

    (function () {
        let sorted = Object.entries(info)
            .sort((a, b) => b[1].length - a[1].length);

        for (let [key, value] of sorted) {
            console.log(`${key} = ${value.length}`);
        }
    })();
}

displayInfo(42, 'cat', 15, 'kitten', 'tomcat');