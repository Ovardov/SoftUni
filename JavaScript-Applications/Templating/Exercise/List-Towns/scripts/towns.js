function attachEvents() {

    let loadButton = $('#btnLoadTowns');
    loadButton.click(getTowns);
    
    function getTowns() {
        let towns = $('#towns')
            .val()
            .split(', ');

        renderTowns(towns);

        $('#towns').val('');
    }

    async function renderTowns(towns) {
        try{
            const townListHTML = await $.get('./templates/town-list.hbs');

            const template = Handlebars.compile(townListHTML);

            const context = {
                towns
            };

            const renderHTML = template(context);

            $('#root').append(renderHTML);
        }catch (error) {
            console.log(error);
        }
    }
}