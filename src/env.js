const { dirsCheck } = require('./general.js');

// Check environment variables for presence
function envVarsCheck(envVars) {
  const envErrors = [];
  const pathsToCheck = envVars.map(envVar => process.env[envVar]);
  const pathsErrors = dirsCheck(pathsToCheck);

  envVars.forEach(envVar => {
    if (!!process.env[envVar] === false) {
      envErrors.push(`${envVar} variable is undefined`);
    }
  });

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
