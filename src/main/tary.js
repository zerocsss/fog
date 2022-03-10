const { Menu, Tray } = require('electron')
const path = require("path")

const trayContextMenuTemplate = []

const trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate)

exports.initTary = () => {
  const tary = new Tray(path.join(__dirname, '..', 'build', 'icons', 'tary.png'))
  tary.setContextMenu(trayContextMenu)
  return tary
}

