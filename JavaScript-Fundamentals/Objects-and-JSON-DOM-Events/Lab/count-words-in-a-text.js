function countWords(arr) {
    let words = {};
    let pattern = /[A-Za-z0-9_]+/g;

    for (let text of arr) {
        let allCurrentWords = text.match(pattern);

        for (let currentWord of allCurrentWords) {

            if (words.hasOwnProperty(currentWord)) {
                words[currentWord] += 1;
            } else {
                words[currentWord] = 1;
            }
        }
    }

    console.log(JSON.stringify(words));
}

countWords(['JS devs use Node.js for server-side JS.-- JS for devs']);