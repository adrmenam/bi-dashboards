$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-concessionaire .modal-content").html("");
        $("#modal-concessionaire").modal("show");
      },
      success: function (data) {
        $("#modal-concessionaire .modal-content").html(data.html_form);
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
          $("#concessionaire-table tbody").html(data.html_concessionaire_list);
          $("#modal-concessionaire").modal("hide");
        }
        else {
          $("#modal-concessionaire .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Create concessionaire
  $(".js-create-concessionaire").click(loadForm);
  $("#modal-concessionaire").on("submit", ".js-concessionaire-create-form", saveForm);

  // Update concessionaire
  $("#concessionaire-table").on("click", ".js-update-concessionaire", loadForm);
  $("#modal-concessionaire").on("submit", ".js-concessionaire-update-form", saveForm);

  // Delete concessionaire
  $("#concessionaire-table").on("click", ".js-delete-concessionaire", loadForm);
  $("#modal-concessionaire").on("submit", ".js-concessionaire-delete-form", saveForm);

});
