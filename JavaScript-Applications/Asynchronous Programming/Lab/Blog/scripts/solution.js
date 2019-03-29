function attachEvents() {
    const appId = 'kid_Byi01_K_E';

    const kinveyUsername = 'peter';
    const kinveyPassword = 'p';

    const baseUrl = `https://baas.kinvey.com/appdata/${appId}/`;

    const base64auth = btoa(`${kinveyUsername}:${kinveyPassword}`);

    const authHeaders = {
        'Authorization': `Basic ${base64auth}`
    };

    const loadPostsButton = $('#btnLoadPosts');
    loadPostsButton.click(loadPosts);

    const viewPostButton = $('#btnViewPost');
    viewPostButton.click(findSelectedPost);


    // AJAX request
    function request(endUrl) {
        return $.ajax({
            method: 'GET',
            url: baseUrl + endUrl,
            headers: authHeaders
        });
    }

    function findSelectedPost() {
        let selectedPostId = $('#posts option:selected').val();

        let postPromise = request(`posts/${selectedPostId}`);
        let commentPromise = request(`comments/?query={"post_id":"${selectedPostId}"}`);

        Promise.all([postPromise, commentPromise])
            .then(displayPostsAndComments)
            .catch(handleError);
    }

    function loadPosts() {
        request('posts')
            .then(displayPosts)
            .catch(handleError);
    }

    function displayPosts(data) {
        let posts = $('#posts');
        posts.empty();

        for (let currentPost of data) {
            let optionElement = $('<option>')
                .val(currentPost._id)
                .text(currentPost.title);

            posts.append(optionElement);
        }
    }

    function displayPostsAndComments(data) {
        let postTitleElement = $('#post-title');
        let postBodyElement = $('#post-body');
        let postCommentsElement = $('#post-comments');


        postCommentsElement.empty();

        let post = data[0];

        postTitleElement.text(post.title);
        postBodyElement.text(post.body);

        for (let currentComment of data[1]) {
            let liElement = $('<li>')
                .text(currentComment.text);

            postCommentsElement.append(liElement);
        }
    }

    function handleError(error) {
        let divElement = $('<div>')
            .text(`Error: ${error.status} (${error.statusText})`);

        $('body').prepend(divElement);

        setTimeout(function () {
            $(divElement).fadeOut(() => $(divElement).remove());
        }, 3000)
    }
}
