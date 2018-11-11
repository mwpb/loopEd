var editSessions = new Proxy([],{})
var loc = window.location.pathname;
var configFilePath = loc.substring(0, loc.lastIndexOf('/'))+'/projects.js';
var projects = new Proxy(JSON.parse(read(configFilePath)), {});

function changeProject(projectName) {
    var project = projects[projectName]
    if (projects[projectName]) {
        rootDir = project['rootDir']
        editSessions = project['editSessions']
    } else {
        print('Project does not exist.')
    }
}

function addProject(projectName) {
    projects[projectName] = {
        'root':Object.keys(editSessions)[0],
        'editSessions':editSessions
    }
    print(projects[projectName]);
    var json = JSON.stringify(projects)
    write(configFilePath, json)
}

module.exports = {
    projects:projects,
    changeProject:changeProject,
    addProject:addProject,
    editSessions:editSessions
}