function attachEvents() {
    let allButtons = $('a').on('click', addClass);

    function addClass() {
        allButtons.removeClass('selected');

        $(this).addClass('selected');
    }
}