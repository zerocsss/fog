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
}

const appearance = {
  state() {
    return {
      theme: electronStore.store.get("theme", ThemeType.Dark),
      gitBinary: electronStore.store.get("gitBinary"),
      defaultFolder: electronStore.store.get("defaultFolder", ipcRenderer.sendSync("get-path", { name: 'home' })),
      language: electronStore.store.get("language", "en"),
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
    }
  }
}

export default appearance