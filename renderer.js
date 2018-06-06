var ipcRenderer = require(`electron`).ipcRenderer;
const opener = require('electron').remote.require('./fileUtils.js');

function openDialog() {
	opener.openDialog().then(function(file){
		var ed = document.getElementById('ed');
		ed.value = file.filestring;
	})
}

// ipcRenderer.on('setEd', function(event, data) {
// 	var ed = document.getElementById('ed');
// 	ed.value = data.filestring;
// })

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
	eval(ed.value);
}