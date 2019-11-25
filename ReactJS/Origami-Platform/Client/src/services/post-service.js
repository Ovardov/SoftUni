const postService = {
    load: function(id, limit) {
        let query = '';
        
        if(limit) {
            query += `?limit=${limit}`;
        }

        if(id) {
            query += `&id=${id}`;
        }


       return fetch(`http://localhost:9999/api/origami${query}`)
            .then(posts => posts.json())
            .catch(err => console.error(err));
    },

    addPost: function(data) {

        return fetch(`http://localhost:9999/api/origami`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default postService;