const {readFileAsync, read, opener} = require('./fileUtils.js');
const {BrowserWindow} = require('electron').remote;
const {createED, executeArea, open, editSessions} = require('./ed.js');

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

function print(messagestring){
	console.log(messagestring);
}
