function loadCommits() {
    let username = $('#username').val();
    let repo = $('#repo').val();

    let commitsElement = $('#commits');
    commitsElement.empty();

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    $.get(url)
        .then(data => loadCommits(data))
        .catch(error => displayError(error));

    function loadCommits(data) {
        for (let currentRepo of data) {

            let author = currentRepo.commit.author.name;
            let message = currentRepo.commit.message;

            let liElement = $('<li>')
                .text(`${author}: ${message}`);

            commitsElement.append(liElement);
        }

    }

    function displayError(error) {
        let liElement = $('<li>')
            .text(`Error: ${error.status} (${error.statusText})`);

        commitsElement.append(liElement);
    }
}