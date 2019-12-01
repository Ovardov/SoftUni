const userService = {
    register: function(data) {
        return fetch(`http://localhost:9999/api/user/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    login: function(data) {
        return fetch(`http://localhost:9999/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));

    },

    logout: function() {
        return fetch(`http://localhost:9999/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(res => res.text())
            .catch(err => console.error(err));
    }
}

export default userService;