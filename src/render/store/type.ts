import { IAppearanceState } from "./appearance";
import { IServiceAccountState } from "./serviceAccount";
import { IShortcutState } from "./shortcut";

export interface IState {
  appearance: IAppearanceState,
  shortcut: IShortcutState,
  serviceAccount: IServiceAccountState
}