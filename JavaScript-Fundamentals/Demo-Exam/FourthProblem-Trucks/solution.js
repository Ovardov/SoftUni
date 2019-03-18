function solve() {
    let outputElement = document.getElementsByTagName('textarea')[0];

    let newTruckButton = document.getElementsByTagName('button')[0];
    newTruckButton.addEventListener('click', addTruck);

    let newTiresButton = document.getElementsByTagName('button')[1];
    newTiresButton.addEventListener('click', addNewTires);

    let workButton = document.getElementsByTagName('button')[2];
    workButton.addEventListener('click', calculateWork);

    let endOfTheShiftButton = document.getElementsByTagName('button')[3];
    endOfTheShiftButton.addEventListener('click', showResult);


    let trucks = {};
    let trucksElement = document.querySelector('#exercise section:nth-child(2) > fieldset:nth-child(2)');

    let spareTiresElement = document.querySelector('#exercise section:nth-child(2) > fieldset');
    let spareTires = [];


    function addTruck() {
        let plateNumberInput = document.getElementById('newTruckPlateNumber').value;
        let tiresConditionInput = document.getElementById('newTruckTiresCondition').value;

        if (!trucks.hasOwnProperty(plateNumberInput)) {
            trucks[plateNumberInput] = {tires: tiresConditionInput, distance: 0};
        }

        let divElement = document.createElement('div');

        divElement.setAttribute('class', 'truck');
        divElement.textContent = plateNumberInput;
        trucksElement.appendChild(divElement);
    }

    function addNewTires() {
        let newTiresInput = document.getElementById('newTiresCondition').value;
        let divElement = document.createElement('div');

        spareTires.push([newTiresInput]);

        divElement.setAttribute('class', 'tireSet');
        divElement.textContent = newTiresInput;
        spareTiresElement.appendChild(divElement);
    }

    function calculateWork() {
        let inputPlateNumber = document.getElementById('workPlateNumber').value;
        let inputDistance = Number(document.getElementById('distance').value);

        if (trucks.hasOwnProperty(inputPlateNumber)) {
            let tiresCondition = trucks[inputPlateNumber].tires.split(' ');

            let neededCondition = Math.ceil(inputDistance / 1000);

            tiresCondition = tiresCondition
                .map(x => x - neededCondition)
                .filter(f => f >= 0);

            if (tiresCondition.length === 8) {
                trucks[inputPlateNumber].distance += inputDistance;

                tiresCondition = tiresCondition.join(' ');
                trucks[inputPlateNumber].tires = tiresCondition;


            } else {

                // if we have spare tires
                if (spareTires.length > 0) {
                    let newTires = spareTires
                        .shift()[0];

                    let allTiresElement = Array.from(document.querySelectorAll('#exercise section:nth-child(2) > fieldset div'));

                    for (let currentTires of allTiresElement) {
                        if (currentTires.textContent === newTires) {
                            currentTires.parentNode.removeChild(currentTires);
                        }
                    }

                    trucks[inputPlateNumber].tires = newTires;

                    let tiresCondition = trucks[inputPlateNumber].tires.split(' ');

                    tiresCondition = tiresCondition
                        .map(x => x - neededCondition)
                        .filter(f => f >= 0);

                    if (tiresCondition.length === 8) {
                        trucks[inputPlateNumber].distance += inputDistance;

                        tiresCondition = tiresCondition.join(' ');
                        trucks[inputPlateNumber].tires = tiresCondition;
                    }
                }
            }
        }
    }

    function showResult() {
        for (let [plate, tiresAndDistance] of Object.entries(trucks)) {
            let distance = tiresAndDistance.distance;

            outputElement.value += `Truck ${plate} has traveled ${distance}.\n`;
        }

        outputElement.value += `You have ${spareTires.length} sets of tires left.\n`;
    }
}