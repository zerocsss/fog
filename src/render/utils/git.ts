const { ipcRenderer } = require('electron');

export const searchExistGitBinary = (): string => {
  const existGitBinary = ipcRenderer.sendSync('search-local-git-binary')
  return existGitBinary
}