import { IAppearanceState } from "./appearance";
import { IShortcutState } from "./shortcut";

export interface IState {
  appearance: IAppearanceState,
  shortcut: IShortcutState
}