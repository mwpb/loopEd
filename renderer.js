const {readFileAsync, read, write} = require('./fileUtils.js');
const {dialog, BrowserWindow} = require('electron').remote;
const {createED, open, save} = require('./ed.js');
const Menu = require('electron').remote.Menu;

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
	  button.onclick = function(){ open(key)}
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
	
	selectionRange.start.column = Math.max(selectionRange.start.column-1,0)
	prevCharacter = editor.session.getTextRange(selectionRange);
	if (prevCharacter == ')') {
		console.log('getting single command.')
		selectionRange.start.column = 0;
		line = editor.session.getTextRange(selectionRange);
		index = line.lastIndexOf(' ')
		console.log(index)
		if (index>-2) {
		    console.log('trimming')
			selectionRange.start.column = index
			content = editor.session.getTextRange(selectionRange);
			console.log(content)
			var range = editor.selection.getRange()
			range.start.column = index
			editor.session.replace(range,'')
			console.log(range)
			var win = BrowserWindow.getFocusedWindow().webContents
			win.webContents.executeJavaScript(content);	
		}
		else {
			selectionRange.start.column = 0;
			selectionRange.end.column = 999999999;

			var content = editor.session.getTextRange(selectionRange);
			console.log(content)
			var win = BrowserWindow.getFocusedWindow().webContents
			win.webContents.executeJavaScript(content);	
		}
	}
	else{
		selectionRange.start.column = 0;
		selectionRange.end.column = 999999999;

		content = editor.session.getTextRange(selectionRange);
		console.log(content)
		var win = BrowserWindow.getFocusedWindow().webContents
		win.webContents.executeJavaScript(content);	
	}
}

require('electron').remote.globalShortcut.register('CommandOrControl+Enter', () => {
	execute()
})
require('electron').remote.globalShortcut.register('CommandOrControl+;', () => {
	require('electron').remote.getCurrentWindow().devToolsWebContents.focus();
})
require('electron').remote.globalShortcut.register('CommandOrControl+o', () => {
	open();
})
require('electron').remote.globalShortcut.register('CommandOrControl+s', () => {
	save();
})

var main = document.getElementById('main');
var ed = document.createElement('div')
ed.setAttribute('id','ed-init')
main.appendChild(ed)
createED('right')
createED('left')
// require('electron').remote.getCurrentWindow().webContents.focus();


