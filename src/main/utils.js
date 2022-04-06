const path = require('path')
const fs = require('fs')

exports.isMac = process.platform === 'darwin'
exports.isWin = process.platform === 'win32'

/**
 * 作者名
 */
const getAuthorName = () => "XieYuanCode"
exports.getAuthorName = getAuthorName

/**
 * app网站
 */
exports.getAppWebsite = () => "81.70.22.185"

/**
 * 信用信息
 */
exports.getCredits = () => `Copyright © 2022-2050 ${getAuthorName()}`

/**
 * 获取目录中所有app
 * @param {根目录} root 
 */
const getApps = (root) => {
  const apps = []
  const children = fs.readdirSync(root, {
    withFileTypes: true
  })

  for (let index = 0; index < children.length; index++) {
    const child = children[index].name;
    if (child.endsWith(".app")) {
      apps.push(child)
    } else {
      if(!child.includes("Adobe") && !child.includes("Python")) {
        const childPath = path.join(root, child)
        if (fs.statSync(childPath).isDirectory() === true) {
          const innerChildren = getApps(childPath)
          innerChildren && apps.push(...innerChildren)
        }
      }
    }
  }

  if (apps.length > 0) {
    return apps
  }
}

exports.getApps = getApps