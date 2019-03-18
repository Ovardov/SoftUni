(function attachEvents() {

    $('#bookHourBtn').on('click', addConsultation);

    function addConsultation(event) {
        event.preventDefault();
        event.stopPropagation();

        let validUsername = usernameValidation();
        let validLecturerName = lecturerValidation();
        let filledInputFields = filledInputFieldsValidation();

        if (validUsername && validLecturerName && filledInputFields) {
            $.notify('Consultation added', 'success');

            addNewConsultation();
            increaseConsultationsCount();
            clearFields();

        } else {
            $.notify('Try again', 'error');
        }

    }

    function usernameValidation() {
        let isValid = false;
        const regex = /^([A-Za-z])(\w{2,24})$/g;

        let username = $('#username').val();

        if (regex.test((username))) {
            isValid = true;
        }

        return isValid;
    }

    function lecturerValidation() {
        let isValid = false;

        let selectedOption = $('#lecturer option:selected').val();

        if (selectedOption !== 'name') {
            isValid = true;
        }

        return isValid;
    }

    function filledInputFieldsValidation() {
        let isValid = false;

        let dateTimeInputField = $('#dateTimePicker').val();

        if (dateTimeInputField !== '') {
            isValid = true;
        }

        return isValid;
    }

    function addNewConsultation() {
        let lecturerName = $('#lecturer option:selected').val();
        let dateAndTime = $('#dateTimePicker')
            .val()
            .split(' ');

        let yearMonthDay = dateAndTime[0].split('/');
        let monthDay = `${yearMonthDay[1]}/${yearMonthDay[2]}`;
        let time = dateAndTime[1];


        $('.education article:nth-child(3) .box-body ul')
            .append(`<li><span>${lecturerName} - ${monthDay} - ${time}</span><i class="fas fa-chevron-circle-right"></i></li>`)
    }

    function increaseConsultationsCount() {
        let consultationCount = $('.education article:nth-child(3) .box-footer span');
        let currentCount = consultationCount.text();

        consultationCount.text(++currentCount);

    }

    function clearFields() {
        $('#username').val('');
        $('.meeting-main option[value=JS]').prop('selected', true);
        $('#lecturer option[value=name]').prop('selected', true);
        $('#dateTimePicker').val('');
    }
})();