exports.isMac = process.platform === 'darwin'
exports.isWin = process.platform === 'win32'

/**
 * 作者名
 */
const getAuthorName = () => "XieYuanCode"
exports.getAuthorName = getAuthorName

/**
 * app网站
 */
exports.getAppWebsite = () => "81.70.22.185"

/**
 * 信用信息
 */
exports.getCredits = () => `Copyright © 2022-2050 ${getAuthorName()}`