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
                    >{{ $t('welcome.content.setting.general.theme_selector_option_light') }}</fog-option>
                    <fog-option
                      size="mini"
                    >{{ $t('welcome.content.setting.general.theme_selector_option_dark') }}</fog-option>
                    <fog-option
                      size="mini"
                    >{{ $t('welcome.content.setting.general.theme_selector_option_system') }}</fog-option>
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
                <fog-form-item
                  field="default folder"
                  :label="$t('welcome.content.setting.git.default_folder_label_text')"
                >
                  <fog-button
                    type="text"
                    size="mini"
                    @click="openLogFolderDialog"
                  >{{ store.state.appearance.defaultFolder || t('welcome.content.setting.git.default_folder_placeholder_text') }}</fog-button>
                </fog-form-item>
              </fog-form>
            </div>
            <!-- 账户 -->
            <div v-if="currentStep === 2 && currentSettingStep === 3">Service Account</div>
            <!-- 添加本地 -->
            <div v-if="currentStep === 2 && currentSettingStep === 4">Add Repositores</div>
          </div>
        </div>
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
import { searchExistGitBinary } from "../utils/git"

const { ipcRenderer } = require("electron")

const store = useStore()
const { t } = useI18n()
const router = useRouter()

const currentStep = ref(2)
const currentSettingStep = ref(1)
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

const gitBinaryName = ref(store.state.appearance.gitBinary)
const theme = ref(store.state.appearance.theme);

const existGitBinarys = reactive<string[]>([])

onMounted(() => {
  existGitBinarys.push(searchExistGitBinary())
})

const gotoHomePage = () => {
  router.push('/home')
}

const changeCurrentStep = (step: number) => {
  currentStep.value = step
}

const changeCurrentSettingStep = (step: number) => {
  currentSettingStep.value = step
}

const changeGitBinary = (gitBinary: string) => { store.commit('gitBinaryChanged', gitBinary) }
const themeChanged = (e: string) => { store.commit("themeChanged", e) }

const openLogFolderDialog = () => {
  const folder = ipcRenderer.sendSync('show-open-dialog', {
    title: t("view.setting.general.default_log_folder_label_text"),
  })
  folder && store.commit('defaultFolderChanged', folder[0])
}


</script>

<style scoped>
.welcome {
  user-select: none;
  height: calc(100% - 80px);
  padding: 40px;
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
  opacity: 0.9;
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