import { ThemeType } from "../model/theme";
import { electronStore } from "../utils/electronStore";
import { switchTheme } from "../utils/theme";
export interface IAppearanceState {
  theme: Theme;
  gitBinary: string;
  defaultFolder: string;
}

const appearance = {
  state() {
    return {
      theme: electronStore.store.get("theme", ThemeType.System),
      gitBinary: electronStore.store.get("gitBinary"),
      defaultFolder: electronStore.store.get("defaultFolder"),
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
    }
  }
}

export default appearance