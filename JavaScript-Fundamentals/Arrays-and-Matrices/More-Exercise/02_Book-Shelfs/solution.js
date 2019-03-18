function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);

    let library = {};

    for (let token of inputArray) {

        // if input is shelf
        if (token.includes('->')) {
            let [shelfId, shelfGenre] = token.split(' -> ');

            if (!library.hasOwnProperty(shelfId)) {
                library[shelfId] = {[shelfGenre]: []};
            }

            // if input is book
        } else if (token.includes(':')) {
            let [bookTitleAndAuthor, bookGenre] = token.split(', ');

            // get nested object {genre: books}
            for (let genreWithBooks of Object.values(library)) {

                if (genreWithBooks.hasOwnProperty(bookGenre)) {
                    let booksArray = genreWithBooks[bookGenre];

                    booksArray.push(bookTitleAndAuthor);
                }
            }
        }
    }

    let sorted = Object.entries(library)
        .sort((a, b) => Object.entries(b[1])[0][1].length - Object.entries(a[1])[0][1].length);


    let resultElement = document.getElementById('result');

    for (let [id, genreWithBooks] of sorted) {

        for (let [genre, books] of Object.entries(genreWithBooks)) {
            let pElement = document.createElement('p');

            let sortedBooks = books
                .sort();

            pElement.textContent = `${id} ${genre}: ${books.length}`;
            resultElement.appendChild(pElement);

            for (let currentBook of sortedBooks) {
                let pElement = document.createElement('p');

                pElement.textContent += `--> ${currentBook}`;
                resultElement.appendChild(pElement);
            }
        }
    }
}