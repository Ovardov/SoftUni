class List {
    constructor() {
        this.size = 0;
        this.elements = [];
    }

    add(inputElement) {
        this.elements.push(inputElement);
        this.elements.sort((a, b) => a - b);

        this.size++;
    }

    remove(inputIndex) {
        if (inputIndex >= 0 && inputIndex < this.size) {
            this.elements.splice(inputIndex, 1);
            this.size--;
        }
    }

    get(inputIndex) {
        if (inputIndex >= 0 && inputIndex < this.size) {
            return this.elements[inputIndex];
        } else {
            throw new Error('Input index can not be outside the collection');
        }
    }
}


let myList = new List();

myList.add(5);
myList.add(5);
myList.add(3);
myList.remove(1);

console.log(myList.get(2));