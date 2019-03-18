function subtract() {
    let firstNumber = Number($('#firstNumber').val());
    let secondNumber = Number($('#secondNumber').val());

    let result = firstNumber - secondNumber;

    $('#result').text(result);
}
