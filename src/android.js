const shell = require('shelljs');

// Check gradle tasks for execution ability
function gradleTasksCheck(cwd) {
  shell.cd(cwd.concat('android'));
  let out = shell.exec('./gradlew tasks').code;
  shell.cd(cwd);
  return out ? false : true;
}

module.exports = {
  gradleTasksCheck: gradleTasksCheck
};
