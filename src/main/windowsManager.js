const { BrowserWindow } = require("electron");

class WindowsManager {
  constructor() {
    this.windows = [];
    this.activeWindow = null;
    this.mainWindow = null;
  }

  /**
   * 添加窗口
   * @param {BrowserWindow} window 窗口实例
   */
  addWindow(window) {
    this.windows.push(window);
    window.on('focus', () => this.setActiveWindow(window))
    window.on('blur', () => this.setActiveWindow(null))
  }


  /**
   * 移除窗口
   * @param {BrowserWindow} window 窗口实例
   */
  removeWindow(window) {
    let index = this.windows.indexOf(window);
    if (index > -1) {
      this.windows.splice(index, 1);
    }
  }

  /**
   * 获取窗口
   * @param {string} id 窗口id
   */
  getWindow(id) {
    for (let i = 0; i < this.windows.length; i++) {
      if (this.windows[i].id === id) {
        return this.windows[i];
      }
    }
    return null;
  }

  /**
   * 获取所有窗口
   * @returns {BrowserWindow[]}
   */
  getAllWindows() {
    return this.windows;
  }

  /**
   * 获取激活窗口
   * @returns {BrowserWindow}
   */
  getActiveWindow() {
    return this.activeWindow;
  }

  /**
   * 设置激活窗口
   * @param {BrowserWindow} window 窗口实例
   */
  setActiveWindow(window) {
    this.activeWindow = window;
  }

  /**
   * 获取主窗口
   * @returns {BrowserWindow}
   */
  getMainWindow() {
    return this.mainWindow;
  }


  /**
   * 设置主窗口
   * @param {BrowserWindow} window 窗口实例
   */
  setMainWindow(window) {
    this.mainWindow = window;
  }
}

exports.windowsManager = new WindowsManager()