function addProjectSwitcher(div) {
    var container = document.getElementById(div);
    var select = document.createElement('select');
    container.appendChild(select);
    var projectList = Object.keys(projects);
    const handler = {
        set(target, key, value) {
            print('fired')
            while (select.lastChild) {
                select.removeChild(select.lastChild);
            }
            for (i=0; i<projects.length;i++) {
                var project = projectList[i];
                var projectOption = document.createElement('option');
                projectOption.innerHTML = project[rootDir];
                select.appendChild(projectOption);
            }
        },
    };    
    projects = new Proxy(projects, handler);
}

module.exports = {
    addProjectSwitcher:addProjectSwitcher
}