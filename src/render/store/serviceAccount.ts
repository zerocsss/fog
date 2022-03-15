/**
 * @enum 账户类型
 */
export enum ServiceAccountType {
  Github = "github",
  GithubEnterprise = "github-enterprise",
  Gitee = "gitee",
  Gitlab = "gitlab",
  GitlabCEEE = "gitlab-ceee",
  Coding = "coding",
  Bitbucket = "bitbucket",
  BitbucketServer = "bitbucket-server",
}

/**
 * @enum 认证类型
 */
export enum ServiceAccountAuthenticationType {
  PersonalAccessToken = "Personal Access Token",
  OAuthAccessToken = "Oauth Access Token",
  BasicAuth = "Basic Auth",
  PrivateToken = "Private Token",
}

/**
 * @interface 账户信息
 */
export interface IServiceAccount {
  /**
   * 账户类型
   */
  accountType: ServiceAccountType

  /**
   * 认证方式
   */
  authType: ServiceAccountAuthenticationType

  /**
   * 地址
   */
  host: string

  /**
   * 用户名
   */
  name: string

  /**
   * 头像
   */
  avatar: string
}

/**
 * state
 */
export interface IServiceAccountState {
  serviceAccounts: IServiceAccount[]
}

const serviceAccount = {
  state() {
    return {
      serviceAccounts: [],
    }
  },
  mutations: {
    addServiceAccounts(state: IServiceAccountState, serviceAccount: IServiceAccount) {
      state.serviceAccounts.push(serviceAccount)
      console.log('asdasdasd', state.serviceAccounts);
    },
    deleteServiceAccount(state: IServiceAccountState, serviceAccount: IServiceAccount) {
      state.serviceAccounts.splice(state.serviceAccounts.indexOf(serviceAccount), 1)
    }
  }
}

export default serviceAccount