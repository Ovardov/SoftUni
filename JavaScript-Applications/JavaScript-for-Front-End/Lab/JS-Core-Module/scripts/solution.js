function attachEvents() {
    let confirmationButton = $('#confirmation');
    let yesButton = $('#confirm-collapse');
    
    confirmationButton.on('show.bs.modal', showCollapse);
    yesButton.click(applyCourse);

    function showCollapse(event) {
        let button = $(event.relatedTarget);

        let course = button.data('course');

        let modal = $(this);

        modal.find('.modal-title').text(`Apply for the ${course} course`);
        modal.find('.modal-body').text(`Are you sure you want to apply for the ${course} course?`);
    }
}




