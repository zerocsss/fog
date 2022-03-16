import axios from "axios";
import { AxiosInstanceWapper } from "..";
import { FogUserInfo } from "../../model/user";
import modelFormatter from "../../utils/modelFormatter";

export interface IGitlabUserInfo {
  id: number,
  name: string,
  username: string,
  state: string,
  avatar_url: string,
  web_url: string,
  created_at: string,
  bio: "",
  location: string,
  public_email: string,
  skype: string,
  linkedin: string,
  twitter: string,
  website_url: string,
  organization: string,
  last_sign_in_at: string,
  confirmed_at: string,
  last_activity_on: string,
  email: string,
  theme_id: number,
  color_scheme_id: number,
  projects_limit: number,
  current_sign_in_at: string,
  identities: Array<any>,
  can_create_group: true,
  can_create_project: true,
  two_factor_enabled: false,
  external: false,
  private_profile: false,
  is_admin: true,
  shared_runners_minutes_limit: unknown
}

class GitlabCeeeAxiosInstanceWapper extends AxiosInstanceWapper {
  async listCurrentUser(): Promise<FogUserInfo> {
    try {
      const response = await this.instance.get<IGitlabUserInfo>('api/v4/user')
      if (response.status !== 200) {
        throw new Error('listCurrentUser error')
      } else {
        return modelFormatter.formatUserInfoFromGitlabCeeeModel(response.data)
      }
    } catch (error) {
      throw error
    }
  }
}

class GitlabCEEEAxiosInstanceFactory {
  private _instance: Map<[string, string], AxiosInstanceWapper> = new Map();

  getInstance(baseUrl: string, userName: string, pat: string): GitlabCeeeAxiosInstanceWapper {
    if (!!this._instance.has([userName, pat])) {
      return this._instance.get([userName, pat]) as AxiosInstanceWapper;
    } else {
      const instance = axios.create({
        baseURL: baseUrl,
        headers: {
          'Private-Token': pat,
        },
      });
      const instanceWapper = new GitlabCeeeAxiosInstanceWapper(instance);
      this._instance.set([userName, pat], instanceWapper);
      return instanceWapper;
    }

  }
}

export default new GitlabCEEEAxiosInstanceFactory();