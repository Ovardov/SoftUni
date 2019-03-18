function aggregate(arr) {
    let sum = arr.reduce((a, b) => a + b, 0);
    console.log(`Sum = ${sum}`);

    let minNumber = Math.min(...arr);
    console.log(`Min = ${minNumber}`);

    let maxNumber = Math.max(...arr);
    console.log(`Max = ${maxNumber}`);

    let product = arr.reduce((a, b) => a * b, 1);
    console.log(`Product = ${product}`);

    let joinedElements = arr.join('');
    console.log(`Join = ${joinedElements}`);
}

aggregate([2, 3, 10, 5]);