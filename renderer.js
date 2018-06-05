var ipcRenderer = require(`electron`).ipcRenderer;

function openDialog(filename) {
	ipcRenderer.send('openDialog', 'setEd');
}

ipcRenderer.on('setEd', function(event, data) {
	var ed = document.getElementById('ed');
	ed.value = data.filestring;
})

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