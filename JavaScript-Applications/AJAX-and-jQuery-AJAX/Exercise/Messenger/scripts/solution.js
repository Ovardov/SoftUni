function attachEvents() {
    let sendButton = $('#submit');
    sendButton.click(submitMessage);

    let refreshButton = $('#refresh');
    refreshButton.click(showMessages);

    let baseUrl = 'https://messenger-95490.firebaseio.com/messages.json';

    function submitMessage() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();

        let message = {
            author,
            content,
            timestamp
        };

        $.ajax({
            method: 'POST',
            url: baseUrl,
            data: JSON.stringify(message),
            success: clearFields
        });
    }

    function showMessages() {
        $.ajax({
            method: 'GET',
            url: baseUrl,
            success: loadMessages
        })
    }

    function loadMessages(data) {
        let allMessages = '';

        let sortedByDate = Object.values(data)
            .sort((a, b) => a.timestamp - b.timestamp);

        for (let message of sortedByDate) {
            allMessages += `${message.author}: ${message.content}\n`;
        }

        $('#messages').text(allMessages);
    }

    function clearFields() {
        $('#author').val('');
        $('#content').val('');
    }
}