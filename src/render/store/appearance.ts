import { ThemeType } from "../model/theme";
import { electronStore } from "../utils/electronStore";
import { switchTheme } from "../utils/theme";
import i18n from "../locale";

const { ipcRenderer } = require('electron');

export interface IAppearanceState {
  language: string;
  theme: ThemeType;
  gitBinary: string;
  defaultFolder: string;
  settingViewVisible: boolean;
  defaultExplorerType: 'service_account' | 'local'
}

const appearance = {
  state() {
    return {
      theme: electronStore.store.get("theme", ThemeType.Dark),
      gitBinary: electronStore.store.get("gitBinary"),
      defaultFolder: electronStore.store.get("defaultFolder", ipcRenderer.sendSync("get-path", { name: 'home' })),
      language: electronStore.store.get("language", "en"),
      settingViewVisible: false,
      defaultExplorerType: 'service_account'
    }
  },
  mutations: {
    themeChanged(state: IAppearanceState, theme: ThemeType) {
      state.theme = theme;
      switchTheme(theme)
      electronStore.store.set("theme", theme);
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
    switchSettingViewVisible(state: IAppearanceState, visible: boolean) {
      state.settingViewVisible = visible
    },
    switchDefaultExplorerType(state: IAppearanceState, explorerType: 'service_account' | 'local') {
      state.defaultExplorerType = explorerType
      electronStore.store.set("defaultExplorerType", explorerType);
    }
  }
}

export default appearance