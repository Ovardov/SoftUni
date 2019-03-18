function getInput(arr) {

    let myProcessor = (function processor() {
        let text = '';

        return {
            append: (string) => text += string,
            removeStart: (n) => text = text.substr(n),
            removeEnd: (n) => text = text.substring(0, text.length - n),
            print: () => console.log(text)
        };
    })();

    for (let token of arr) {
        let [command, value] = token.split(' ');
        myProcessor[command](value);
    }
}


getInput(['append hello', 'append again', 'removeStart 3', 'removeEnd 4', 'print']);