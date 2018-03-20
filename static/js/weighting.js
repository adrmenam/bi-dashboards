$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-weighting .modal-content").html("");
        $("#modal-weighting").modal("show");
      },
      success: function (data) {
        $("#modal-weighting .modal-content").html(data.html_form);
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
          $("#weighting-table tbody").html(data.html_weighting_list);
          $("#modal-weighting").modal("hide");
        }
        else {
          $("#modal-weighting .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Create weighting
  $(".js-create-weighting").click(loadForm);
  $("#modal-weighting").on("submit", ".js-weighting-create-form", saveForm);

  // Update weighting
  $("#weighting-table").on("click", ".js-update-weighting", loadForm);
  $("#modal-weighting").on("submit", ".js-weighting-update-form", saveForm);

  // Delete weighting
  $("#weighting-table").on("click", ".js-delete-weighting", loadForm);
  $("#modal-weighting").on("submit", ".js-weighting-delete-form", saveForm);

});
