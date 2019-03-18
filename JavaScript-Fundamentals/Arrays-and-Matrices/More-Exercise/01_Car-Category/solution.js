function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);

    let bulgarianArmyRegex = /^BA [0-9]{3} [0-9]{3}$/g;
    let civilProtectionRegex = /^CP [0-9]{2} [0-9]{3}$/g;
    let diplomaticRegex = /^(C|CT) [0-9]{4}$/g;
    let foreignersRegex = /^XX [0-9]{4}$/g;
    let transientRegex = /^[0-9]{3} [A-Z] [0-9]{3}$/g;
    let sofiaRegex = /^(CA|C|CB) [0-9]{4} [A-Z]{1,2}$/g;
    let provinceRegex = /^[A-Z]{1,2} [0-9]{4} [A-Z]{1,2}$/g;

    let cars = {};

    for (let token of inputArray) {
        token = token.toUpperCase();

        if (token.match(bulgarianArmyRegex)) {
            if (!cars.hasOwnProperty('BulgarianArmy')) {
                cars['BulgarianArmy'] = 1;
            } else {
                cars['BulgarianArmy'] += 1;
            }
        } else if (token.match(civilProtectionRegex)) {
            if (!cars.hasOwnProperty('CivilProtection')) {
                cars['CivilProtection'] = 1;
            } else {
                cars['CivilProtection'] += 1;
            }
        } else if (token.match(diplomaticRegex)) {
            if (!cars.hasOwnProperty('Diplomatic')) {
                cars['Diplomatic'] = 1;
            } else {
                cars['Diplomatic'] += 1;
            }
        } else if (token.match(foreignersRegex)) {
            if (!cars.hasOwnProperty('Foreigners')) {
                cars['Foreigners'] = 1;
            } else {
                cars['Foreigners'] += 1;
            }
        } else if (token.match(transientRegex)) {
            if (!cars.hasOwnProperty('Transient')) {
                cars['Transient'] = 1;
            } else {
                cars['Transient'] += 1;
            }
        } else if (token.match(sofiaRegex)) {
            if (!cars.hasOwnProperty('Sofia')) {
                cars['Sofia'] = 1;
            } else {
                cars['Sofia'] += 1;
            }
        } else if (token.match(provinceRegex)) {
            if (!cars.hasOwnProperty('Province')) {
                cars['Province'] = 1;
            } else {
                cars['Province'] += 1;
            }
        } else {
            if (!cars.hasOwnProperty('Other')) {
                cars['Other'] = 1;
            } else {
                cars['Other'] += 1;
            }
        }
    }

    let sorted = Object.entries(cars)
        .sort((a, b) => {
            return b[1] - a[1] || a[0].localeCompare(b[0]);
        });

    let resultElement = document.getElementById('result');

    for (let [key, value] of sorted) {
        let pElement = document.createElement('p');
        pElement.textContent = `${key} -> ${value}`;
        resultElement.appendChild(pElement);
    }
}