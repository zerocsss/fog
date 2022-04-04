import { ThemeType } from "../model/theme";
import { electronStore } from "../utils/electronStore";
import { switchTheme } from "../utils/theme";
import i18n from "../locale";
import { UpdateChannel, UpdateInterval } from "../model/update";

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
}

const appearance = {
  state() {
    return {
      // 主题
      theme: electronStore.store.get("theme", ThemeType.Dark),
      // git 二进制地址
      gitBinary: electronStore.store.get("gitBinary"),
      // 默认clone地址
      defaultFolder: electronStore.store.get("defaultFolder", ipcRenderer.sendSync("get-path", { name: 'home' })),
      // 语言
      language: electronStore.store.get("language", "en"),
      // explorer 默认视图
      defaultExplorerType: electronStore.store.get("defaultExplorerType", "service_account"),
      // 自动更新
      autoUpdate: electronStore.store.get("autoUpdate", true),
      // 更新频率
      updateInterval: electronStore.store.get("updateInterval", UpdateInterval.Weekly),
      // 更新渠道
      updateChannel: electronStore.store.get("updateChannel", UpdateChannel.Stable),
      // 快捷键启动
      isShortcutEnable: electronStore.store.get("isShortcutEnable", true),
      // 登陆打开
      openOnLogin: electronStore.store.get("openOnLogin", true),
      // 最后更新时间
      lastCheckUpdateTime: electronStore.store.get("lastCheckUpdateTime"),
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
    }
  }
}

export default appearance