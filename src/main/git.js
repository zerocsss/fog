const fs = require('fs')
const child_process = require("child_process");

var searchLocalGitBinary = function () {
  var result = "";
  var searchPath = process.env.PATH.split(":");
  for (var _i = 0, searchPath_1 = searchPath; _i < searchPath_1.length; _i++) {
    var path = searchPath_1[_i];
    var file = path + "/git";
    if (fs.existsSync(file)) {
      result = file;
      break;
    }
  }
  return result;
};

var getGitVersionByBinary = function (binary) {
  var version = child_process.execSync(binary + " --version").toString();
  return version;
};

exports.getGitVersionByBinary = getGitVersionByBinary;
exports.searchLocalGitBinary = searchLocalGitBinary