import { ThemeType } from "../model/theme";
import { electronStore } from "../utils/electronStore";
import { switchTheme } from "../utils/theme";
import i18n from "../locale";
import { UpdateChannel, UpdateInterval } from "../model/update";
import { AutoFetch } from "../model/autoFetch";

const { ipcRenderer } = require('electron');

export interface IAppearanceState {
  // 主题
  theme: ThemeType;
  // git 二进制地址
  gitBinary: string;
  // 默认clone地址
  defaultFolder: string;
  // 语言
  language: string;
  // explorer 默认视图
  defaultExplorerType: 'service_account' | 'local'
  // 自动更新
  autoUpdate: boolean
  // 更新频率
  updateInterval: UpdateInterval
  // 更新渠道
  updateChannel: UpdateChannel
  // 快捷键启动
  isShortcutEnable: boolean
  // 登陆打开
  openOnLogin: boolean
  // 最后更新时间
  lastCheckUpdateTime?: Date
  // 自动fetch
  autoFetch: AutoFetch
  // commit 数量
  commitCounts: number
  // 终端app
  terminalApplication: string
  // 编辑器app
  IDEApplication: string
}

const appearance = {
  state() {
    return {
      theme: electronStore.store.get("theme", ThemeType.Dark),
      gitBinary: electronStore.store.get("gitBinary"),
      defaultFolder: electronStore.store.get("defaultFolder", ipcRenderer.sendSync("get-path", { name: 'home' })),
      language: electronStore.store.get("language", "en"),
      defaultExplorerType: electronStore.store.get("defaultExplorerType", "service_account"),
      autoUpdate: electronStore.store.get("autoUpdate", true),
      updateInterval: electronStore.store.get("updateInterval", UpdateInterval.Weekly),
      updateChannel: electronStore.store.get("updateChannel", UpdateChannel.Stable),
      isShortcutEnable: electronStore.store.get("isShortcutEnable", true),
      openOnLogin: electronStore.store.get("openOnLogin", true),
      lastCheckUpdateTime: electronStore.store.get("lastCheckUpdateTime"),
      autoFetch: electronStore.store.get('autoFetch', AutoFetch.Evert30Minutes),
      commitCounts: electronStore.store.get('commitCounts', 100),
      terminalApplication: electronStore.store.get('terminalApplication', 'Terminal'),
      IDEApplication: electronStore.store.get('IDEApplication', 'Visio Studio Code'),
    }
  },
  mutations: {
    themeChanged(state: IAppearanceState, theme: ThemeType) {
      state.theme = theme;
      switchTheme(theme)
      electronStore.store.set("theme", theme);
      ipcRenderer.send('theme-changed')
    },
    gitBinaryChanged(state: IAppearanceState, gitBinary: string) {
      state.gitBinary = gitBinary;
      electronStore.store.set("gitBinary", gitBinary);
    },
    defaultFolderChanged(state: IAppearanceState, defaultFolder: string) {
      state.defaultFolder = defaultFolder;
      electronStore.store.set("defaultFolder", defaultFolder);
    },
    languageChanged(state: IAppearanceState, language: string) {
      state.language = language;
      i18n.global.locale = language as 'en' | 'ch' | 'jp' | 'kor'
      electronStore.store.set("language", language);
      ipcRenderer.send('language-changed')
    },
    switchDefaultExplorerType(state: IAppearanceState, explorerType: 'service_account' | 'local') {
      state.defaultExplorerType = explorerType
      electronStore.store.set("defaultExplorerType", explorerType);
    },
    switchAutoUpdate(state: IAppearanceState, autoUpdate: boolean) {
      state.autoUpdate = autoUpdate
      electronStore.store.set("autoUpdate", autoUpdate);
    },
    switchUpdateInterval(state: IAppearanceState, updateInterval: UpdateInterval) {
      state.updateInterval = updateInterval
      electronStore.store.set("updateInterval", updateInterval);
    },
    switchUpdateChannel(state: IAppearanceState, updateChannel: UpdateChannel) {
      state.updateChannel = updateChannel
      electronStore.store.set("updateChannel", updateChannel);
    },
    switchShortcutEnable(state: IAppearanceState, isShortcutEnable: boolean) {
      state.isShortcutEnable = isShortcutEnable
      electronStore.store.set("isShortcutEnable", isShortcutEnable);
    },
    switchOpenOnLogin(state: IAppearanceState, openOnLogin: boolean) {
      state.openOnLogin = openOnLogin
      ipcRenderer.send('open-on-login-changed', openOnLogin)
      electronStore.store.set("openOnLogin", openOnLogin);
    },
    setLastCheckUpdateTime(state: IAppearanceState, lastCheckUpdateTime: Date) {
      state.lastCheckUpdateTime = lastCheckUpdateTime
      electronStore.store.set("lastCheckUpdateTime", lastCheckUpdateTime);
    },
    switchAutoFetch(state: IAppearanceState, autoFetch: AutoFetch) {
      state.autoFetch = autoFetch
      electronStore.store.set('autoFetch', autoFetch)
    },
    setCommitCounts(state: IAppearanceState, commitCounts: number) {
      state.commitCounts = commitCounts
      electronStore.store.set('commitCounts', commitCounts)
    },
    setTerminalApplication(state: IAppearanceState, terminalApplication: string) {
      state.terminalApplication = terminalApplication
      electronStore.store.set('terminalApplication', terminalApplication)
    },
    setIDEApplication(state: IAppearanceState, IDEApplication: string) {
      state.IDEApplication = IDEApplication
      electronStore.store.set("IDEApplication", IDEApplication);
    }
  }
}

export default appearance