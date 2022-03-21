const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path')

// electron-store 数据持久化
const { store, initRenderer } = require("./store")
// 菜单
const { createAppMenu } = require('./menu')
// 工具
const { getAuthorName, getAppWebsite, getCredits } = require("./utils")
// touchbar
const { touchBar } = require("./touchbar")
// 托盘菜单
const { initTary } = require("./tary")
// 窗口管理
const { windowsManager } = require("./windowsManager")
// 快捷键
const { defaultShortcuts } = require("./shortcut")
// 事件
const { EventName } = require('./events')
// git
const { indexLocalGitFolder } = require("./git")

// 初始化渲染进程的store实例
initRenderer()

// 设置 "关于" 面板选项
app.setAboutPanelOptions({
  applicationName: app.getName(),
  applicationVersion: app.getVersion(),
  version: app.getVersion(),
  credits: getCredits(),
  authors: getAuthorName(),
  website: getAppWebsite(),
  iconPath: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
})

var tray = null
let mainWin = null
let welcomeWin = null
let addServiceAccountWin = null
const homePath = app.getPath('home')

// 这段不知道放哪 就放着算了 懒得改了
ipcMain.on("close-welcome-and-open-main", () => {
  welcomeWin.close()
  windowsManager.removeWindow(welcomeWin)

  creatWindow()
})

ipcMain.on('add-service-Account', (e, arg) => {
  createAddServiceAccountWindow(arg.type)
  addServiceAccountWin.setAlwaysOnTop(true, 'floating')
  ipcMain.on("add-service-account-successed", (_, userInfo) => {
    e.returnValue = userInfo
    addServiceAccountWin.close()
  })
  ipcMain.on("add-service-account-canceled", () => {
    e.returnValue = null
    addServiceAccountWin.close()
  })
})

function creatWindow() {
  mainWin = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: app.getName(),
    resizable: true,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: "hidden",
    titleBarOverlay: process.platform === "win32",
    vibrancy: 'light',
    visualEffectState: "active",
    show: false,
    transparent: true,
    webPreferences: {
      spellcheck: false,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  mainWin.on('ready-to-show', () => { mainWin.show() })
  mainWin.loadURL("http://localhost:3000/")

  mainWin.webContents.openDevTools()

  windowsManager.addWindow(mainWin)
  windowsManager.setMainWindow(mainWin)
}

function createWelcoleWindow() {
  welcomeWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Welcome To Fog',
    resizable: false,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    show: false,
    visualEffectState: "active",
    transparent: true,
    webPreferences: {
      spellcheck: false,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  welcomeWin.on('ready-to-show', () => {
    welcomeWin.show()
    indexLocalGitFolder(path.resolve(homePath), [
      path.join(homePath, 'Applications'),
      path.join(homePath, 'Movies',),
      path.join(homePath, 'Music'),
      path.join(homePath, 'Pictures'),
      path.join(homePath, 'Downloads'),
      path.join(homePath, 'Library'),
      path.join(homePath, '.Trash'),
      path.join(homePath, 'Parallels')
    ]).then(localGitFolders => {
      let localGitFoldersObject = []
      localGitFolders.map(localGitFolder => {
        localGitFoldersObject.push({
          path: path.join(localGitFolder, '..'),
          name: path.join(localGitFolder, '..').split(path.sep).pop()
        })
      })
      welcomeWin.webContents.send('local-git-folders', localGitFoldersObject)
    })
  })

  welcomeWin.loadURL("http://localhost:3000/#/welcome")

  welcomeWin.webContents.openDevTools()

  windowsManager.addWindow(welcomeWin)
}

function createAddServiceAccountWindow(type) {
  addServiceAccountWin = new BrowserWindow({
    parent: welcomeWin,
    modal: true,
    width: 600,
    height: 320,
    title: 'Add Service Account',
    resizable: false,
    movable: false,
    show: false,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    transparent: true,
    webPreferences: {
      spellcheck: false,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  addServiceAccountWin.on('ready-to-show', () => {
    addServiceAccountWin.show()
    addServiceAccountWin.focus()
  })

  addServiceAccountWin.loadURL(encodeURI(`http://localhost:3000/#/addServiceAccount/${type}`))

  addServiceAccountWin.openDevTools()
}

app.whenReady().then(() => {
  tray = initTary()
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  const isFirstLoad = store.get('isFirstLoad', true)
  if (isFirstLoad) {
    createWelcoleWindow()
    // indexLocalGitFolder(path.join(homePath, 'Movies'), [
    // path.join(homePath, 'Movies', 'a'),
    // ])

  } else {
    creatWindow()
  }
  windowsManager.getMainWindow()?.setTouchBar(touchBar)
  // Menu.setApplicationMenu(createAppMenu(store.get("language", "en"), windowsManager.getMainWindow(), store.get('shortcutList', defaultShortcuts)))
})