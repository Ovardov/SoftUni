function solve(arr) {
    let arena = {};

    for (let token of arr) {
        if (token.includes('->')) {
            addGladiators(token);
        } else if (token.includes('vs')) {
            makeDuel(token);
        } else if (token === 'Ave Cesar') {
            printResult();
            return;
        }
    }

    function addGladiators(token) {
        let [gladiator, technique, skill] = token.split(' -> ');
        skill = +skill;

        if (arena.hasOwnProperty(gladiator)) {

            if (arena[gladiator].hasOwnProperty(technique)) {
                let oldSkill = arena[gladiator][technique];

                if (oldSkill < skill) {
                    arena[gladiator][technique] = skill;
                }

            } else {
                arena[gladiator][technique] = skill;
            }

        } else {
            arena[gladiator] = {[technique]: skill};
        }
    }

    function makeDuel(token) {
        let [firstGladiator, secondGladiator] = token.split(' vs ');

        if (arena.hasOwnProperty(firstGladiator) && arena.hasOwnProperty(secondGladiator)) {
            let firstGladiatorAllTechniques = Object.keys(arena[firstGladiator]);
            let secondGladiatorAllTechniques = Object.keys(arena[secondGladiator]);

            let equalTechniques = firstGladiatorAllTechniques
                .filter(x => secondGladiatorAllTechniques.includes(x));

            if (equalTechniques.length > 0) {
                let fistGladiatorTotalSkills = Object.values(arena[firstGladiator])
                    .reduce((a, b) => a + b, 0);
                let secondGladiatorTotalSkills = Object.values(arena[secondGladiator])
                    .reduce((a, b) => a + b, 0);

                if (fistGladiatorTotalSkills > secondGladiatorTotalSkills) {
                    delete arena[secondGladiator];
                } else if (fistGladiatorTotalSkills < secondGladiatorTotalSkills) {
                    delete arena[firstGladiator];
                }
            }
        }
    }

    function makeFirstSort(a, b) {
        let firstGladiatorTotalSkill = Object.values(a[1])
            .reduce((a, b) => a + b, 0);

        let secondGladiatorTotalSkill = Object.values(b[1])
            .reduce((a, b) => a + b, 0);

        return secondGladiatorTotalSkill - firstGladiatorTotalSkill || a[0].localeCompare(b[0]);
    }

    function makeSecondSort(a, b) {
        return b[1] - a[1] || a[0].localeCompare(b[0]);
    }

    function printResult() {
        let sortedByTotalSkillAndGladiatorNames = Object.entries(arena)
            .sort(makeFirstSort);


        for (let [gladiator, techniqueAndSkills] of sortedByTotalSkillAndGladiatorNames) {
            let sortedByTechniquesAndSkills = Object.entries(techniqueAndSkills)
                .sort(makeSecondSort);

            let totalSkill = Object.values(techniqueAndSkills)
                .reduce((a, b) => a + b, 0);

            console.log(`${gladiator}: ${totalSkill} skill`);

            for (let [technique, skill] of sortedByTechniquesAndSkills) {
                console.log(`- ${technique} <!> ${skill}`);
            }

        }
    }
}

solve(
    ['Pesho -> Duck -> 200',
        'Julius -> Shield -> 150',
        'Gladius -> Heal -> 200',
        'Gladius -> Support -> 250',
        'Gladius -> Shield -> 250',
        'Pesho vs Gladius',
        'Gladius vs Julius',
        'Gladius vs Gosho',
        'Ave Cesar']);