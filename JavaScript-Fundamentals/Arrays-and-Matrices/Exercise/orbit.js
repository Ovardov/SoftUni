function buildOrbits(arr) {
    let [width, height, startRow, startCol] = arr;

    let matrix = [];

    for (let row = 0; row < height; row++) {
        matrix[row] = [];

        for (let col = 0; col < width; col++) {
            matrix[row][col] = Math.max(Math.abs(row - startRow), Math.abs(col - startCol)) + 1;
        }
    }

    for (let row of matrix) {
        console.log(row.join(' '));
    }
}

buildOrbits([4, 4, 0, 0]);