const {readFileAsync, read, write} = require('./fileUtils.js');
const {dialog, BrowserWindow} = require('electron').remote;
const {createED, executeArea, open, editSessions, save} = require('./ed.js');
const Menu = require('electron').remote.Menu


function readFile(filepath) {
	readFileAsync(filepath).then((data) =>
		{
			return data;
		})
}

function openDialog() {
	dialog.showOpenDialog(function (filenames) {
		if (filenames === undefined) {reject('filenames undefined')};
		var filename = filenames[0];
		// open(filename);
	})
}

function getHTML() {
	var body =  document.body.innerHTML;
	var ed = document.getElementById('ed');
	ed.value = body;
}

function setHTML() {
	var newHTML = document.getElementById('ed').value;
	document.body.innerHTML = newHTML;
}

function print(messagestring){
	console.log(messagestring);
}

function focus(id){
	var ele = document.getElementById(id);
	ele.focus();
}

// var newTemplate = template.push({
// 	label:"Execute Region",
// 	accelerator:"Cmd+Return",
// 	click:executeArea()
// });
// Menu.setApplicationMenu(Menu.buildFromTemplate(newTemplate));
//
// focus('first-ed');
// // createED();
// require('electron').remote.getCurrentWindow().webContents.focus();

var currentAceEditor = {}

function execute(){
	// console.log(currentAceEditor);
	editor = currentAceEditor;
	selectionRange = editor.getSelectionRange();

	selectionRange.start.column = 0;
	selectionRange.end.column = 999999999;

	content = editor.session.getTextRange(selectionRange);
	console.log(content)
	var win = BrowserWindow.getFocusedWindow().webContents
	win.webContents.executeJavaScript(content);
}

require('electron').remote.globalShortcut.register('CommandOrControl+Enter', () => {
      execute()
    })

var main = document.getElementById('main');
var ed = document.createElement('div')
ed.setAttribute('id','ed-init')
main.appendChild(ed)
createED('ed-init')
require('electron').remote.getCurrentWindow().webContents.focus();


