function countWords(arr) {
    let words = {};
    let pattern = /[A-Za-z0-9_]+/gi;

    for (let token of arr) {
        let allCurrentWords = token
            .match(pattern)
            .map(x => x.toLowerCase());

        for (let currentWord of allCurrentWords) {

            if (words.hasOwnProperty(currentWord)) {
                words[currentWord] += 1;
            } else {
                words[currentWord] = 1;
            }
        }
    }

    let sorted = Object.entries(words)
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (let [word, count] of sorted) {
        console.log(`'${word}' -> ${count} times`);
    }
}

countWords(['JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --']);