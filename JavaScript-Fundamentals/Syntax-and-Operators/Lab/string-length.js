function findStringLength(firstString, secondString, thirdString) {
    let lengthSum = 0;
    let averageSum = 0;

    lengthSum = firstString.length + secondString.length + thirdString.length;
    averageSum = Math.floor((firstString.length + secondString.length + thirdString.length) / 3);

    console.log(lengthSum);
    console.log(averageSum);
}

findStringLength('chocolate', 'ice cream', 'cake');