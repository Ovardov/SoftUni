const flightService = (() => {

    function getAllFlights() {
        return kinvey.get('appdata', 'flights', 'kinvey');
    }

    function createFlight(data) {
        return kinvey.post('appdata', 'flights', 'kinvey', data)
    }

    function getAFlight(id) {
        return kinvey.get('appdata', `flights/${id}`, 'kinvey');

    }

    function removeFlight(id) {
        return kinvey.remove('appdata', `flights/${id}`, 'kinvey');
    }

    function editFlight(id, data) {
        return kinvey.update('appdata', `flights/${id}`, 'kinvey', data);
    }

    return {
        getAllFlights,
        getAFlight,
        createFlight,
        removeFlight,
        editFlight
    }
})();