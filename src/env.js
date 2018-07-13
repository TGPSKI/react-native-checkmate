const { dirsCheck } = require('./general.js');

// Check environment variables for presence
function envVarsCheck(envVars) {
  const envErrors = [];
  const filterEnv = [];

  envVars.forEach(envVar => {
    if (!!process.env[envVar] === false) {
      envErrors.push(`"${envVar}" variable is undefined`);
      filterEnv.push(envVar);
    }
  });

  const filteredEnv = envVars.filter(envVar => !filterEnv.includes(envVar));
  const pathsToCheck = filteredEnv.map(envVar => process.env[envVar]);
  const pathsErrors = dirsCheck(pathsToCheck);

  if (envErrors.length) {
    if (pathsErrors.constructor === Array) {
      // Combine path and env error arrays if present
      return envErrors.concat(pathsErrors);
    } else {
      // Just env errors
      return envErrors;
    }
  } else {
    // All checks pass
    return true;
  }
}

module.exports = {
  envVarsCheck: envVarsCheck
};
