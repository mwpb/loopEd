const {readFileAsync, read, write} = require('./fileUtils.js');
const {dialog, BrowserWindow} = require('electron').remote;
const {createED, open, save} = require('./ed.js');
const Menu = require('electron').remote.Menu;
const {editSessions, projects, addProject, changeProject} = require('./projectUtils.js');
const {addProjectSwitcher} = require('./projectSwitcher.js');

function print(messagestring){
	console.log(messagestring);
}

var currentEditor = {}
var prevEditor = {}
var rootDir = ''

// const obj = {}
// const handler = {
//   set(target, key, value) {
// 	  var sessionList = document.getElementById('sessionList')
// 	  var ele = document.createElement('li')
// 	  var button = document.createElement('button')
// 	  button.onclick = function(){ open(key)}
// 	  button.innerHTML = key
// 	  ele.appendChild(button)
// 	  sessionList.appendChild(ele)
//     target[key] = value;
//   },
// };
// const editSessions = new Proxy(obj, handler);

// function addProject() {
// 	if (currentTitle == '') { return }
//     var projectSelect = document.getElementById('projects')
//     var option = document.createElement('option')
//     option.innerHTML = currentTitle
//     projectList.push(currentTitle)
//     projectSelect.appendChild(option)
// }

// const projectHandler = {
//     set(target, key, value) {
//         var projectSelect = document.getElementById('projects')
//         var ele = document.createElement('li')
//         var button = document.createElement('button')
//         button.onclick = function(){ open(key)}
//         button.innerHTML = key
//         ele.appendChild(button)
//         sessionList.appendChild(ele)
//         target[key] = value;
//     },
// };
// const obj2 = []
// const projects = new Proxy(obj2, projectHandler)

function execute(){
	editor = currentEditor;
	selectionRange = editor.getSelectionRange();
	
	selectionRange.start.column = Math.max(selectionRange.start.column-1,0)
	prevCharacter = editor.session.getTextRange(selectionRange);
	if (prevCharacter == ')') {
		selectionRange.start.column = 0;
		line = editor.session.getTextRange(selectionRange);
		index = line.lastIndexOf(' ')
// 		console.log(index)
		if (index>-2) {
			selectionRange.start.column = index
			content = editor.session.getTextRange(selectionRange);
			var range = editor.selection.getRange()
			range.start.column = index
			editor.session.replace(range,'')
			var win = BrowserWindow.getFocusedWindow().webContents
			win.webContents.executeJavaScript(content);	
		}
		else {
			selectionRange.start.column = 0;
			selectionRange.end.column = 999999999;

			var content = editor.session.getTextRange(selectionRange);
			var win = BrowserWindow.getFocusedWindow().webContents
			win.webContents.executeJavaScript(content);	
		}
	}
	else{
		selectionRange.start.column = 0;
		selectionRange.end.column = 999999999;

		content = editor.session.getTextRange(selectionRange);
// 		console.log(content)
		var win = BrowserWindow.getFocusedWindow().webContents
		win.webContents.executeJavaScript(content);	
	}
}

function full_reload(){
    require('electron').remote.app.relaunch();
    require('electron').remote.app.exit(0);
}

var template = [
	{},
	{
		label:'File',
		submenu:[
			{
				label:'Copy',
				accelerator:'CommandOrControl+c',
				role:'copy'
			},
			{
				label:'Paste',
				accelerator:'CommandOrControl+v',
				role:'paste'
			},
    		{
    			label:'Cut',
    			accelerator:'CommandOrControl+x',
    			role:'cut'
    		},
    		{
    			label:'Full Reload',
    			accelerator:'CommandOrControl+Shift+r',
    			click:full_reload
    		},
    		{
        		label:'Toggle Dev Tools',
        		role:'toggleDevTools'
        	},
        	{
        		label:'Quit!!!',
        		role:'quit'
        	}]
	    
	},
	{
	    label:'Window',
	    submenu:[
	        {
	            label:'Execute',
	            accelerator:'CommandOrControl+Enter',
	            click:() => {execute()}
	        },
	        {
	            label:'Open',
	            accelerator:'CommandOrControl+o',
	            click:() => {open()}
	        },
	        {
	            label:'Focus DevTools',
	            accelerator:'CommandOrControl+;',
	            click:() => {require('electron').remote.getCurrentWindow().devToolsWebContents.focus();}
	        },
	        {
	            label:'Close (Go To Scratch)',
	            accelerator:'CommandOrControl+w',
	            click:() => {open('scratch.js');}
	        },
	        {
	            label:'Save',
	            accelerator:'CommandOrControl+s',
	            click:() => {save()}
	        },
	        {
	            label:'Focus Previous',
	            accelerator:'CommandOrControl+Shift+[',
	            click:() => {
	                prevEditor.focus();
                    var win = require('electron').remote.getCurrentWindow();
                    win.webContents.focus()
	            }
	        },
	        {
	            label:'Focus Previous',
	            accelerator:'CommandOrControl+Shift+]',
	            click:() => {
	                prevEditor.focus();
                    var win = require('electron').remote.getCurrentWindow();
                    win.webContents.focus()
	            }
	        }
	        ]
	}]
Menu.setApplicationMenu(Menu.buildFromTemplate(template));


var main = document.getElementById('main');
var ed = document.createElement('div')
ed.setAttribute('id','ed-init')
main.appendChild(ed)
createED('right')
createED('left')
addProjectSwitcher('projectSwitcher');

