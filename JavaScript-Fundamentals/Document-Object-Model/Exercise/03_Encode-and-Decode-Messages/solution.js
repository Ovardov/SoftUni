function solve() {
    let buttons = document.getElementsByTagName('button');
    let textAreas = document.getElementsByTagName('textarea');

    buttons[0].addEventListener('click', encode);
    buttons[1].addEventListener('click', decode);

    function encode(event) {
        let encodeMessage = textAreas[0].value;
        let newMessage = '';

        newMessage = encodeMessage
            .split('')
            .map(letter => String.fromCharCode(letter.charCodeAt(0) + 1))
            .join('');

        textAreas[1].value = newMessage;
        textAreas[0].value = '';
    }

    function decode(event) {
        let decodeMessage = textAreas[1].value;
        let newMessage = '';

        newMessage = decodeMessage
            .split('')
            .map(letter => String.fromCharCode(letter.charCodeAt(0) - 1))
            .join('');

        textAreas[1].value = newMessage;
    }
}