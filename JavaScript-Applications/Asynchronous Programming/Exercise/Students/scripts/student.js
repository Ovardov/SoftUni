function attackEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJXTsSi-e';
    const username = 'guest';
    const password = 'guest';
    const endpoint = 'Students';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    getStudents();

    let createButton = $('#create');
    createButton.click(addStudent);

    async function getStudents() {
        try {
            const data = await $.ajax({
                method: 'GET',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                headers
            });

            showStudents(data);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }


    function showStudents(data) {
        let allStudents = $('#results td').parent();
        for (let student of allStudents) {
            student.remove();
        }

        let sortedById = data
            .sort((a, b) => a.ID - b.ID);

        for (let i = 0; i < sortedById.length; i++) {
            let student = sortedById[i];

            let id = +student.ID;
            let firstName = student.FirstName;
            let lastName = student.LastName;
            let facultyNumber = student.FacultyNumber;
            let grade = +student.Grade;


            let tr = $('<tr>');

            tr
                .append(`<td>${id}</td>`)
                .append(`<td>${firstName}</td>`)
                .append(`<td>${lastName}</td>`)
                .append(`<td>${facultyNumber}</td>`)
                .append(`<td>${grade}</td>`);

            $('#results').append(tr);
        }
    }

    async function addStudent() {
        let ID = +$('#id').val();
        let FirstName = $('#firstName').val();
        let LastName = $('#lastName').val();
        let FacultyNumber = $('#facultyNumber').val();
        let Grade = +$('#grade').val();

        let newStudent = {
            ID,
            FirstName,
            LastName,
            FacultyNumber,
            Grade
        };

        if (ID && FirstName && LastName && FacultyNumber && Grade) {
            try {
                await $.ajax({
                    method: 'POST',
                    url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                    headers,
                    data: JSON.stringify(newStudent)
                });

                clearFields();
                getStudents();
                alert('Added new student successfully. See in table :)');
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        } else {
            alert('Wrong input values');
        }
    }

    function clearFields() {
        $('#id').val('');
        $('#firstName').val('');
        $('#lastName').val('');
        $('#facultyNumber').val('');
        $('#grade').val('');
    }
}