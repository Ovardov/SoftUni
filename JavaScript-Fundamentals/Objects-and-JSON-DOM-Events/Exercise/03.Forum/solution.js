function solve() {
    let submitButton = document.querySelector('form button');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        let username = document.getElementsByClassName('user-info')[0].children[1].value;
        let password = document.getElementsByClassName('user-info')[0].children[3].value;
        let email = document.getElementsByClassName('user-info')[0].children[5].value;
        let topics = Array.from(document.querySelectorAll('.topics input'))
            .filter(x => x.checked)
            .map(x => x.value);


        let tableBodyElement = document.getElementsByTagName('tbody')[0];

        let trElement = document.createElement('tr');
        let tdUsername = document.createElement('td');
        tdUsername.textContent = username;
        let tdEmail = document.createElement('td');
        tdEmail.textContent = email;
        let tdTopics = document.createElement('td');
        tdTopics.textContent = topics.join(' ');

        trElement.appendChild(tdUsername);
        trElement.appendChild(tdEmail);
        trElement.appendChild(tdTopics);
        tableBodyElement.appendChild(trElement);
    });

    let searchButton = document.querySelector('#exercise > button');
    searchButton.addEventListener('click', (event) => {

        let searchKey = document.getElementsByTagName('input')[7].value;

        let allTds = Array.from(document.querySelectorAll('tbody td'));

        for (let td of allTds) {
            td.parentNode.style.visibility = 'hidden';
        }

        for (let td of allTds) {
            if (td.textContent.includes(searchKey)) {
                td.parentNode.style.visibility = 'visible';
            }
        }
    })
}