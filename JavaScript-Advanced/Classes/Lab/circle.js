class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get diameter() {
        return 2 * this.radius;
    }

    set diameter(diameter) {
        return this.radius = diameter / 2;
    }

    get area() {
        return Math.PI * this.radius * this.radius;
    }
}

let c = new Circle(2);

console.log(`Area: ${c.area}`);

c.diameter = 1.6;

console.log(`Area: ${c.area}`);
