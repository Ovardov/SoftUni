function solve(arr) {

    let startPattern = /^(<\w+>)/;
    let endPattern = /(<\/\w+>)$/;

    let result = [];

    for (let token of arr) {
        if (token.match(startPattern) && token.match(endPattern)) {

            let start = token.match(startPattern)[0];
            let end = token.match(endPattern)[0];

            if (start === end.replace(/\//, '')) {
                token = token.replace(/(<\/*\w+>)/g, '');
                result.push(token);
            }
        }
    }

    console.log(result.join(' '));
}

solve(
    ['<div><p>This</p> is</div>',
        '<div><a>perfectly</a></div>',
        '<divs><p>valid</p></divs>',
        '<div><p>This</div></p>',
        '<div><p>is not</p><div>']
);