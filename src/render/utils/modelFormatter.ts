import { IGitHubUserInfo } from "../message/github";
import { IGitlabUserInfo } from "../message/GitLab";
import { FogUserInfo } from "../model/user";
import { ServiceAccountType } from "../store/serviceAccount";
import { uuid } from "./uuid";

class ModelFormatter {
  formatUserInfoFromGitlabCeeeModel(gitlabUserInfo: IGitlabUserInfo): FogUserInfo {
    const userId = uuid();
    const fogUserInfo = new FogUserInfo(userId, gitlabUserInfo.username);
    fogUserInfo.fullName = gitlabUserInfo.name;
    fogUserInfo.avatar_url = gitlabUserInfo.avatar_url
    fogUserInfo.email = gitlabUserInfo.email;
    fogUserInfo.web_url = gitlabUserInfo.web_url;

    return fogUserInfo
  }

  formatUserInfoFromGitHubCeeeModel(gitHubUserInfo: IGitHubUserInfo): FogUserInfo {
    const userId = uuid();

    const fogUserInfo = new FogUserInfo(userId, gitHubUserInfo.login);
    fogUserInfo.fullName = gitHubUserInfo.name;
    fogUserInfo.avatar_url = gitHubUserInfo.avatar_url
    fogUserInfo.email = gitHubUserInfo.email;
    fogUserInfo.web_url = gitHubUserInfo.html_url;

    return fogUserInfo
  }
}

export default new ModelFormatter();