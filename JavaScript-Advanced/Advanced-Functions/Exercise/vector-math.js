let solution = (function () {

    const add = ([xA, yA], [xB, yB]) => {
        return [xA + xB, yA + yB];
    };

    const multiply = ([xA, yA], scalar) => {
        return [xA * scalar, yA * scalar];
    };

    const length = ([xA, yA]) => {
        return Math.sqrt(xA ** 2 + yA ** 2);
    };

    const dot = ([xA, yA], [xB, yB]) => {
        return xA * xB + yA * yB;
    };

    const cross = ([xA, yA], [xB, yB]) => {
        return xA * yB - yA * xB;
    };

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }

})();

console.log(solution.cross([3, 7], [1, 0]));