const {app, BrowserWindow} = require('electron')
const Menu = require('electron').Menu
const path = require('path')
const url = require('url')
var ipcMain = require('electron').ipcMain;
var fileUtils = require('./fileUtils.js');

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
  win.maximize();
}

app.on('ready', createWindow)
