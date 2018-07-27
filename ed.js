var ace = require('ace-builds/src-min-noconflict/ace.js');
var extLangTools = require('ace-builds/src-min-noconflict/ext-language_tools.js');
const path = require('path')
const {dialog, BrowserWindow} = require('electron').remote;
const {read, write} = require('./fileUtils.js');
const remote = require('electron').remote;

function createED(id){
	ace.config.set('basePath', 'node_modules/ace-builds/src-min-noconflict');
	ace.require("ace/ext/language_tools");
    var editor = ace.edit(document.getElementById(id));
    editor.session.setMode("ace/mode/javascript");
	editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
	editor.on('focus', function(){
		currentEditor = editor;
	})
    editor.focus();
    var win = remote.getCurrentWindow();
    win.focus()
}

function changeSession(filepath) {
	var ses = editSessions[filepath];
	var titleDiv = document.getElementById(currentEditor.container.id+'Title')
	titleDiv.innerHTML = filepath
	currentEditor.setSession(ses);
}

function open(filepath = ""){
	if (filepath == "") {
		require('electron').remote.dialog.showOpenDialog(function (filenames) {
			if (filenames === undefined) {reject('filenames undefined')};
			var filename = filenames[0];
			open(filename);
		})
		return;
	}
	else if (filepath.startsWith('/') == false) {
			loc = window.location.pathname
			filepath = loc.substring(0, loc.lastIndexOf('/'))+'/'+filepath
		}
	if (editSessions[filepath]) {
        changeSession(filepath);
    }
    else {
   		var editor = currentEditor
		var titleDiv = document.getElementById(editor.container.id+'Title')
		titleDiv.innerHTML = filepath
	  	var filestring = read(filepath);
	  	var extn = path.extname(filepath);
	  	var language = "javascript"
	  	if (extn == ".js") { language = "javascript"}
	  	else if (extn == ".html") { language = "html"}
	  	else if (extn == ".py") { language = "python"}
	  	else if (extn == ".css") { language = "css"}
	  	else if (extn == ".md") { language = "markdown"}
	  	else if (extn == ".markdown") { language = "markdown"}
	  	else if (extn == ".tex") { language = "tex"}
	  	var ses = ace.createEditSession(filestring, 'ace/mode/'+language);
	  	ses.id = filepath;
	  	editSessions[filepath] = ses;
	  	editor.setSession(ses);
	  	editor.gotoLine(0);
	  	editor.focus();
    }
}

function save(){
	var ses = currentEditor.getSession();
	write(ses.id, ses.getValue())
}

module.exports = {
	createED:createED,
	open:open,
	save:save
};