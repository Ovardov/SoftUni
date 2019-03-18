function sortArray(inputArray, method) {

    let ascendingComparator = (a, b) => a - b;
    let descendingComparator = (a, b) => b - a;

    let sortMethods = {
        'asc': ascendingComparator,
        'desc': descendingComparator
    };
    
    return inputArray.sort(sortMethods[method]);
}

sortArray([14, 7, 17, 6, 8], 'asc');