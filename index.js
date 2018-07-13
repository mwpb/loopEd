const {app, BrowserWindow} = require('electron')
const Menu = require('electron').Menu
const path = require('path')
const url = require('url')
var ipcMain = require('electron').ipcMain;

var template = [{},{
	label:'File',
	submenu:[{
		label:'Toggle Dev Tools',
		role:'toggleDevTools'
	},
	{
		label:'Quit',
		role:'quit'
	}]
}]

global.menu = Menu.buildFromTemplate(template)

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})
  win.setTitle('Infinity');

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools({mode:'bottom'});
  win.maximize();
  Menu.setApplicationMenu(global.menu);
}

app.on('ready', createWindow)
