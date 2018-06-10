var ace = require('ace-builds/src-min-noconflict/ace.js');
var extLangTools = require('ace-builds/src-min-noconflict/ext-language_tools.js');
const path = require('path')
const {read} = require('./fileUtils.js');

var editSessions = [];
var currentFilePath = '';

function executeArea(divName) {
	var ed = ace.edit(divName);
	var win = BrowserWindow.getFocusedWindow().webContents
	win.webContents.executeJavaScript(ed.getValue());
}

function createED(divName){
	console.log('did mount');
	ace.config.set('basePath', 'node_modules/ace-builds/src-min-noconflict');
	ace.require("ace/ext/language_tools");
    var editor = ace.edit(divName);
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
}

function changeSession(filepath) {
	var ses = editSessions[filepath];
	currentFilePath = filepath;
	editor.setSession(ses);
	editor.focus();
}

function open(filepath){
	if (editSessions[filepath]) {
        changeSession(filepath);
    }
    else {
    	var editor = ace.edit(document.activeElement.parentElement.id);
    	var filestring = read(filepath);
        var extn = path.extname(filepath);
        var language = "javascript"
        if (extn == ".js") { language = "javascript"}
        else if (extn == ".html") { language = "html"}
        else if (extn == ".py") { language = "python"}
        else if (extn == ".css") { language = "css"}
        else if (extn == ".md") { language = "markdown"}
        else if (extn == ".markdown") { language = "markdown"}
        else if (extn == ".tex") { language = "tex"}
        var ses = ace.createEditSession(filestring, 'ace/mode/'+language);
        editSessions[filepath] = ses;
        currentFilePath = filepath;
        editor.setSession(ses);
        editor.gotoLine(0);
        editor.focus();
        // tabs.addTab(filepath);
    }
}

function save(divName){
	var ses = ace.edit(divName).getSession();
}

module.exports = {
	createED:createED,
	executeArea:executeArea,
	open:open
};
// sesList = []
// // ed = false

// var ED = {
// 	data:function(){
// 		return {
// 			sessions:sesList,
// 			editor:ed
// 		}
// 	},
// 	mounted:function(){
		
// 	},
// 	addSession: function(filepath, dataString) {
// 		console.log(this.data().editor);
// 		if (this.data().sessions[filepath]) {
// 	        this.changeSession(filepath);
// 	    }
// 	    else {
// 	        var extn = path.extname(filepath);
// 	        var currentFilePath = filepath;
// 	        var language = "javascript"
// 	        if (extn == ".js") { language = "javascript"}
// 	        else if (extn == ".html") { language = "html"}
// 	        else if (extn == ".py") { language = "python"}
// 	        else if (extn == ".css") { language = "css"}
// 	        else if (extn == ".md") { language = "markdown"}
// 	        else if (extn == ".markdown") { language = "markdown"}
// 	        else if (extn == ".tex") { language = "tex"}
// 	        var ses = ace.createEditSession(dataString, 'ace/mode/'+language);
// 	        sesList[filepath] = ses;
// 	        console.log('editor')
// 	        console.log(editor)
// 	        editor.setSession(ses);
// 	        editor.gotoLine(0);
// 	        editor.focus();
// 	        tabs.addTab(filepath);
// 	    }
// 	},		
//  	changeSession(name) {
// 		var ses = this.data().sessions[name];
// 		currentFilePath = name;
// 		console.log(this)
// 		console.log(this.data())
// 		editor.setSession(ses);
// 		editor.focus();
// 	},
// 	style: {
// 		height:'80ch',
// 		width:'80ch'
// 	},
// 	render:function(h){
// 		return h('div', {attrs:{id:'edDiv'}, 'style':ED.style}, 'unassigned editor')
// 	}
// }
// var tabList = []
// var tabs = {
// 	data:function(){
// 		return {
// 			tabl:tabList
// 		}
// 	},
// 	watch:{
// 		tabl:{
// 			handler: function(val,oldVal){console.log('newval');console.log(val)},
// 			deep:true
// 		}
// 	},
// 	render: function(h) {
// 		console.log(this.tabl);
// 		var newTabList = this.tabl.map(function(x){return h(x)})
// 		console.log(newTabList)
// 		return h('div', newTabList)
// 	},
// 	addTab: function(name) {
// 		console.log(this)
// 	    var tab = {
// 	    	render:function(h){
// 	    		return h('button', {on:{'click':function(){ED.changeSession(name)}}} , name)
// 	    	}
// 	    }
// 	    tabList.push(tab)
// 	    console.log(tabList)
// 	}
// }