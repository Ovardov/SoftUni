function rotate(arr) {
    let numberOfRotate = +arr.pop();

    for (let i = 0; i < numberOfRotate % arr.length; i++) {
        let lastElement = arr.pop();
        arr.unshift(lastElement);
    }

    console.log(arr.join(' '));
}

rotate(['Banana', 'Orange', 'Coconut', 'Apple', '15']);