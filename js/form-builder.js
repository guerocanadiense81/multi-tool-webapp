let formBuilderInstance;

$(function () {
  const options = {
    disableFields: ['autocomplete'], // or [] to enable all
    stickyControls: { enable: true },
    onSave: function(evt, formData) {
      const render = $('<div/>');
      render.formRender({ formData });
      document.getElementById("outputBox").value = render.html();
    }
  };
  formBuilderInstance = $('#form-builder').formBuilder(options);
});

function exportForm() {
  const formData = formBuilderInstance.actions.getData('json');
  const render = $('<div/>');
  render.formRender({ formData });
  document.getElementById("outputBox").value = render.html();
}
