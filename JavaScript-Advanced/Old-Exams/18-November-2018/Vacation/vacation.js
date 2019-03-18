class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget >= this.budget) {

            if (this.kids.hasOwnProperty(grade)) {

                let isKidAlreadyInThisGrade = this.kids[grade]
                    .map(x => x.split('-')[0])
                    .filter(x => x === name);

                if (isKidAlreadyInThisGrade.length > 0) {
                    return `${name} is already in the list for this ${this.destination} vacation.`
                } else {
                    this.kids[grade].push(`${name}-${budget}`);
                }

            } else {
                this.kids[grade] = [`${name}-${budget}`];
            }

            return this.kids[grade];
        } else {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }
    }

    removeChild(name, grade) {

        if (this.kids.hasOwnProperty(grade)) {
            let kidsInThisGrade = this.kids[grade];

            for (let kid of kidsInThisGrade) {
                let kidName = kid.split('-')[0];

                let index = kidsInThisGrade.indexOf(kid);

                if (kidName === name) {
                    this.kids[grade].splice(index, 1);

                    return this.kids[grade];
                }
            }
        }

        return `We couldn't find ${name} in ${grade} grade.`
    }

    toString() {
        let kidsOnVacation = [];

        for (let [grade, kids] of Object.entries(this.kids)) {
            if (kids.length > 0) {
                kids.map(x => kidsOnVacation.push(x));
            }
        }

        if (kidsOnVacation.length === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`
        } else {
            let result = `${this.organizer} will take ${kidsOnVacation.length} children on trip to ${this.destination}\n`;

            let sortedByGrade = Object.entries(this.kids)
                .sort((a, b) => a[0].localeCompare(b[0]));

            for (let [grade, kids] of sortedByGrade) {
                result += `Grade: ${grade}\n`;

                for (let i = 0; i < kids.length; i++) {
                    result += `${i + 1}. ${kids[i]}\n`;
                }
            }
            return result;
        }
    }

    get numberOfChildren() {
        let numberOfKids = 0;

        for (let [grade, kids] of Object.entries(this.kids)) {

            numberOfKids += kids.length
        }

        return numberOfKids;
    }
}


let vacation = new Vacation('Miss. Elizabeth', 'The bahamas', 400);

vacation.registerChild('Gosho', 12, 3400);
vacation.registerChild('Pesho', 12, 400);
vacation.registerChild('Skaro', 11, 400);
vacation.registerChild('Gosho', 11, 3444);
vacation.removeChild('Gosho', 11);

let output = vacation.toString();

console.log(output);
console.log(vacation.numberOfChildren);
