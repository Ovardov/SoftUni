class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = shelfCapacity;
        this.shelf = [];

        return this;
    }


    set room(input) {
        if (input === 'livingRoom' || input === 'bedRoom' || input === 'closet') {
            this._room = input;
        } else {
            throw `"Cannot have book shelf in garden"`;
        }
    }

    get room() {
        return this._room;
    }

    addBook(bookName, bookAuthor, genre) {
        let book = {bookName, bookAuthor, genre};

        if (this.shelf.length < this.shelfCapacity) {
            this.shelf.push(book);
        } else {
            this.shelf.shift();
            this.shelf.push(book);
        }

        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));

        return this;
    }

    throwAwayBook(bookName) {
        this.shelf
            .forEach(x => {
                if (x.bookName === bookName) {
                    let index = this.shelf.indexOf(x);
                    this.shelf.splice(index, 1);
                }
            });

        return this;
    }

    showBooks(genre) {
        let output = `Results for search "${genre}":\n`;

        output += this.shelf
            .filter(x => x.genre === genre)
            .map(x => x = `\uD83D\uDCD6 ${x.bookAuthor} - "${x.bookName}"`)
            .join('\n');


        return output;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        if (this.shelf.length === 0) {
            return `It's an empty shelf`;
        } else {
            let output = `"${this.shelfGenre}" shelf in ${this.room} contains:\n`;

            output += this.shelf
                .map(x => x = `\uD83D\uDCD6 "${x.bookName}" - ${x.bookAuthor}`)
                .join('\n');

            return output;
        }
    }
}


let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");

console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
