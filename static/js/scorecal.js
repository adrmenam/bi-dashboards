$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-scorecal .modal-content").html("");
        $("#modal-scorecal").modal("show");
      },
      success: function (data) {
        $("#modal-scorecal .modal-content").html(data.html_form);
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
          $("#scorecal-table tbody").html(data.html_scorecal_list);
          $("#modal-scorecal").modal("hide");
        }
        else {
          $("#modal-scorecal .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Create scorecal
  $(".js-create-scorecal").click(loadForm);
  $("#modal-scorecal").on("submit", ".js-scorecal-create-form", saveForm);

  // Update scorecal
  $("#scorecal-table").on("click", ".js-update-scorecal", loadForm);
  $("#modal-scorecal").on("submit", ".js-scorecal-update-form", saveForm);

  // Delete scorecal
  $("#scorecal-table").on("click", ".js-delete-scorecal", loadForm);
  $("#modal-scorecal").on("submit", ".js-scorecal-delete-form", saveForm);

});
