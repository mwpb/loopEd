var fs = require('fs');
var ipcMain = require('electron').ipcMain;
const {dialog, BrowserWindow} = require('electron')

// ipcMain.on('openDialog', function(event, receiverName) {
// 	dialog.showOpenDialog(function (filenames) {
// 	if (filenames === undefined) return;
// 	var filename = filenames[0];
// 	fs.readFile(filename, 'utf-8', 
// 	    function (err, data) {
// 	    	let mainwindow = BrowserWindow.getFocusedWindow();
//     		mainwindow.webContents.send(receiverName, {
//     			"filename":filename, 
//     			"filestring":data
//     		}); 
//     	})
//     })
// })
function opener(){
	return new Promise(function(resolve, reject){
		dialog.showOpenDialog(function (filenames) {
			if (filenames === undefined) return;
			var filename = filenames[0];
			var filestring = fs.readFileSync(filename, 'utf-8');
		    resolve({
		    	filestring:filestring,
		    	filename:filename
		    });
		});
	})
}

module.exports = {
	"openDialog":opener
}