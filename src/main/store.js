const Store = require("electron-store")

const store = new Store()

const initRenderer = () => {
  Store.initRenderer()
}

exports.store = store;
exports.initRenderer = initRenderer;