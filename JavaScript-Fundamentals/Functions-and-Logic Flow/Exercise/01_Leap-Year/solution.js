function leapYear() {

    let button = document.querySelector('button')
        .addEventListener('click', checkTheYear);

    function checkTheYear() {
        let yearElement = document.querySelector('#exercise input');
        let isLeap = leapYear(+yearElement.value);

        let h2Element = document.querySelector('#year h2');

        if (isLeap === true) {
            h2Element.textContent = 'Leap Year';
        } else {
            h2Element.textContent = 'Not Leap Year';
        }

        let divContainer = document.querySelector('#year div');
        divContainer.textContent = yearElement.value;

        yearElement.value = '';
    }

    function leapYear(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }
}