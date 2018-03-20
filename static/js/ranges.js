$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-range .modal-content").html("");
        $("#modal-range").modal("show");
      },
      success: function (data) {
        $("#modal-range .modal-content").html(data.html_form);
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
          $("#range-table tbody").html(data.html_range_list);
          $("#modal-range").modal("hide");
        }
        else {
          $("#modal-range .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Create range
  $(".js-create-range").click(loadForm);
  $("#modal-range").on("submit", ".js-range-create-form", saveForm);

  // Update range
  $("#range-table").on("click", ".js-update-range", loadForm);
  $("#modal-range").on("submit", ".js-range-update-form", saveForm);

  // Delete range
  $("#range-table").on("click", ".js-delete-range", loadForm);
  $("#modal-range").on("submit", ".js-range-delete-form", saveForm);

});
