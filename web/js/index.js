$(document).ready(function(){
	// alert("Hello World!");

	var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");
    //editor.getSession().setUseWrapMode(true);
});
