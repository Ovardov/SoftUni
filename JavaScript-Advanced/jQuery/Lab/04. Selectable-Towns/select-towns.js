function attachEvents() {
    $('#items li').click(changeColor);
    $('#showTownsButton').click(showTowns);

    let clickedTowns = [];

    function changeColor() {
        let currentListItem = $(this);

        if (currentListItem.attr('data-selected') === 'true') {

            currentListItem.attr('data-selected', 'false');
            currentListItem.css('background', '');

            let index = clickedTowns.indexOf($(this).text());

            clickedTowns.splice(index, 1);
        } else {
            currentListItem.attr('data-selected', 'true');

            currentListItem.css('background', '#DDD');
            clickedTowns.push($(this).text());
        }
    }

    function showTowns() {
        $('#selectedTowns').text(clickedTowns.join(', '));
    }
}