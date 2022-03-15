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

// 这段不知道放哪 就放着算了 懒得改了
ipcMain.on("close-welcome-and-open-main", () => {
  welcomeWin.close()
  windowsManager.removeWindow(welcomeWin)

  creatWindow()
})

ipcMain.on('add-service-Account', (e, arg) => {
  const addServiceAccountWin = createAddServiceAccountWindow(arg.type)
  addServiceAccountWin.setAlwaysOnTop(true, 'floating')
  addServiceAccountWin.on('close', () => {
    e.returnValue = ''
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
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    opacity: store.get('windowOpacity' || 0.9),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  mainWin.loadURL("http://localhost:3000/")

  mainWin.webContents.openDevTools()

  windowsManager.addWindow(mainWin)
  windowsManager.setMainWindow(mainWin)
}

function createWelcoleWindow() {
  welcomeWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Welcome to fog',
    resizable: false,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    opacity: store.get('windowOpacity' || 0.9),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  welcomeWin.loadURL("http://localhost:3000/#/welcome")

  welcomeWin.webContents.openDevTools()

  windowsManager.addWindow(welcomeWin)

}

function createAddServiceAccountWindow(type) {
  addServiceAccountWin = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Welcome to fog',
    resizable: false,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    opacity: store.get('windowOpacity' || 0.9),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  addServiceAccountWin.loadURL(`http://localhost:3000/#/addServiceAccount/${type}`)
  addServiceAccountWin.webContents.openDevTools()

  windowsManager.addWindow(addServiceAccountWin)

  return addServiceAccountWin
}

app.whenReady().then(() => {
  tray = initTary()
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  const isFirstLoad = store.get('isFirstLoad', true)
  if (isFirstLoad) {
    createWelcoleWindow()
  } else {
    creatWindow()
  }
  windowsManager.getMainWindow()?.setTouchBar(touchBar)
  // Menu.setApplicationMenu(createAppMenu(store.get("language", "en"), windowsManager.getMainWindow(), store.get('shortcutList', defaultShortcuts)))
})