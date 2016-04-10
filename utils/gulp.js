var fs = require('fs');

function registerTask(taskPath) {

    require(taskPath);
}


function registerTasks(tasksPath) {
    function fullPath(fileName) {
        return tasksPath + '/' + fileName;
    }

    var fileNames = fs.readdirSync(tasksPath);

    fileNames.map(fullPath)
             .forEach(registerTask);
}

module.exports.registerTasks = registerTasks;
