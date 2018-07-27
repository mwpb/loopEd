var fs = require('electron').remote.require('fs');
const {dialog, BrowserWindow} = require('electron').remote;

function write(filepath, filestring) {
	print('Saving: '+filepath)
	fs.writeFileSync(filepath, filestring);
}

function read(filepath){
	return fs.readFileSync(filepath).toString()
}

module.exports = {
    read:read,
	write:write
}