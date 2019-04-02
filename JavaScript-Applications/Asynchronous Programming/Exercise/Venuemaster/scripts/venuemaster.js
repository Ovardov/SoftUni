function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJ_Ke8hZg';
    const username = 'guest';
    const password = 'pass';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };


    $('#getVenues').click(getIds);

    async function getIds() {
        let date = $('#venueDate').val();
        try {
            const allIds = await $.ajax({
                method: 'POST',
                url: baseUrl + `rpc/${appKey}/custom/calendar?query=${date}`,
                headers,
            });

            $('#venue-info').empty();

            getVenues(allIds);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function getVenues(allIds) {
        for (let id of allIds) {

            try {
                const venue = await $.ajax({
                    method: 'GET',
                    url: baseUrl + 'appdata/' + appKey + '/' + 'venues/' + id,
                    headers,
                });

                showCurrentVenue(venue);
            } catch (error) {
                alert(`Error: ${error.message}`);
            }

        }

        let moreInfoButton = $('input.info');
        moreInfoButton.click(showMoreInfo);

        let purchaseButton = $('input.purchase');
        purchaseButton.click(showPurchaseView);
    }

    function showCurrentVenue(venue) {

        let div = $(`
        <div class="venue" id="${venue._id}">
            <span class="venue-name">
                <input class="info" type="button" value="More info">
                ${venue.name}
            </span>
            <div class="venue-details" style="display: none;">
                <table>
                    <tr>
                        <th>Ticket Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="venue-price">${venue.price} lv</td>
                        <td>
                            <select class="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                        <td>
                            <input class="purchase" type="button" value="Purchase">
                        </td>
                    </tr>
                </table>
                <span class="head">Venue description:</span>
                <p class="description">${venue.description}</p>
                <p class="description">Starting time: ${venue.startingHour}</p>
            </div>
        </div>`);

        $('#venue-info').append(div);
    }

    function showMoreInfo() {
        let id = $(this)
            .parent()
            .parent()
            .attr('id');

        $(`#${id} div.venue-details`).css('display', 'block');
    }

    function showPurchaseView() {
        let venue = $(this).closest('.venue');

        let id = $(venue).attr('id');
        let name = $(venue)
            .find('.venue-name')
            .text();
        let price = +$(venue)
            .find('.venue-price')
            .text()
            .split(' ')[0];
        let quantity = +$(venue)
            .find('select.quantity option:selected')
            .val();


        makePurchase(id, name, price, quantity);
    }

    function makePurchase(id, name, price, quantity) {

        $('#venue-info').html(`
            <span class="head">Confirm purchase</span>
            <div class="purchase-info">
                    <span>${name}</span>
                    <span>${quantity} x ${price.toFixed(2)}</span>
                    <span>Total: ${(quantity * price).toFixed(2)} lv</span>
                    <input type="button" value="Confirm">
            </div>
        `);

        let confirmButton = $('input[value=Confirm]');
        confirmButton.click(confirmPurchase.bind(this, id, quantity));
    }

    async function confirmPurchase(id, quantity) {
        try {
            const data = await $.ajax({
                method: 'POST',
                url: baseUrl + `rpc/${appKey}/custom/purchase?venue=${id}&qty=${quantity}`,
                headers
            });

            showTicket(data);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    }

    function showTicket(data) {
        $('#venue-info')
            .empty()
            .append(`You may print this page as your ticket`)
            .append(data.html);
    }
}