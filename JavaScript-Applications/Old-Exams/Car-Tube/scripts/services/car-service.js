const carService = (() => {

    function getAllCars() {
        return kinvey.get('appdata', 'cars', 'kinvey');
    }

    function createListing(data) {
        return kinvey.post('appdata', 'cars', 'kinvey', data);
    }

    function getACar(id) {
        return kinvey.get('appdata', `cars/${id}`, 'kinvey');
    }

    function editListing(id, data) {
        return kinvey.update('appdata', `cars/${id}`, 'kinvey', data);
    }

    function deleteListing(id) {
        return kinvey.remove('appdata', `cars/${id}`, 'kinvey');
    }

    return {
        getAllCars,
        createListing,
        getACar,
        editListing,
        deleteListing
    }
})();