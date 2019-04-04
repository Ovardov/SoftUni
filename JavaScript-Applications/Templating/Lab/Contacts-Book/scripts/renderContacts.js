function showDetails(id) {
    $(`#${id}`).toggle();
}

(async function renderCards() {
    try {
        const contactListHTML = await $.get('./templates/contact-list.hbs');
        const contactInformationHTML = await $.get('./templates/contact-information.hbs');

        Handlebars.registerPartial('contactInfo', contactInformationHTML);

        const template = Handlebars.compile(contactListHTML);

        const context = {
            contacts
        };

        const renderHTML = template(context);

        $('.contacts').append(renderHTML);
    } catch (error) {
        console.log(error);
    }
})();
