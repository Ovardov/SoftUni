const postService = {
    load: function(id, limit) {
        let query = '';

        if(id) {
            query = `/${id}`;
        }

        if(limit) {
            query += `?limit=${limit}`;
        }

        return fetch(`http://localhost:9999/api/origami${query}`)
            .then(posts => posts.json())
            .catch(err => console.error(err));
    }
}

export default postService;