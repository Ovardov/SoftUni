function calculatePoints(arr) {
    let race = {};

    let usedPilot = [];
    for (let token of arr) {
        let [team, pilot, points] = token.split(' -> ');
        points = Number(points);

        // pilot is not play the race;
        if (race.hasOwnProperty(team)) {

            if (race[team].hasOwnProperty(pilot)) {
                race[team][pilot] += points;
            } else {
                if (usedPilot.indexOf(pilot) === -1) {
                    race[team][pilot] = points;
                    usedPilot.push(pilot);
                }
            }

        } else {
            if (usedPilot.indexOf(pilot) === -1) {
                race[team] = {[pilot]: points};
                usedPilot.push(pilot);
            }
        }
    }

    let sorted = Object.entries(race)
        .sort(sortedByTotalPoints);

    // get top 3 teams
    sorted = sorted.slice(0, 3);

    for (let [team, pilotAndPoints] of sorted) {
        let teamPoints = Object.values(pilotAndPoints)
            .reduce((a, b) => a + b, 0);

        console.log(`${team}: ${teamPoints}`);

        let sortedByPilotPoints = Object.entries(pilotAndPoints)
            .sort((a, b) => b[1] - a[1])

        for (let [pilot, points] of sortedByPilotPoints) {
            console.log(`-- ${pilot} -> ${points}`);
        }

    }

    function sortedByTotalPoints(a, b) {
        let firstTeam = Object.values(a[1])
            .reduce((a, b) => a + b, 0);

        let secondTeam = Object.values(b[1])
            .reduce((a, b) => a + b, 0);

        return secondTeam - firstTeam;
    }
}

calculatePoints(
    ['Ferrari -> Kimi Raikonnen -> 25',
        'Ferrari -> Sebastian Vettel -> 18',
        'Mercedes -> Lewis Hamilton -> 10',
        'Mercedes -> Valteri Bottas -> 8',
        'Red Bull -> Max Verstapen -> 6',
        'Red Bull -> Daniel Ricciardo -> 4',
        'Mercedes -> Lewis Hamilton -> 25',
        'Mercedes -> Valteri Bottas -> 18',
        'Haas -> Lewis Hamilton -> 25',
        'Haas -> Kevin Magnussen -> 25']);