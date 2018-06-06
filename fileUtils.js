var fs = require('fs');
var ipcMain = require('electron').ipcMain;
const {dialog, BrowserWindow} = require('electron')

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