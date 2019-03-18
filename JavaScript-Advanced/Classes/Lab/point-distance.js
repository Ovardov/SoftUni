class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(firstPoint, secondPoint) {
        return Math.sqrt(((firstPoint.x - secondPoint.x) ** 2) + ((firstPoint.y - secondPoint.y) ** 2))
    }
}

let firstPoint = new Point(5, 5);
let secondPoint = new Point(9, 8);
console.log(Point.distance(firstPoint, secondPoint));
