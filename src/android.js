const shell = require('shelljs');

const cwd = process.cwd().concat('/');

// Check gradle tasks for execution ability
function gradleTasksCheck() {
  shell.cd(cwd.concat('android'));
  let out = shell.exec('./gradlew tasks').code;
  shell.cd(cwd);
  return out ? false : true;
}

module.exports = {
  gradleTasksCheck: gradleTasksCheck
};
