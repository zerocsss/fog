import { electronStore } from "../utils/electronStore";
export interface IAppearanceState {
  gitBinary: string;
}

const appearance = {
  state() {
    return {
      gitBinary: electronStore.store.get("gitBinary", "123123"),
    }
  },
  mutations: {
    gitBinaryChanged(state: IAppearanceState, gitBinary: string) {
      state.gitBinary = gitBinary;
      electronStore.store.set("gitBinary", gitBinary);
    }
  }
}

export default appearance