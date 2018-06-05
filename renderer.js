var ipcRenderer = require(`electron`).ipcRenderer;

function executeArea() {
	var ed = document.getElementById('ed');
	eval(ed.value);
}