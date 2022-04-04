const { ipcMain, app, dialog, Menu } = require("electron")
const { windowsManager } = require("./windowsManager")
const { searchLocalGitBinary, getGitVersionByBinary, getGigGlobalConfig, setGitGlobalConfig } = require("./git")
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

    /**
     * 搜索本地git二进制文件
     */
    SearchLocalGitBinary: "search-local-git-binary",

    /**
     * 获取app各种路径
     */
    GetPath: "get-path",

    /**
     * 获取Git全局配置
     */
    GetGitGlobalConfig: "get-git-global-config",

    /**
     * 设置Git全局配置
     */
    SetGitGlobalConfig: "set-git-global-config",

    /**
     * 打开设置
     */
    OpenSettingView: "open-setting-view",
    // 主题更新
    ThemeChanged: "theme-changed",
}
ipcMain.on(EventName.ThemeChanged, () => {
    windowsManager.getAllWindows().forEach(win => {
        console.log(123123123);
        win.webContents.send("ThemeChanged")
    })
})

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
            activeWindow && activeWindow.webContents.send('context-menu-click', item.id)
        }
    })

    contentMenu.popup({
        window: activeWindow,
        x: arg.x,
        y: arg.y
    })
})

ipcMain.on(EventName.SearchLocalGitBinary, (e, arg) => {
    let result = null;
    const localGitBinary = searchLocalGitBinary()
    if (localGitBinary) {
        const gitVersion = getGitVersionByBinary(localGitBinary)
        result = localGitBinary + "(" + gitVersion + ")"
    }
    e.returnValue = result
})

ipcMain.on(EventName.GetPath, (e, arg) => {
    e.returnValue = app.getPath(arg.name)
})

ipcMain.on(EventName.GetGitGlobalConfig, (e, arg) => {
    e.returnValue = getGigGlobalConfig(arg.binary)
})


ipcMain.on(EventName.SetGitGlobalConfig, (e, arg) => {
    setGitGlobalConfig(arg.binary, arg.key, arg.value)
})