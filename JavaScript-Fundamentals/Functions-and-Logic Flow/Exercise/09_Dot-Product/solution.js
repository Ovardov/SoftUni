function solve() {
    let firstMatrixAsString = document.getElementById('mat1').value;
    let firstMatrix = JSON.parse(firstMatrixAsString);
    let secondMatrixAsString = document.getElementById('mat2').value;
    let secondMatrix = JSON.parse(secondMatrixAsString);
    let resultElement = document.getElementById('result');

    firstMatrix
        .forEach(currentArrayFromFirstMatrix => {
            let result = [];

            secondMatrix
                .forEach(currentArrayFromSecondMatrix => {
                    let sum = 0;
                    for (let i = 0; i < currentArrayFromFirstMatrix.length; i++) {
                        sum += Number(currentArrayFromFirstMatrix[i]) * Number(currentArrayFromSecondMatrix[i]);
                    }

                    result.push(sum);
                });

            let pElement = document.createElement('p');
            pElement.textContent = result.join(', ');
            resultElement.appendChild(pElement);
        });
}