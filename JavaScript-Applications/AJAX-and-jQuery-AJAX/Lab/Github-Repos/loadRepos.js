function loadRepos() {
    let username = $('#username').val();
    let url = `https://api.github.com/users/${username}/repos`;

    $.ajax({
        method: 'GET',
        url,
        success: onLoadReposSuccess,
        error: displayError,
    });

    function onLoadReposSuccess(data) {
        $('#repos').empty();

        data.forEach(x => {
            let liElement = $('<li>');

            $('<a>')
                .attr('href', `${x.html_url}`)
                .text(`${x.full_name}`)
                .appendTo(liElement);

            $('#repos').append(liElement);
        });
    }

    function displayError() {
        $('#repos').empty();

        $('<li>')
            .text('Error')
            .appendTo($('#repos'));
    }
}