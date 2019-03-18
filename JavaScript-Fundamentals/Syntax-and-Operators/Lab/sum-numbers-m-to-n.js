function calculate(n, m) {
    n = +n;
    m = +m;
    let sum = 0;

    for (let i = n; i <= m; i++) {
        sum += i;
    }

    return sum;
}

calculate('1', '5');