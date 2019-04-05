$(() => {

    (async function renderMonkeys() {
        try {
            const monkeyListHTML = await $.get('./templates/monkey-list.hbs');
            const monkeyInfoHTML = await $.get('./templates/monkey-info.hbs');

            Handlebars.registerPartial('monkeyInfo', monkeyInfoHTML);

            const template = Handlebars.compile(monkeyListHTML);

            const context = {
                monkeys
            };

            const renderedHTML = template(context);

            $('.monkeys').append(renderedHTML);

        }catch (error) {
            console.log(error);
        }
    })();
});

function showInfo(id) {
    $(`#${id}`).toggle();
}