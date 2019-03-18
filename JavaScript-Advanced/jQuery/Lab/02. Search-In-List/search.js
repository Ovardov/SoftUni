function search() {
    $('#towns li').css('font-weight', 'normal');

    let searchedValue = $('#searchText').val();

    let towns = $(`#towns li:contains(${searchedValue})`)
        .css('font-weight', 'bold');

    $('#result').text(`${towns.length} matches found.`);
}