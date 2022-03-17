const fs = require('fs')
const child_process = require("child_process");
const { join, resolve } = require('path');
const { isWin } = require("./utils")
const globby = require("globby")

var searchLocalGitBinary = function () {
  var result = "";
  var searchPath = isWin ? process.env.PATH.split(";") : process.env.PATH.split(":");
  for (var _i = 0, searchPath_1 = searchPath; _i < searchPath_1.length; _i++) {
    var path = searchPath_1[_i];
    var file = isWin ? join(path, "git.exe") : join(path, "git");
    if (fs.existsSync(file)) {
      result = file;
      break;
    }
  }
  return result;
};

var getGitVersionByBinary = function (binary) {
  var version = isWin ?
    child_process.execSync(`"${binary}"` + " --version").toString() :
    child_process.execSync(binary + " --version").toString();
  return version;
};

const getGigGlobalConfig = function (binary) {
  var config = isWin ?
    child_process.execSync(`"${binary}"` + " config --global --list").toString() :
    child_process.execSync(binary + " config --global --list").toString();
  return config;
}

const setGitGlobalConfig = function (binary, key, value) {
  console.log('binary', binary);
  console.log('key', key);
  console.log('value', value);
  const _ = isWin ?
    child_process.execSync(`"${binary}"` + " config --global " + key + " " + `"${value}"`).toString() :
    child_process.execSync(binary + " config --global " + key + " " + `"${value}"`).toString();

}

/**
 * 
 * @param {string} root 
 * @param { string[] } exclude 
 */
const indexLocalGitFolder = function (root, exclude) {
  const patterns = [join(root, '**', '.git'), ...exclude.map(ex => "!" + resolve(ex, '**', '.git'))]
  return globby(patterns, {
    'onlyDirectories': true,
    deep: 5
  })
}

exports.getGitVersionByBinary = getGitVersionByBinary;
exports.searchLocalGitBinary = searchLocalGitBinary;
exports.getGigGlobalConfig = getGigGlobalConfig;
exports.setGitGlobalConfig = setGitGlobalConfig;
exports.indexLocalGitFolder = indexLocalGitFolder;