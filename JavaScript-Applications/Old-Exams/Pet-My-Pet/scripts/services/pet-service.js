const petService = (() => {

    function createPet(data) {
        return kinvey.post('appdata', 'pets', 'kinvey', data);
    }

    function getAllPets(filter) {
        let query = filter && filter != 'All'
            ? JSON.stringify({category: filter})
            : JSON.stringify({});

        return kinvey.get('appdata', `pets?query=${query}&sort={"likes": -1}`, 'kinvey');
    }

    function getMyPets(id) {
        return kinvey.get('appdata', `pets?query={"_acl.creator":"${id}"}`, 'kinvey');
    }

    function deletePet(id) {
        return kinvey.remove('appdata', `pets/${id}`, 'kinvey');
    }

    function getPetDetails(id) {
        return kinvey.get('appdata', `pets/${id}`, 'kinvey');
    }

    function editPet(id, data) {
        return kinvey.update('appdata', `pets/${id}`, 'kinvey', data);
    }

    function likePet(id, data) {
        return kinvey.update('appdata', `pets/${id}`, 'kinvey', data);

    }

    return {
        createPet,
        getAllPets,
        getMyPets,
        getPetDetails,
        deletePet,
        editPet,
        likePet
    }
})();