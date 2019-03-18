function addAndRemoveElements(arr) {
    let startNumber = 0;
    let result = [];

    for (let command of arr) {
        startNumber++;

        if (command === 'add') {
            result.push(startNumber);
        } else if (command === 'remove') {
            result.pop();
        }
    }

    if (result.length === 0) {
        console.log('Empty');
    } else {
        result
            .forEach(x => console.log(x));
    }
}

addAndRemoveElements(['add', 'add', 'remove', 'add', 'add']);