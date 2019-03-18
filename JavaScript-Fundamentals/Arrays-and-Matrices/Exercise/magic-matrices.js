function findMagicMatrices(arr) {
    let rowSum = 0;

    for (let row = 0; row < arr.length; row++) {
        let currentRowSum = 0;

        for (let col = 0; col < arr[row].length; col++) {
            currentRowSum += +arr[row][col];
        }

        if (row === 0) {
            rowSum = currentRowSum;
        } else if (rowSum !== currentRowSum) {
            console.log(false);
            return;
        }
    }

    for (let col = 0; col < arr[0].length; col++) {
        let currentColSum = 0;

        for (let row = 0; row < arr.length; row++) {
            currentColSum += arr[row][col];
        }

        if (rowSum !== currentColSum) {
            console.log(false);
            return;
        }
    }

    console.log(true);
}

findMagicMatrices(
    [
        [4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]
    ]);