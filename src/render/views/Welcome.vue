<template>
  <div class="welcome">
    <div class="move-window-content"></div>
    <fog-layout style="height: 100%;">
      <fog-layout-header>
        <fog-steps :current="currentStep" small changeable @change="changeCurrentStep" type="arrow">
          <fog-step>
            {{ $t("welcome.header.welcome_step_label_text") }}
            <template #icon>
              <icon-home />
            </template>
          </fog-step>
          <fog-step>
            {{ $t("welcome.header.setting_step_label_text") }}
            <template #icon>
              <icon-settings />
            </template>
          </fog-step>
          <fog-step>
            {{ $t("welcome.header.finish_step_label_text") }}
            <template #icon>
              <icon-home />
            </template>
          </fog-step>
        </fog-steps>
      </fog-layout-header>
      <fog-layout-content>
        <!-- 欢迎 -->
        <div class="welcome-content" v-if="currentStep === 1">
          <div class="welcome-content-hearde">
            <img src="src/render/assets/icon.png" class="fog-logo" />
            <div>
              <h1>Fog</h1>
              <h2>{{ $t("welcome.content.welcome.description_1") }}</h2>
              <ul>
                <li>
                  <h3>{{ $t("welcome.content.welcome.description_2") }}</h3>
                </li>
                <li>
                  <h3>{{ $t("welcome.content.welcome.description_3") }}</h3>
                </li>
                <li>
                  <h3>{{ $t("welcome.content.welcome.description_4") }}</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 设置 -->
        <div class="setting-content" v-if="currentStep === 2">
          <fog-steps
            :current="currentSettingStep"
            direction="vertical"
            small
            changeable
            class="setting-content-stepper"
            @change="changeCurrentSettingStep"
          >
            <fog-step>{{ $t('welcome.content.setting.general.stepper_label_text') }}</fog-step>
            <fog-step>{{ $t('welcome.content.setting.git.stepper_label_text') }}</fog-step>
            <fog-step>{{ $t('welcome.content.setting.service.stepper_label_text') }}</fog-step>
            <fog-step>{{ $t('welcome.content.setting.addRepositores.stepper_label_text') }}</fog-step>
          </fog-steps>
          <div class="setting-content-content">
            <!-- 通用 -->
            <div v-if="currentStep === 2 && currentSettingStep === 1">
              <fog-form
                :label-col-props="{ span: 8, offset: 0 }"
                :wrapper-col-props="{ span: 16, offset: 0 }"
              >
                <!-- 默认clone位置 -->
                <fog-form-item
                  field="default folder"
                  :label="$t('welcome.content.setting.general.default_folder_label_text')"
                >
                  <fog-button
                    type="text"
                    size="mini"
                    @click="openLogFolderDialog"
                  >{{ store.state.appearance.defaultFolder || t('welcome.content.setting.general.default_folder_placeholder_text') }}</fog-button>
                </fog-form-item>
                <!-- 主题 -->
                <fog-form-item
                  field="theme"
                  :label="$t('welcome.content.setting.general.theme_label_text')"
                >
                  <fog-select
                    :placeholder="$t('welcome.content.setting.general.theme_placeholder_text')"
                    v-model="theme"
                    size="mini"
                    @change="themeChanged"
                  >
                    <fog-option
                      size="mini"
                      value="Light"
                    >{{ $t('welcome.content.setting.general.theme_selector_option_light') }}</fog-option>
                    <fog-option
                      size="mini"
                      value="Dark"
                    >{{ $t('welcome.content.setting.general.theme_selector_option_dark') }}</fog-option>
                    <fog-option
                      size="mini"
                      value="System"
                    >{{ $t('welcome.content.setting.general.theme_selector_option_system') }}</fog-option>
                  </fog-select>
                </fog-form-item>
                <!-- 语言 -->
                <fog-form-item
                  field="theme"
                  :label="$t('welcome.content.setting.general.language_label_text')"
                >
                  <fog-select
                    :placeholder="$t('welcome.content.setting.general.language_selector_placeholder_text')"
                    v-model="language"
                    size="mini"
                    @change="languageChanged"
                  >
                    <fog-option
                      size="mini"
                      value="ch"
                    >{{ $t('welcome.content.setting.general.language.ch') }}</fog-option>
                    <fog-option
                      size="mini"
                      value="en"
                    >{{ $t('welcome.content.setting.general.language.en') }}</fog-option>
                    <fog-option
                      size="mini"
                      value="jp"
                      disabled
                    >{{ $t('welcome.content.setting.general.language.jp') }}</fog-option>
                    <fog-option
                      size="mini"
                      value="kor"
                      disabled
                    >{{ $t('welcome.content.setting.general.language.kor') }}</fog-option>
                  </fog-select>
                </fog-form-item>
              </fog-form>
            </div>
            <!-- Git -->
            <div v-if="currentStep === 2 && currentSettingStep === 2">
              <fog-form
                :label-col-props="{ span: 8, offset: 0 }"
                :wrapper-col-props="{ span: 16, offset: 0 }"
              >
                <!-- git地址 -->
                <fog-form-item
                  field="gitBinary"
                  :label="$t('welcome.content.setting.git.git_binary_label_text')"
                >
                  <fog-select
                    :placeholder="$t('welcome.content.setting.git.git_binary_placeholder_text')"
                    size="mini"
                    v-model="gitBinaryName"
                    @change="changeGitBinary"
                  >
                    <fog-option
                      v-for="existGitBinary in existGitBinarys"
                      size="mini"
                    >{{ existGitBinary }}</fog-option>
                    <template #footer>
                      <div style="padding: 6px 0; text-align: center;">
                        <fog-button
                          size="mini"
                          style="width: 90%;"
                        >{{ $t('welcome.content.setting.git.git_binary_button_text') }}</fog-button>
                      </div>
                    </template>
                  </fog-select>
                </fog-form-item>
                <!-- Git全局信息-name -->
                <fog-form-item
                  :label="$t('welcome.content.setting.git.git_global_config_label_text')"
                ></fog-form-item>
                <fog-form-item
                  field="git global name"
                  :label="$t('welcome.content.setting.git.git_global_name_label_text')"
                >
                  <fog-input
                    size="mini"
                    :placeholder="$t('welcome.content.setting.git.git_global_name_placeholder_text')"
                    v-model="globalName"
                    @change="globalNameChanged"
                  />
                </fog-form-item>
                <!-- Git全局信息-email -->
                <fog-form-item
                  field="git global email"
                  :label="$t('welcome.content.setting.git.git_global_email_label_text')"
                >
                  <fog-input
                    size="mini"
                    :placeholder="$t('welcome.content.setting.git.git_global_email_placeholder_text')"
                    v-model="globalEmail"
                    @change="globalEmailChanged"
                  />
                </fog-form-item>
              </fog-form>
            </div>
            <!-- 账户 -->
            <div v-if="currentStep === 2 && currentSettingStep === 3" class="account-service">
              <div
                style="width: 89%;"
              >{{ $t('welcome.content.setting.service.select_account_type_title') }}</div>
              <div class="account-service-title">
                <div class="account-service-title-pair">
                  <fog-button
                    size="mini"
                    type="outline"
                    @click="addServiceAccount(ServiceAccountType.Github)"
                  >
                    Github
                    <template #icon>
                      <icon-github />
                    </template>
                  </fog-button>
                  <fog-button
                    size="mini"
                    type="outline"
                    disabled
                    class="account-service-title-bottom-button"
                    @click="addServiceAccount(ServiceAccountType.GithubEnterprise)"
                  >
                    Github Enterprise
                    <template #icon>
                      <icon-github />
                    </template>
                  </fog-button>
                </div>
                <div class="account-service-title-pair">
                  <fog-button
                    size="mini"
                    type="outline"
                    disabled
                    @click="addServiceAccount(ServiceAccountType.GitLab)"
                  >
                    GitLab
                    <template #icon>
                      <icon-GitLab />
                    </template>
                  </fog-button>
                  <fog-button
                    size="mini"
                    type="outline"
                    class="account-service-title-bottom-button"
                    @click="addServiceAccount(ServiceAccountType.GitlabCEEE)"
                  >
                    GitLab CEEE
                    <template #icon>
                      <icon-GitLab />
                    </template>
                  </fog-button>
                </div>
                <div class="account-service-title-pair">
                  <fog-button
                    size="mini"
                    type="outline"
                    disabled
                    @click="addServiceAccount(ServiceAccountType.Gitee)"
                  >Gitee</fog-button>
                  <fog-button
                    size="mini"
                    type="outline"
                    class="account-service-title-bottom-button"
                    disabled
                  >Conding</fog-button>
                </div>
                <div class="account-service-title-pair">
                  <fog-button
                    size="mini"
                    type="outline"
                    disabled
                    @click="addServiceAccount(ServiceAccountType.Bitbucket)"
                  >Bitbucket</fog-button>
                  <fog-button
                    size="mini"
                    type="outline"
                    disabled
                    class="account-service-title-bottom-button"
                    @click="addServiceAccount(ServiceAccountType.BitbucketServer)"
                  >Bitbucket Server</fog-button>
                </div>
              </div>
              <div class="account-service-list">
                <fog-list
                  size="small"
                  max-height="240"
                  class="account-service-list-main"
                  v-if="serviceAccounts && serviceAccounts.length > 0"
                >
                  <fog-list-item v-for="serviceAccount in serviceAccounts">
                    <template #actions>
                      <fog-button
                        size="mini"
                        type="text"
                        status="danger"
                        @click="deleteServiceAccount(serviceAccount)"
                      >
                        <template #icon>
                          <icon-delete />
                        </template>
                      </fog-button>
                    </template>
                    <fog-list-item-meta
                      :title="serviceAccount.userInfo.name"
                      :description="serviceAccount.accountType === ServiceAccountType.GitlabCEEE ? `GitLab CEEE: ${serviceAccount.host}` : serviceAccount.accountType"
                    >
                      <template #avatar>
                        <fog-avatar>
                          <img
                            :src="serviceAccount.userInfo.avatar_url"
                            @click="avatarClicked(serviceAccount.userInfo.web_url)"
                          />
                        </fog-avatar>
                      </template>
                    </fog-list-item-meta>
                  </fog-list-item>
                </fog-list>
                <fog-empty v-else />
              </div>
            </div>
            <!-- 添加本地 -->
            <div v-if="currentStep === 2 && currentSettingStep === 4"></div>
          </div>
        </div>
        <!-- 完成 -->
        <div class="finish-content" v-if="currentStep === 3">
          <fog-result status="success" :title="$t('view.welcome.finish_page.title')">
            <template #subtitle>{{ $t('view.welcome.finish_page.subtitle') }}</template>
            <template #extra>
              <fog-button
                type="primary"
                size="mini"
                @click="gotoHomePage"
              >{{ $t('view.welcome.bottom_button.finish_button_text') }}</fog-button>
            </template>
          </fog-result>
        </div>
      </fog-layout-content>
      <fog-layout-footer class="welcome-footer">
        <fog-button type="primary" size="mini" @click="prevStep" :disabled="currentStep < 2">
          <icon-left />
          {{ $t("welcome.bottom.prev_button_text") }}
        </fog-button>
        <fog-button
          type="primary"
          size="mini"
          @click="nextStep"
          :style="{ marginLeft: '20px' }"
          :disabled="isNextStepDisabled"
          v-if="currentStep !== 3"
        >
          {{ $t("welcome.bottom.next_button_text") }}
          <icon-right />
        </fog-button>
        <fog-button
          v-if="currentStep === 3"
          type="primary"
          size="mini"
          @click="gotoHomePage"
          :style="{ marginLeft: '20px' }"
        >
          {{ $t("welcome.bottom.finish_button_text") }}
          <icon-right />
        </fog-button>
      </fog-layout-footer>
    </fog-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from "../store"
import { useI18n } from "vue-i18n"
import { useRouter } from 'vue-router';
import { searchExistGitBinary, getGlobalGitConfig, setGlobalGitEmail, setGlobalGitName } from "../utils/git"
import { electronStore } from '../utils/electronStore';
import { IServiceAccount, ServiceAccountType } from '../store/serviceAccount';

const { ipcRenderer, shell } = require("electron")

const store = useStore()
const { t } = useI18n()
const router = useRouter()

const currentStep = ref(2)
const currentSettingStep = ref(4)
const prevStep = () => {
  if (currentStep.value === 2) {
    if (currentSettingStep.value === 1) {
      currentStep.value--
    } else if (currentSettingStep.value === 2) {
      currentSettingStep.value--
    } else if (currentSettingStep.value === 3) {
      currentSettingStep.value--
    } else if (currentSettingStep.value === 4) {
      currentSettingStep.value--
    }
  } else if (currentStep.value === 3) {
    currentStep.value--
  }
}
const nextStep = () => {
  if (currentStep.value === 1) {
    currentStep.value++
  } else if (currentStep.value === 2) {
    if (currentSettingStep.value === 1) {
      currentSettingStep.value++
    } else if (currentSettingStep.value === 2) {
      currentSettingStep.value++
    } else if (currentSettingStep.value === 3) {
      currentSettingStep.value++
    } else if (currentSettingStep.value === 4) {
      currentStep.value++
    }
  }
}
const serviceAccounts = computed(() => store.state.serviceAccount.serviceAccounts)
const gitBinaryName = ref(store.state.appearance.gitBinary)
const theme = ref(store.state.appearance.theme);
const language = ref(store.state.appearance.language);
const globalName = ref("")
const globalEmail = ref("")

const existGitBinarys = reactive<string[]>([])

const isNextStepDisabled = computed(() => {
  if (currentStep.value === 2 && currentSettingStep.value === 1) {
    return !gitBinaryName.value
  } else {
    return false
  }
})

onMounted(() => {
  existGitBinarys.push(searchExistGitBinary())
  if (!gitBinaryName.value && existGitBinarys.length > 0) {
    changeGitBinary(existGitBinarys[0])
    gitBinaryName.value = existGitBinarys[0]
  }
  refreshGlobalGitConfig()
})

const refreshGlobalGitConfig = () => {
  if (store.state.appearance.gitBinary) {
    const globalGitConfig = getGlobalGitConfig(store.state.appearance.gitBinary)
    globalName.value = globalGitConfig['user.name']
    globalEmail.value = globalGitConfig['user.email']
  }
}

const gotoHomePage = () => {
  electronStore.store.set('isFirstLoad', false)
  ipcRenderer.send("close-welcome-and-open-main")
  router.push('/home')
}

const changeCurrentStep = (step: number) => { currentStep.value = step }

const changeCurrentSettingStep = (step: number) => { currentSettingStep.value = step }

const changeGitBinary = (gitBinary: string) => {
  store.commit('gitBinaryChanged', gitBinary)
  refreshGlobalGitConfig()
}
const themeChanged = (e: string) => { store.commit("themeChanged", e) }
const languageChanged = (e: string) => { store.commit("languageChanged", e) }

const openLogFolderDialog = () => {
  const folder = ipcRenderer.sendSync('show-open-dialog', {
    title: t("view.setting.general.default_log_folder_label_text"),
  })
  folder && store.commit('defaultFolderChanged', folder[0])
}

const globalNameChanged = (e: string) => { setGlobalGitName(store.state.appearance.gitBinary, e); }
const globalEmailChanged = (e: string) => { setGlobalGitEmail(store.state.appearance.gitBinary, e); }

const addServiceAccount = (serviceAccountType: ServiceAccountType) => {
  const userInfo = ipcRenderer.sendSync('add-service-Account', {
    type: serviceAccountType,
  })
  userInfo && store.commit('addServiceAccounts', userInfo)
}

const deleteServiceAccount = (serviceAccount: IServiceAccount) => {
  store.commit('deleteServiceAccount', serviceAccount)
}

const avatarClicked = (avatarUrl?: string) => {
  avatarUrl && shell.openExternal(avatarUrl)
}
</script>

<style scoped>
.welcome {
  user-select: none;
  height: calc(100% - 80px);
  padding: 40px;
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
  opacity: 0.85;
}

.account-service-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--color-border-2);
  padding-top: 20px;
}

.account-service-list-main {
  width: 455px;
}

.account-service-title-bottom-button {
  margin-top: 5px;
}

.account-service-title-pair {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.account-service-title {
  display: flex;
  margin-top: 20px;
}

.account-service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.setting-content-stepper {
  border-right: 1px solid var(--color-border-2);
}

.welcome-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.finish-content {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.move-window-content {
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-app-region: drag;
}

.setting-content-content {
  padding: 20px;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
}

.welcome-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.setting-content {
  height: calc(100% - 40px);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0px 20px 0px;
}

.welcome-content-hearde {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fog-logo {
  width: 200px;
  height: 200px;
}

.login-content {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-box {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-box:hover {
  background-color: var(--color-neutral-3);
  box-shadow: inset 0 0 5px 2px var(--color-neutral-5);
  box-shadow: 0 0 5px 2px var(--color-neutral-5);
}

.login-result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>