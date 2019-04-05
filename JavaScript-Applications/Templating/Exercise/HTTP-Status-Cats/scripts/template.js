$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        try {
            const catListHTML = await $.get('./templates/cat-list.hbs');
            const catInfoHTML = await $.get('./templates/cat-info.hbs');

            Handlebars.registerPartial('catInfo', catInfoHTML);

            const template = Handlebars.compile(catListHTML);

            const context = {
                cats
            };

            const renderedHTML = template(context);

            $('#allCats').append(renderedHTML);
        } catch (error) {
            console.log(error);
        }
    }
});

function showInfo(id) {
    $(`#${id}`).toggle();
}
