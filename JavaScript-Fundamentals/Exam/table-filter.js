function solve(arr, command) {

    let header = arr.shift();
    command = command.split(' ');

    let printResult = element => console.log(element.join(' | '));

    if (command[0] === 'hide') {
        let findElementIndex = header.indexOf(command[1]);

        findElementIndex !== -1
            ? header.splice(findElementIndex, 1) && arr.map(x => x.splice(findElementIndex, 1))
            : '';

        printResult(header);
        arr.forEach(x => printResult(x));
    } else if (command[0] === 'sort') {
        let findElementIndex = header.indexOf(command[1]);

        findElementIndex !== -1
            ? arr.sort((a, b) => a[findElementIndex].localeCompare(b[findElementIndex]))
            : '';

        printResult(header);
        arr.forEach(x => printResult(x));
    } else if (command[0] === 'filter') {
        let findIndexInHeader = header.indexOf(command[1]);

        printResult(header);

        findIndexInHeader !== -1
            ? arr.forEach(x => x[findIndexInHeader] === command[2] ? printResult(x) : '')
            : '';
    }
}

solve(
    [
             ['name', 'age', 'grade'],
             ['Peter', '25', '5.00'],
             ['George', '34', '6.00'],
             ['Marry', '28', '5.49']

    ], 'hide age');