function printArray(arr) {
    let givenDelimiter = arr.pop();

    let result = arr.join(givenDelimiter);
    console.log(result);
}

printArray(['One', 'Two', 'Three', 'Four', 'Five', '-']);