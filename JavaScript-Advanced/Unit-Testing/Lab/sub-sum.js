function sumRange(arr, startIndex, endIndex) {
    if (!Array.isArray(arr)) {
        return NaN;
    }

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex > endIndex.length - 1) {
        endIndex = endIndex.length - 1;
    }

    let sum = arr
        .map(Number)
        .slice(startIndex, endIndex + 1)
        .reduce((a, b) => a + b, 0);

    return sum;
}

console.log(sumRange([12, 25, 45, 2], 1, 3));