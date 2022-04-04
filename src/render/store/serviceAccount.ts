import { FogUserInfo } from "../model/user"
import { electronStore } from "../utils/electronStore";
import { uuid } from "../utils/uuid";

/**
 * @enum 账户类型
 */
export enum ServiceAccountType {
  Github = "GitHub",
  GithubEnterprise = "GitHub Enterprise",
  Gitee = "Gitee",
  GitLab = "GitLab",
  GitlabCEEE = "GitLab CEEE",
  Coding = "CODING DevOps",
  Bitbucket = "Bitbucket",
  BitbucketServer = "Bitbucket Server",
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
  uuid: string
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
  host?: string
  /**
   * token
   */
  token: string

  /**
   * 用户信息
   */
  userInfo: FogUserInfo
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
      serviceAccounts: [] = electronStore.store.get("serviceAccounts", [])
    }
  },
  mutations: {
    addServiceAccounts(state: IServiceAccountState, serviceAccount: IServiceAccount) {
      serviceAccount.uuid = uuid()
      state.serviceAccounts.push(serviceAccount)
      electronStore.store.set("serviceAccounts", state.serviceAccounts)
    },
    deleteServiceAccount(state: IServiceAccountState, uuid: string) {
      const index = state.serviceAccounts.findIndex((item) => item.uuid === uuid)
      if (index > -1) {
        state.serviceAccounts.splice(index, 1)
        electronStore.store.set("serviceAccounts", state.serviceAccounts)
      }
    },
    updateServiceAccount(state: IServiceAccountState, serviceAccount: IServiceAccount) {
      if (!serviceAccount.uuid) return
      const index = state.serviceAccounts.findIndex(item => item.uuid === serviceAccount.uuid)
      if (index === -1) return
      state.serviceAccounts.splice(index, 1, serviceAccount)
      electronStore.store.set("serviceAccounts", state.serviceAccounts)
    }
  }
}

export default serviceAccount