const {readFileAsync, read, write, opener} = require('./fileUtils.js');
const {BrowserWindow} = require('electron').remote;
const {createED, executeArea, open, editSessions, save} = require('./ed.js');

async function openDialog() {
	var filedata = await opener.openDialog();
	var ed = document.getElementById('ed');
	ed.value = filedata.filestring;
}