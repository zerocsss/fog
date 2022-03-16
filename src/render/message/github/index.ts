import axios from "axios";
import { AxiosInstanceWapper } from "..";
import { FogUserInfo } from "../../model/user";
import modelFormatter from "../../utils/modelFormatter";

export interface IGitHubUserInfo {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: unknown
  bio: unknown
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
}

class GitHubAxiosInstanceWapper extends AxiosInstanceWapper {
  async listCurrentUser(): Promise<FogUserInfo> {
    try {
      const response = await this.instance.get<IGitHubUserInfo>("/user");
      if (response.status !== 200) {
        throw new Error("listCurrentUser error");
      } else {
        return modelFormatter.formatUserInfoFromGitHubCeeeModel(response.data);
      }
    } catch (error) {
      throw error;
    }
  }
}

class GitHubAxiosInstanceFactory {
  private _instance: Map<[string, string], AxiosInstanceWapper> = new Map();
  private _basicUrl: string = "https://api.github.com";

  getInstance(userName: string, pat: string): GitHubAxiosInstanceWapper {
    if (!!this._instance.has([userName, pat])) {
      return this._instance.get([userName, pat]) as AxiosInstanceWapper;
    } else {
      const instance = axios.create({
        baseURL: this._basicUrl,
        auth: {
          username: userName,
          password: pat,
        }
      });
      const instanceWapper = new GitHubAxiosInstanceWapper(instance);
      this._instance.set([userName, pat], instanceWapper);
      return instanceWapper;
    }
  }
}

export default new GitHubAxiosInstanceFactory();