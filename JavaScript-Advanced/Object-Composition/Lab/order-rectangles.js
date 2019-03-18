function solve(input) {
    let rectangles = [];

    for (let [width, height] of input) {

        let currentRectangle = getRectangle(width, height);
        rectangles.push(currentRectangle);
    }

    let sortedRectangles = rectangles
        .sort((a, b) => a.compareTo(b));

    return sortedRectangles;

    function getRectangle(width, height) {
        return {
            width,
            height,
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (otherRectangle) {
                if (otherRectangle.area() < this.area()) {
                    return -1;
                } else if (otherRectangle.area() === this.area()) {
                    return otherRectangle.width - this.width; // b.compareTo(a)
                } else {
                    return 1;
                }
            }
        };
    }
}

solve([[1, 20], [20, 1], [5, 3], [5, 3]]);