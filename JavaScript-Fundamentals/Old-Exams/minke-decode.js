function decodeText(arr) {
    let [startPoint, endPoint, replaceWord, text] = arr;
    startPoint = +startPoint;
    endPoint = +endPoint;

    let countryPattern = /[A-Z][a-zA-z]+[A-Z]/g;
    let numbersPattern = /[0-9]{3}\.?[0-9]*/g;

    let country = text.match(countryPattern)[0];

    country = country.substring(0, startPoint) + replaceWord + country.substring(endPoint + 1);
    country = country.substring(0, country.length - 1) + country[country.length - 1].toLowerCase();

    let numbers = [];

    while ((valid = numbersPattern.exec(text)) !== null) {
        valid[0] = Math.ceil(valid[0]);
        numbers.push(valid[0]);
    }

    let decodeTextFromNumbers = numbers
        .map(x => String.fromCharCode(x))
        .join('');

    decodeTextFromNumbers = decodeTextFromNumbers[0].toUpperCase() + decodeTextFromNumbers.substring(1);

    console.log(`${country} => ${decodeTextFromNumbers}`);
}

decodeText(["3", "5", "gar", "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]);