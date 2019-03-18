function printEveryNthElement(arr) {
    let step = +arr.pop();

    for (let i = 0; i < arr.length; i += step) {
        console.log(arr[i]);
    }
}

printEveryNthElement(['5', '20', '31', '4', '20', '2']);