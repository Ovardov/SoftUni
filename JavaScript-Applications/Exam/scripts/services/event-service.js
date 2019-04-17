const eventService = (() => {

    function createEvent(data) {
        return kinvey.post('appdata', 'events', 'kinvey', data);
    }

    function showAllEvents() {
        return kinvey.get('appdata', `events?query={}&sort={"peopleInterestedIn": -1}`, 'kinvey');
    }

    function getAnEvent(id) {
        return kinvey.get('appdata', `events/${id}`, 'kinvey');
    }

    function editEvent(id, data) {
        return kinvey.update('appdata', `events/${id}`, 'kinvey', data);
    }

    function deleteEvent(id) {
        return kinvey.remove('appdata', `events/${id}`, 'kinvey');
    }

    function getMyEvents(creator) {
        return kinvey.get('appdata', `events?query={"organizer":"${creator}"}&sort={}`, 'kinvey');

    }

    return {
        createEvent,
        showAllEvents,
        getAnEvent,
        editEvent,
        deleteEvent,
        getMyEvents
    }
})();