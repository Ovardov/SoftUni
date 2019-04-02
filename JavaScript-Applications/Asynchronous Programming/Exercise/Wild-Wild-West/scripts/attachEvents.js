function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_HJhv1G0uV';
    const username = 'ovardov';
    const password = '123456';
    const endpoint = 'players';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    startGame();

    $('#reload').click(reloadBullets);
    $('#save').click(saveGame);
    $('#addPlayer').click(addPlayer);

    let selectedPlayer;
    let playerId;
    let allPlayers;


    async function startGame() {
        try {
            allPlayers = await $.ajax({
                method: 'GET',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                headers
            });

            showPlayers(allPlayers);

            $('#canvas').css('display', 'block');
            $('#save').css('display', 'block');
            $('#reload').css('display', 'block');

            selectedPlayer = allPlayers[0];
            playerId = selectedPlayer._id;

            clearInterval(canvas.intervalId);

            // Load game screen
            loadCanvas(selectedPlayer);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    function showPlayers(allPlayers) {
        $('#players').empty();

        for (let player of allPlayers) {
            let id = player._id;
            let name = player.name;
            let money = +player.money;
            let bullets = +player.bullets;

            let div = $(`
                <div class="player" data-id="${id}">
                    <div class="row">
                        <label>Name:</label>
                        <label class="name">${name}</label>
                    </div>
                    <div class="row">
                          <label>Money:</label>
                          <label class="money">${money}</label>
                    </div>
                    <div class="row">
                        <label>Bullets:</label>
                        <label class="bullets">${bullets}</label>
                    </div>
                </div>
            `);

            let playButton = $('<button>')
                .addClass('play')
                .text('Play');

            playButton.click(selectPlayer);

            let deleteButton = $('<button>')
                .addClass('delete')
                .text('Delete');

            deleteButton.click(deletePlayer);

            div
                .append(playButton)
                .append(deleteButton);

            $('#players').append(div);
        }
    }

    async function addPlayer() {
        let playerNameElement = $('#addName');
        let playerName = playerNameElement.val();

        let newPlayer = {
            name: playerName,
            money: 500,
            bullets: 6
        };

        try {
            await $.ajax({
                method: 'POST',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                data: JSON.stringify(newPlayer),
                headers
            });

            playerNameElement.val('');
            startGame();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    function selectPlayer() {
        let id = $(this)
            .parent()
            .attr('data-id');

        selectedPlayer = allPlayers
            .filter(x => x._id === id)[0];

        playerId = id;

        clearInterval(canvas.intervalId);
        loadCanvas(selectedPlayer);
    }

    async function deletePlayer() {
        let id = $(this)
            .parent()
            .attr('data-id');

        try {
            await $.ajax({
                method: 'DELETE',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + id,
                headers
            });

            startGame();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    }

    function reloadBullets() {
        if (selectedPlayer.money >= 60) {
            selectedPlayer.money -= 60;
            selectedPlayer.bullets += 6;
        }
    }

    async function saveGame() {
        try {
            await $.ajax({
                method: 'PUT',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + playerId,
                headers,
                data: JSON.stringify(selectedPlayer)
            });

            startGame();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
}