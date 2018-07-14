const {readFileAsync, read, write} = require('./fileUtils.js');
const {dialog, BrowserWindow} = require('electron').remote;
const {createED, open, save} = require('./ed.js');
const Menu = require('electron').remote.Menu

function print(messagestring){
	console.log(messagestring);
}

var currentEditor = {}

const obj = {}
const handler = {
  set(target, key, value) {
	  var sessionList = document.getElementById('sessionList')
	  var ele = document.createElement('li')
	  var button = document.createElement('button')
	  button.innerHTML = key
	  ele.appendChild(button)
	  sessionList.appendChild(ele)
    // console.log(`Setting value ${key} as ${value}`)
    target[key] = value;
  },
};

const editSessions = new Proxy(obj, handler);

function execute(){
	editor = currentEditor;
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


