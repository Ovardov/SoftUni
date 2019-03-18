function solve() {
    let paragraphElement = document.querySelector('#exercise p');
    let button = document.querySelector('button');
    let clickCounter = 0;
    let colorCounter = 0;

    let colors = ['blue', 'green', 'red'];

    button.onclick = () => {
        clickCounter++;
        paragraphElement.style.fontSize = `${clickCounter * 2}px`;

        if (colors.length > colorCounter) {
            paragraphElement.style.color = colors[colorCounter];
            colorCounter++;
        } else {
            paragraphElement.style.color = colors[0];
            colorCounter = 1;
        }
    };
}