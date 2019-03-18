function solve() {
    let divElement = document.querySelector('#exercise div');

    setTimeout(() => {
        let randomWidth = Math.round(Math.random() * 80) + 1;
        let randomHeight = Math.round(Math.random() * 44) + 1;

        divElement.style.margin = `${randomHeight}vh ${randomWidth}%`;
    }, 2000);
}