function sortArray(arr) {
    let result = arr
        .sort((a, b) => {
            return a.length - b.length || a.localeCompare(b);
        });

    result.forEach(x => console.log(x));
}

sortArray(['test', 'Deny', 'omen', 'Default']);