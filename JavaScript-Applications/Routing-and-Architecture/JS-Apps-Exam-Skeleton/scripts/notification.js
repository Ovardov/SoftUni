const notifications = (() => {
  $(document).on({
    ajaxStart: () => $('#loading').fadeIn(),
    ajaxStop: () => $('#loading').fadeOut()
  })

  function showSuccess(message) {
    let successBox = $('#info');
    successBox.text(message);
    successBox.fadeIn();
    successBox.fadeOut(3000);
  }

  function showError(message) {
    let errorBox = $('#error');
    errorBox.text(message);
    errorBox.fadeIn();
    errorBox.fadeOut(3000);
  }

  return {
    showSuccess,
    showError
  }
})()