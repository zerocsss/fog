const { ipcRenderer } = require('electron');
import { isWin } from "./system"

type GigConfigJson = {
  [key: string]: string
}

const parseGitConfig = (config: string) => {
  const lines = isWin() ? config.split('\n') : config.split('\r\n');
  const gitConfig = {} as GigConfigJson;
  for (let line of lines) {
    if (line) {
      const [key, value] = line.split('=');
      gitConfig[key] = value;
    }
  }
  return gitConfig;
}

export const searchExistGitBinary = (): string => {
  const existGitBinary = ipcRenderer.sendSync('search-local-git-binary')
  return existGitBinary
}

export const getGlobalGitConfig = (binary: string) => {
  const globalConfig = ipcRenderer.sendSync('get-git-global-config', { binary: binary.split("(")[0] })

  return parseGitConfig(globalConfig)
}

export const setGlobalGitName = (binary: string, name: string) => {
  ipcRenderer.send('set-git-global-config', { binary: binary.split("(")[0], key: 'user.name', value: name })
}

export const setGlobalGitEmail = (binary: string, email: string) => {
  ipcRenderer.send('set-git-global-config', { binary: binary.split("(")[0], key: 'user.email', value: email })
}