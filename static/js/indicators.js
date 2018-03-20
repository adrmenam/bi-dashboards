$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-indicator .modal-content").html("");
        $("#modal-indicator").modal("show");
      },
      success: function (data) {
        $("#modal-indicator .modal-content").html(data.html_form);
      }
    });
  };

  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          $("#indicator-table tbody").html(data.html_indicator_list);
          $("#modal-indicator").modal("hide");
        }
        else {
          $("#modal-indicator .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Create indicator
  $(".js-create-indicator").click(loadForm);
  $("#modal-indicator").on("submit", ".js-indicator-create-form", saveForm);

  // Update indicator
  $("#indicator-table").on("click", ".js-update-indicator", loadForm);
  $("#modal-indicator").on("submit", ".js-indicator-update-form", saveForm);

  // Delete indicator
  $("#indicator-table").on("click", ".js-delete-indicator", loadForm);
  $("#modal-indicator").on("submit", ".js-indicator-delete-form", saveForm);

});
