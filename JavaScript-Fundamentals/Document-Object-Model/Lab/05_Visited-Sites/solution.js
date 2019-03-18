function solve() {
    let allLinksArray = document.querySelectorAll('#exercise div a');
    let allTextArray = document.querySelectorAll('#exercise div span');

    let links = {
        softUni: 1,
        google: 2,
        youtube: 3,
        wikipedia: 4,
        gmail: 5,
        stackoverflow: 6
    };

    allLinksArray[0].addEventListener('click', () => {
        links['softUni']++;
        allTextArray[0].textContent = `Visited: ${links['softUni']} times`;
    });

    allLinksArray[1].addEventListener('click', () => {
        links['google']++;
        allTextArray[1].textContent = `Visited: ${links['google']} times`;
    });

    allLinksArray[2].addEventListener('click', () => {
        links['youtube']++;
        allTextArray[2].textContent = `Visited: ${links['youtube']} times`;
    });

    allLinksArray[3].addEventListener('click', () => {
        links['wikipedia']++;
        allTextArray[3].textContent = `Visited: ${links['wikipedia']} times`;
    });

    allLinksArray[4].addEventListener('click', () => {
        links['gmail']++;
        allTextArray[4].textContent = `Visited: ${links['gmail']} times`;
    });

    allLinksArray[5].addEventListener('click', () => {
        links['stackoverflow']++;
        allTextArray[5].textContent = `Visited: ${links['stackoverflow']} times`;
    });
}