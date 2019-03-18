function register() {
    let usernameElement = document.getElementById('username');
    let username = usernameElement.value;
    let passwordElement = document.getElementById('password');
    let password = passwordElement.value;
    let emailElement = document.getElementById('email');
    let email = emailElement.value;
    let resultElement = document.getElementById('result');
    let emailRegex = /(.+)@(.+).(com|bg)/gm;

    if (email.match(emailRegex) && username !== '' && password !== '') {
        let h1Element = document.createElement('h1');
        h1Element.textContent = 'Successful Registration!';

        resultElement.appendChild(h1Element);
        resultElement.innerHTML += `Username: ${username}`;
        resultElement.appendChild(document.createElement('br'));
        resultElement.innerHTML += `Email: ${email}`;
        resultElement.appendChild(document.createElement('br'));
        resultElement.innerHTML += `Password: ${('*').repeat(password.length)}`;

        usernameElement.value = '';
        emailElement.value = '';
        passwordElement.value = '';
    }

    setTimeout(() => {
        resultElement.innerHTML = '';
    }, 5000);
}