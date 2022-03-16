export class FogUserInfo {
  /**
   * id
   */
  id: string
  /**
   * name
   */
  name: string

  /**
   * 全名
   */
  fullName?: string
  /**
   * 头像
   */
  avatar_url?: string
  /**
   * 主页
   */
  web_url?: string

  /**
   * 邮箱
   */
  email?: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}