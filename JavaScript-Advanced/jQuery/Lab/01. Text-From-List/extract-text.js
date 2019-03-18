function extractText() {
    let result = $('li')
        .toArray()
        .map(x => x.textContent)
        .join(', ');

    $('#result').text(result);
}
