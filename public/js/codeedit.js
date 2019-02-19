var title
var editor
var editorCSS
var editorJS

$(document).ready(function () {

  const socket = io();

  var code = $("#htmlEditor")[0];
  var cssCode = $("#cssEditor")[0];
  var jsCode = $("#jsEditor")[0];

  // Title Editor
  title = CodeMirror.fromTextArea(document.getElementById("project-title"), {
    mode: "text/html",
    lineNumbers: false,
  });

  // HTML Editor
  editor = CodeMirror.fromTextArea(code, {
    // value: "function myScript(){return 100;}\n",
    mode: "xml",
    theme: "monokai",
    lineNumbers: true,
    autoCloseTags: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  // CSS Editor
  editorCSS = CodeMirror.fromTextArea(cssCode, {
    mode: "css",
    theme: "monokai",
    lineNumbers: true,
    autoCloseTags: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  // JS Editor
  editorJS = CodeMirror.fromTextArea(jsCode, {
    mode: "javascript",
    theme: "monokai",
    lineNumbers: true,
    autoCloseTags: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });


  //Title Change
  title.on('change', function () {
    socket.emit("update-title");
  });

  //HTML Change
  editor.on('change', function () {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
    var msg = {
      html: editor.getValue(),
    };
    socket.emit("update-html", msg);
  });

  editorCSS.on('change', function () {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
    var msg = {
      css: editorCSS.getValue()
    };
    // socket.emit("codechange", msg);
  });

  editorJS.on('change', function () {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
    var msg = {
      javascript: editorJS.getValue()
    };
    // socket.emit("codechange", msg);
  });

  // Preview
  var delay;

  function updatePreview() {
    var previewFrame = document.getElementById('preview');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.write(editorCSS.getValue());
    preview.write(editorJS.getValue());
    preview.close();
  }
  setTimeout(updatePreview, 300);

});
