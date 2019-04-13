const receiptService = (() => {

    function getAllMyReceipts(userId) {
        return kinvey.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"false"}`, 'kinvey');
    }

    function getActiveReceipt(userId) {
        return kinvey.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"true"}`, 'kinvey');
    }

    function createReceipt(data) {
        return kinvey.post('appdata', 'receipts', 'kinvey', data);
    }

    function addEntry(data) {
        return kinvey.post('appdata', 'entries', 'kinvey', data);
    }

    function getEntries(receiptId) {
        return kinvey.get('appdata', `entries?query={"receiptId":"${receiptId}"}`, 'kinvey');
    }

    function deleteEntry(id) {
        return kinvey.remove('appdata', `entries/${id}`, 'kinvey');
    }

    function receiptCheckout(receiptId, data) {
        return kinvey.update('appdata', `receipts/${receiptId}`, 'kinvey', data);
    }

    function getAReceipt(id) {
        return kinvey.get('appdata', `receipts/${id}`, 'kinvey');

    }

    return {
        getAllMyReceipts,
        getActiveReceipt,
        createReceipt,
        addEntry,
        getEntries,
        deleteEntry,
        receiptCheckout,
        getAReceipt
    }
})();