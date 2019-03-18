function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    console.log(reversed);

    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

isSymmetric([1, 2, 3, 3, 2, 1]);

module.exports = isSymmetric;