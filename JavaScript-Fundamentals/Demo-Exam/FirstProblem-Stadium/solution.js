function solve() {
    let levskiSeats = Array.from(document.querySelectorAll('.Levski .seat'));
    let litexSeats = Array.from(document.querySelectorAll('.Litex .seat'));
    let vipSeats = Array.from(document.querySelectorAll('.VIP .seat'));

    let resultArea = document.getElementById('output');
    let sectorSeats = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'A',
        4: 'B',
        5: 'C',
        6: 'A',
        7: 'B',
        8: 'C',
        9: 'A',
        10: 'B',
        11: 'C',
        12: 'A',
        13: 'B',
        14: 'C'
    };

    let levskiAndLitex = {
        'A': 10,
        'B': 7,
        'C': 5
    };

    let vip = {
        'A': 25,
        'B': 15,
        'C': 10
    };

    let money = 0;
    let fans = 0;

    levskiSeats
        .forEach(x => x.addEventListener('click', calculateLevski));
    litexSeats
        .forEach(x => x.addEventListener('click', calculateLitex));
    vipSeats
        .forEach(x => x.addEventListener('click', calculateVIP));

    let summaryButton = document.getElementById('summary');
    summaryButton.addEventListener('click', showMoneyAndFans);

    function calculateLevski(event) {
        let clickedSeat = event.target;
        let clickedSeatCurrentTD = clickedSeat.parentNode;

        let allTds = Array.from(document.querySelectorAll('.Levski td'));
        let index = allTds.indexOf(clickedSeatCurrentTD);
        let sector = sectorSeats[index];

        let seatNumber = clickedSeat.textContent;
        let team = 'Levski';


        if (clickedSeat.style.backgroundColor == 'rgb(255, 0, 0)') {
            resultArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} is unavailable.\n`;
        } else {
            clickedSeat.style.backgroundColor = 'rgb(255, 0, 0)';
            resultArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} was taken.\n`;
            money += levskiAndLitex[sector];
            fans++;
        }

    }

    function calculateLitex(event) {
        let clickedSeat = event.target;
        let clickedSeatCurrentTD = clickedSeat.parentNode;

        let allTds = Array.from(document.querySelectorAll('.Litex td'));
        let index = allTds.indexOf(clickedSeatCurrentTD);
        let sector = sectorSeats[index];

        let seatNumber = clickedSeat.textContent;
        let team = 'Litex';


        if (clickedSeat.style.backgroundColor == 'rgb(255, 0, 0)') {
            resultArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} is unavailable.\n`;
        } else {
            clickedSeat.style.backgroundColor = 'rgb(255, 0, 0)';
            resultArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} was taken.\n`;
            money += levskiAndLitex[sector];
            fans++;
        }
    }

    function calculateVIP(event) {
        let clickedSeat = event.target;
        let clickedSeatCurrentTD = clickedSeat.parentNode;

        let allTds = Array.from(document.querySelectorAll('.VIP td'));
        let index = allTds.indexOf(clickedSeatCurrentTD);
        let sector = sectorSeats[index];

        let seatNumber = clickedSeat.textContent;
        let zone = 'VIP';


        if (clickedSeat.style.backgroundColor == 'rgb(255, 0, 0)') {
            resultArea.value += ` Seat ${seatNumber} in zone ${zone} sector ${sector} is unavailable.\n`;
        } else {
            clickedSeat.style.backgroundColor = 'rgb(255, 0, 0)';
            resultArea.value += ` Seat ${seatNumber} in zone ${zone} sector ${sector} was taken.\n`;
            money += vip[sector];
            fans++;
        }
    }

    function showMoneyAndFans() {
        let spanElement = document.querySelector('#summary span');
        spanElement.textContent = `${money} leva, ${fans} fans.`
    }
}