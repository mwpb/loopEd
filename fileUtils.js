var fs = require('electron').remote.require('fs');
const {dialog, BrowserWindow} = require('electron').remote;

function readFilePromise(filepath) {
	return new Promise(function(resolve, reject){
		fs.readFile(filepath, (err, data) => {
			if (err) {
				reject(err)
			}
			else {
				resolve({
					filepath:filepath,
					filestring:data.toString()
				})
			}
		})
	})
}

function openFilePromise(){
	return new Promise(function(resolve, reject){
		dialog.showOpenDialog(async function (filenames) {
			if (filenames === undefined) {reject('filenames undefined')};
			var filename = filenames[0];
			var filedata = await readFilePromise(filename);
			resolve(filedata);
		})
	})
}

async function opener(){
	return await openFilePromise();
}

module.exports = {
	"openDialog":opener,
	"readFileAsync":readFilePromise
}