const {app, BrowserWindow} = require('electron')
const Menu = require('electron').Menu
const path = require('path')
const url = require('url')
var ipcMain = require('electron').ipcMain;

function createWindow () {
  win = new BrowserWindow()
  win.setTitle('LoopEd');
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  init = true
  win.webContents.on('devtools-opened', () => {
	  if(init == true){
		  win.webContents.focus();	  	
	  }
	  init = false;
  });
  win.webContents.openDevTools({mode:'bottom'});
  win.maximize();
}

app.on('ready', createWindow)
