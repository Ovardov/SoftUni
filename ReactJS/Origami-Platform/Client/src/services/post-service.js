const postService = {
    load: function(id) {
        let query = '';

        if(id) {
            query = `/${id}`;
        }

        return fetch(`http://localhost:9999/api/origami${query}`)
            .then(posts => posts.json())
            .catch(err => console.error(err));
    }
}

export default postService;