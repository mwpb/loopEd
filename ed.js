var ace = require('ace-builds/src-min-noconflict/ace.js');
var extLangTools = require('ace-builds/src-min-noconflict/ext-language_tools.js');
const path = require('path')

function executeArea() {
	var ed = ace.edit('ed');
	var win = BrowserWindow.getFocusedWindow().webContents
	win.webContents.executeJavaScript(ed.getValue());
}

function createED(divName){
	console.log('did mount');
	ace.config.set('basePath', 'node_modules/ace-builds/src-min-noconflict');
	ace.require("ace/ext/language_tools");
    editor = ace.edit(divName);
    ed = editor;
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
}

module.exports = {
	createED:createED,
	executeArea:executeArea
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
// 	addSession: function(filename, dataString) {
// 		console.log(this.data().editor);
// 		if (this.data().sessions[filename]) {
// 	        this.changeSession(filename);
// 	    }
// 	    else {
// 	        var extn = path.extname(filename);
// 	        var currentFilePath = filename;
// 	        var language = "javascript"
// 	        if (extn == ".js") { language = "javascript"}
// 	        else if (extn == ".html") { language = "html"}
// 	        else if (extn == ".py") { language = "python"}
// 	        else if (extn == ".css") { language = "css"}
// 	        else if (extn == ".md") { language = "markdown"}
// 	        else if (extn == ".markdown") { language = "markdown"}
// 	        else if (extn == ".tex") { language = "tex"}
// 	        var ses = ace.createEditSession(dataString, 'ace/mode/'+language);
// 	        sesList[filename] = ses;
// 	        console.log('editor')
// 	        console.log(editor)
// 	        editor.setSession(ses);
// 	        editor.gotoLine(0);
// 	        editor.focus();
// 	        tabs.addTab(filename);
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