(function attachEvent() {
    $('#submitBtn').click(submit);

    $('.hyperlink-notification').click(function (e) {
        e.preventDefault();
        let linkURL = $(this).attr("href");
        warnBeforeRedirect(linkURL);
    });

    function submit(e) {
        warnBeforeSend();

        e.preventDefault();
        e.stopPropagation();

        // Clear input fields
        $('input').val('');
        $('.dropify-preview').css('display', 'none');
    }
}());

function warnBeforeRedirect(linkURL) {
    swal({
        title: "Leave this site?",
        text: "If you click 'OK', you will be redirected to " + linkURL,
        type: "warning",
        showCancelButton: true
    }, function () {
        window.location.href = linkURL;
    });
}

function warnBeforeSend() {
    swal("Good job!", "You are registered!", "success")
}

$('.dropify').dropify();

