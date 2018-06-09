const opener = require('./fileUtils.js');
const readFileAsync = require('./fileUtils.js').readFileAsync;
const {BrowserWindow} = require('electron').remote;

function readFile(filepath) {
	readFileAsync(filepath).then((data) =>
		{
			return data;
		})
}

async function openDialog() {
	var filedata = await opener.openDialog();
	var ed = document.getElementById('ed');
	ed.value = filedata.filestring;
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

function executeArea() {
	var ed = document.getElementById('ed');
	var win = BrowserWindow.getFocusedWindow().webContents
	win.webContents.executeJavaScript(ed.value);
}