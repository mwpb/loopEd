var ipcRenderer = require(`electron`).ipcRenderer;

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