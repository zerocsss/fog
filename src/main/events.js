const { ipcMain, app, dialog } = require("electron")
const { windowsManager } = require("./windowsManager")
const fs = require("fs")

const EventName = {
  /**
   * 透明度改变
   */
  OpacityChanged: "opacity-changed",
  /**
   * 登陆打开状态改变
   */
  OpenOnLoginChanged: "open-on-login-changed",

  /**
   * 打开目录选择
   */
  ShowOpenDialog: "show-open-dialog",

  /**
   * 删除文件
   */
  DeleteFile: "delete-file",

  /**
   * 打开右键菜单
   */
  ShowContextMenu: "show-context-menu",
}

// 透明度改变
ipcMain.on(EventName.OpacityChanged, (_, arg) => {
  const windows = windowsManager.getAllWindows()
  windows.forEach(window => {
    window.setOpacity(arg)
  });
})

// 登陆打开状态改变
ipcMain.on(EventName.OpenOnLoginChanged, (_, arg) => app.setLoginItemSettings({ openAtLogin: arg }))

// 打开目录选择
ipcMain.on(EventName.ShowOpenDialog, (e, arg) => {
  const folder = dialog.showOpenDialogSync({
    title: arg.title,
    properties: ['openDirectory']
  })

  e.returnValue = folder
})

// 删除文件
ipcMain.on(EventName.DeleteFile, (e, arg) => fs.rmSync(arg))

// 右键菜单
ipcMain.on(EventName.ShowContextMenu, (_, arg) => {
  const contentMenu = Menu.buildFromTemplate(arg.contentMenuTemplate)
  const activeWindow = windowsManager.getActiveWindow()
  contentMenu.items.forEach(item => {
    item.click = () => {
      activeWindow && win.webContents.send('context-menu-click', item.id)
    }
  })

  contentMenu.popup({
    window: activeWindow,
    x: arg.x,
    y: arg.y
  })
})