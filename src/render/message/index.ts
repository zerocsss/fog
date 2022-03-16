import { AxiosInstance } from "axios";
import { FogUserInfo } from "../model/user";
import modelFormatter from "../utils/modelFormatter";
import { IGitlabUserInfo } from "./GitLab";

export abstract class AxiosInstanceWapper {
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  abstract listCurrentUser(): Promise<FogUserInfo> 

  
}