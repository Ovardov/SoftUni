function generatesMatrix(numberOfRows, numberOfCols) {
    let matrix = [];

    for (let row = 0; row < numberOfRows; row++) {
        matrix[row] = [];
        for (let col = 0; col < numberOfCols; col++) {
            matrix[row][col] = 0;
        }
    }

    let counter = 1;
    let direction = 'right';
    let currentRow = 0;
    let currentCol = 0;

    for (let i = 0; i < numberOfRows * numberOfCols; i++) {
        matrix[currentRow][currentCol] = counter;

        if (direction === 'right') {
            if (currentCol + 1 >= numberOfCols || matrix[currentRow][currentCol + 1] !== 0) {
                direction = 'down';
                currentRow++;
            } else {
                currentCol++;
            }
        } else if (direction === 'down') {
            if (currentRow + 1 >= numberOfRows || matrix[currentRow + 1][currentCol] !== 0) {
                direction = 'left';
                currentCol--;
            } else {
                currentRow++;
            }
        } else if (direction === 'left') {
            if (currentCol - 1 < 0 || matrix[currentRow][currentCol - 1] !== 0) {
                direction = 'up';
                currentRow--;
            } else {
                currentCol--;
            }
        } else if (direction === 'up') {
            if (currentRow - 1 < 0 || matrix[currentRow - 1][currentCol] !== 0) {
                direction = 'right';
                currentCol++;
            } else {
                currentRow--;
            }
        }

        counter++;
    }

    for (let row of matrix) {
        console.log(row.join(' '));
    }
}

generatesMatrix(3, 3);