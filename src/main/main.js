const { app, BrowserWindow, Tray, Menu, ipcMain, dialog, globalShortcut, MenuItem } = require("electron")
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
require('./events')

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

function creatWindow() {
  mainWin = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: 'lver',
    resizable: true,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    resizable: true,
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

app.whenReady().then(() => {
  tray = initTary()
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  creatWindow()
  win.setTouchBar(touchBar)
  Menu.setApplicationMenu(createAppMenu(store.get("language", "en"), win, store.get('shortcutList', defaultShortcuts)))
})