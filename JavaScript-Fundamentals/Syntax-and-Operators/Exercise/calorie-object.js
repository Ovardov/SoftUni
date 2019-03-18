function calculateCalories(arr) {
    let store = {};

    for (let i = 0; i < arr.length; i += 2) {
        let fruit = arr[i];
        let calories = +arr[i + 1];
        store[fruit] = calories;
    }

    console.log(store);
}

calculateCalories(['Yoghurt', 48, 'Rise', 138, 'Apple', 52]);