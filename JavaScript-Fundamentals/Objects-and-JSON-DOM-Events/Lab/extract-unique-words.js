function extractUniqueWords(arr) {
    let words = [];

    for (let text of arr) {
        text
            .split(/[\s,.]+/)
            .filter(f => f !== '')
            .map(x => x = x.toLowerCase())
            .map(currentWord => !(words.includes(currentWord)) ? words.push(currentWord) : '');

    }

    console.log(words.join(', '));
}

extractUniqueWords(
    ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Pellentesque quis hendrerit dui.',
        'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
        'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
        'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
        'Morbi in ipsum varius, pharetra diam vel, mattis arcu. Integer ac turpis commodo, varius nulla sed, elementum lectus.',
        'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.']);