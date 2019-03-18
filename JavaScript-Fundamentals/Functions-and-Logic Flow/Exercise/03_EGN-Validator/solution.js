function validate() {
    let weightArray = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let sum = 0;

    document.querySelector('#exercise div button')
        .addEventListener('click', getEGN);

    function getEGN() {
        let currentEGN = [];
        let yearElement = document.getElementById('year');
        let monthElement = document.getElementById('month');
        let dateElement = document.getElementById('date');
        let maleElement = document.getElementById('male');
        let femaleElement = document.getElementById('female');
        let regionalCodeElement = document.getElementById('region');

        let year = +yearElement.value.slice(2, 4);
        year = year < 10
            ? `0${year}`
            : `${year}`;

        currentEGN.push(year);

        let monthAsNumber = getNumberOfMonth(monthElement.options[monthElement.selectedIndex].value);
        monthAsNumber = monthAsNumber < 10
            ? `0${monthAsNumber}`
            : monthAsNumber;

        let dateAsNumber = dateElement.value < 10
            ? `0${dateElement.value}`
            : dateElement.value;

        currentEGN.push(monthAsNumber);
        currentEGN.push(dateAsNumber);

        let numberFromRegion = regionalCodeElement.value
            .slice(0, 2);

        currentEGN.push(numberFromRegion);

        let numberFromGender = 0;
        if (maleElement.checked === true) {
            numberFromGender = 2;
        } else if (femaleElement.checked === true) {
            numberFromGender = 1;
        }

        currentEGN.push(numberFromGender);

        let lastDigit = getLastDigit(weightArray, currentEGN.join(''));
        currentEGN.push(lastDigit);

        document.getElementById('egn').textContent = `Your EGN is: ${currentEGN.join('')}`;

        yearElement.value = '';
        dateElement.value = '';
        monthElement.selectedIndex = 0;
        maleElement.checked = false;
        femaleElement.checked = false;
        regionalCodeElement.value = '';
    }

    function getNumberOfMonth(month) {
        switch (month) {
            case 'January':
                return 1;
            case 'February':
                return 2;
            case 'March':
                return 3;
            case 'April':
                return 4;
            case 'May':
                return 5;
            case 'June':
                return 6;
            case 'July':
                return 7;
            case 'August':
                return 8;
            case 'September':
                return 9;
            case 'October':
                return 10;
            case 'November':
                return 11;
            case 'December':
                return 12;
        }
    }

    function getLastDigit(weightArray, currentEGN) {
        for (let i = 0; i < weightArray.length; i++) {
            sum += +weightArray[i] * +currentEGN[i];
            console.log(sum);
        }

        let remainder = sum % 11;

        if (remainder === 10) {
            remainder = 0;
        }

        return remainder;
    }

}