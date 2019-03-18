function attachGradientEvents() {
    let gradientBox = $('#gradient-box');
    gradientBox.mousemove(getGradient);

    let resultElement = $('#result');

    function getGradient(e) {
        let offSet = e.offsetX;

        let percentage = offSet / (e.target.clientWidth) * 100;

        resultElement.text(`${Math.floor(percentage)}%`);
    }
}