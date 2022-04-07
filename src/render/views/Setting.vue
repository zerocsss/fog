<template>
  <div class="move-window-content"></div>
  <fog-typography class="setting-view">
    <fog-tabs :animation="true" style="height: 100%" justify>
      <!-- 通用 -->
      <fog-tab-pane key="general">
        <template #title>
          <icon-settings />
          {{ $t("setting.general.header_text") }}
        </template>
        <div class="setting-view-content">
          <fog-form
            :model="{}"
            size="small"
            :style="{ width: '700px' }"
            :label-col-props="{ span: 7, offset: 0 }"
            :wrapper-col-props="{ span: 14, offset: 0 }"
          >
            <!-- 语言 -->
            <fog-form-item
              field="language"
              :label="$t('setting.general.language_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                @change="languageChanged"
                v-model="language"
              >
                <fog-radio value="ch">
                  {{ $t("setting.general.language.ch") }}
                </fog-radio>
                <fog-radio value="en">
                  {{ $t("setting.general.language.en") }}
                </fog-radio>
                <fog-radio value="jp" disabled>
                  {{ $t("setting.general.language.jp") }}
                </fog-radio>
                <fog-radio value="kor" disabled>
                  {{ $t("setting.general.language.kor") }}
                </fog-radio>
              </fog-radio-group>
            </fog-form-item>
            <!-- 登录时打开 -->
            <fog-form-item
              field="openOnLogin"
              :label="t('setting.general.open_on_login_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                @change="openOnLoginChanged"
                v-model="openOnLogin"
              >
                <fog-radio :value="true">
                  {{ $t("setting.common.yes_text") }}
                </fog-radio>
                <fog-radio :value="false">
                  {{ $t("setting.common.no_text") }}
                </fog-radio>
              </fog-radio-group>
            </fog-form-item>
            <fog-divider></fog-divider>
            <!-- 默认储存位置 -->
            <fog-form-item
              field="defaultLogFolder"
              :label="t('setting.general.default_cloned_folder_text')"
            >
              <fog-button
                type="text"
                size="mini"
                @click="openLogFolderDialog"
                >{{ store.state.appearance.defaultFolder }}</fog-button
              >
            </fog-form-item>
            <!-- 终端应用 TODO -->
            <fog-form-item
              field="TerminalApplication"
              :label="t('setting.general.terminal_application_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="terminalApplication"
                disabled
                @change="terminalApplicationChanged"
              >
                <fog-radio value="Terminal">Terminal</fog-radio>
                <fog-radio value="iTerm2">iTerm2</fog-radio>
              </fog-radio-group>
              <fog-button size="mini">{{
                t("setting.general.select_manually_button_text")
              }}</fog-button>
            </fog-form-item>
            <!-- IDE TODO -->
            <fog-form-item
              field="IDEApplication"
              :label="t('setting.general.ide_application_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="IDEApplication"
                @changed="IDEApplicationChanged"
                disabled
              >
                <fog-radio value="Visio Studio Code"
                  >Visio Studio Code</fog-radio
                >
                <fog-radio value="Webstorm">Webstorm</fog-radio>
                <fog-radio value="Atoms">Atoms</fog-radio>
              </fog-radio-group>
              <fog-button size="mini">{{
                t("setting.general.select_manually_button_text")
              }}</fog-button>
            </fog-form-item>
            <fog-divider></fog-divider>
            <!-- 自动fetch -->
            <fog-form-item
              field="autoFetch"
              :label="t('setting.general.auto_fetch_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="autoFetch"
                @change="autoFetchChanged"
              >
                <fog-radio :value="AutoFetch.Never">{{
                  t("setting.general.auto_fetch.never")
                }}</fog-radio>
                <fog-radio :value="AutoFetch.Evert5Minutes">{{
                  t("setting.general.auto_fetch.fiveMinute")
                }}</fog-radio>
                <fog-radio :value="AutoFetch.Evert10Minutes">{{
                  t("setting.general.auto_fetch.tenMinute")
                }}</fog-radio>
                <fog-radio :value="AutoFetch.Evert30Minutes">{{
                  t("setting.general.auto_fetch.thirtyMinute")
                }}</fog-radio>
                <fog-radio :value="AutoFetch.EvertHour">{{
                  t("setting.general.auto_fetch.oneHour")
                }}</fog-radio>
              </fog-radio-group>
            </fog-form-item>
            <fog-divider></fog-divider>
            <!-- commit数量 -->
            <fog-form-item
              field="commitCount"
              :label="t('setting.general.commit_counts_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="commitCounts"
                @change="commitCountsChanged"
              >
                <fog-radio :value="100"
                  >100 {{ t("setting.general.commits_text") }}</fog-radio
                >
                <fog-radio :value="200"
                  >200 {{ t("setting.general.commits_text") }}</fog-radio
                >
                <fog-radio :value="500"
                  >500 {{ t("setting.general.commits_text") }}</fog-radio
                >
                <fog-radio :value="1000"
                  >1000 {{ t("setting.general.commits_text") }}</fog-radio
                >
              </fog-radio-group>
            </fog-form-item>
          </fog-form>
          <fog-divider orientation="center"
            >{{ $t("setting.general.header_text") }} |
            {{ languageText }}</fog-divider
          >
        </div>
      </fog-tab-pane>
      <!-- 账户 -->
      <fog-tab-pane key="account">
        <template #title>
          <icon-user />
          {{ $t("setting.account.header_text") }}
        </template>
        <div class="setting-view-content">
          Accounts
          <fog-divider orientation="center">{{
            $t("setting.account.header_text")
          }}</fog-divider>
        </div>
      </fog-tab-pane>
      <!-- git -->
      <fog-tab-pane key="git">
        <template #title>
          <icon-branch />
          {{ $t("setting.git.header_text") }}
        </template>
        <div class="setting-view-content">
          <fog-form
            :model="{}"
            size="small"
            :style="{ width: '700px' }"
            :label-col-props="{ span: 7, offset: 0 }"
            :wrapper-col-props="{ span: 14, offset: 0 }"
          >
            <!-- Git 二进制文件 -->
            <fog-form-item
              field="gitBinary"
              :label="$t('welcome.content.setting.git.git_binary_label_text')"
            >
              <fog-select
                :placeholder="
                  $t('welcome.content.setting.git.git_binary_placeholder_text')
                "
                size="mini"
                v-model="gitBinaryName"
                @change="changeGitBinary"
                style="width: 350px"
              >
                <fog-option
                  v-for="existGitBinary in existGitBinarys"
                  size="mini"
                  >{{ existGitBinary }}</fog-option
                >
                <template #footer>
                  <div style="padding: 6px 0; text-align: center">
                    <fog-button size="mini" style="width: 90%">{{
                      $t("welcome.content.setting.git.git_binary_button_text")
                    }}</fog-button>
                  </div>
                </template>
              </fog-select>
              <template #extra>
                <div>
                  {{ $t("welcome.content.setting.git.git_minimum_tip") }}
                </div>
              </template>
            </fog-form-item>
            <fog-divider></fog-divider>
            <!-- Git 全局username -->
            <fog-form-item
              field="gitUsername"
              :label="$t('setting.git.global_user_name_text')"
            >
              <fog-input
                size="mini"
                v-model="globalName"
                @change="globalNameChanged"
                style="width: 350px"
              ></fog-input>
            </fog-form-item>
            <!-- Git 全局email -->
            <fog-form-item
              field="gitEmail"
              :label="$t('setting.git.global_email')"
            >
              <fog-input
                size="mini"
                v-model="globalEmail"
                @change="globalEmailChanged"
                style="width: 350px"
              ></fog-input>
            </fog-form-item>
            <fog-divider></fog-divider>
            <!-- Git GPG -->
            <fog-form-item
              field="gitGPGBinary"
              :label="
                $t('welcome.content.setting.git.git_gpg_binary_label_text')
              "
            >
              <!-- TODO 搜索GPG -->
              <fog-select
                :placeholder="
                  $t(
                    'welcome.content.setting.git.git_gpg_binary_placeholder_text'
                  )
                "
                size="mini"
                v-model="gitGPGBinaryName"
                @change="changeGPGGitBinary"
                style="width: 350px"
              >
                <!-- <fog-option
                  v-for="existGitBinary in existGitBinarys"
                  size="mini"
                >{{ existGitBinary }}</fog-option>-->
                <template #footer>
                  <div style="padding: 6px 0; text-align: center">
                    <fog-button size="mini" style="width: 90%">{{
                      $t("welcome.content.setting.git.git_binary_button_text")
                    }}</fog-button>
                  </div>
                </template>
              </fog-select>
              <template #extra>
                <div>
                  {{ $t("welcome.content.setting.git.gpg_minimum_tip") }}
                </div>
              </template>
            </fog-form-item>
            <!-- 全局GPG Key -->
            <fog-form-item
              field="gitGPGKey"
              :label="$t('welcome.content.setting.git.git_gpg_key_label_text')"
            >
              <!-- TODO GPG相关功能-->
              <fog-select
                :placeholder="
                  $t('welcome.content.setting.git.git_gpg_key_placeholder_text')
                "
                size="mini"
                v-model="gitGPGKeyName"
                @change="changeGPGKey"
                style="width: 350px"
              >
                <!-- <fog-option
                  v-for="existGitBinary in existGitBinarys"
                  size="mini"
                >{{ existGitBinary }}</fog-option>-->
                <template #footer>
                  <div style="padding: 6px 0; text-align: center">
                    <fog-button size="mini" style="width: 90%">{{
                      $t(
                        "welcome.content.setting.git.create_gpg_key_button_text"
                      )
                    }}</fog-button>
                  </div>
                </template>
              </fog-select>
            </fog-form-item>
          </fog-form>
          <fog-divider orientation="center">{{
            $t("setting.git.header_text")
          }}</fog-divider>
        </div>
      </fog-tab-pane>
      <!-- 主题 -->
      <fog-tab-pane key="theme">
        <template #title>
          <icon-brush />
          {{ $t("setting.theme.header_text") }}
        </template>
        <div class="setting-view-content">
          <fog-form
            :model="{}"
            size="small"
            :style="{ width: '700px' }"
            :label-col-props="{ span: 7, offset: 0 }"
            :wrapper-col-props="{ span: 14, offset: 0 }"
          >
            <fog-form-item
              field="theme"
              :label="$t('setting.theme.theme_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                @change="themeChanged"
                v-model="theme"
              >
                <fog-radio value="Dark">{{
                  $t("setting.theme.themes.dark")
                }}</fog-radio>
                <fog-radio value="Light">{{
                  $t("setting.theme.themes.light")
                }}</fog-radio>
                <fog-radio value="System">{{
                  $t("setting.theme.themes.system")
                }}</fog-radio>
              </fog-radio-group>
            </fog-form-item>
          </fog-form>
          <fog-divider orientation="center"
            >{{ $t("setting.theme.header_text") }} |
            {{ themeText }}</fog-divider
          >
        </div>
      </fog-tab-pane>
      <!-- 快捷键 -->
      <fog-tab-pane key="shortcut">
        <template #title>
          <icon-thunderbolt />
          {{ $t("setting.shortcut.header_text") }}
        </template>
        <div class="setting-view-content shortcut-view">
          <div class="shortcut-view-top">
            <fog-form
              :model="{}"
              size="small"
              :style="{ width: '700px' }"
              :label-col-props="{ span: 7, offset: 0 }"
              :wrapper-col-props="{ span: 14, offset: 0 }"
            >
              <fog-form-item
                field="shorrcut_enable"
                :label="t('setting.shortcut.shorrcut_enable_label_text')"
              >
                <fog-radio-group
                  type="button"
                  size="mini"
                  v-model="shortcutEnable"
                  @change="shortcutEnableChanged"
                >
                  <fog-radio :value="true">
                    {{ t("setting.common.enable_text") }}
                  </fog-radio>
                  <fog-radio :value="false">
                    {{ t("setting.common.disable_text") }}
                  </fog-radio>
                </fog-radio-group>
              </fog-form-item>
            </fog-form>
            <fog-divider></fog-divider>
          </div>
          <shortcut class="shortcut-box"></shortcut>
          <div class="shortcut-view-bottom">
            <fog-divider orientation="center"
              >{{ $t("setting.shortcut.header_text") }} | {{ platform }} |
              {{ isShortcutEnableText }}</fog-divider
            >
          </div>
        </div>
      </fog-tab-pane>
      <!-- 更新 -->
      <fog-tab-pane key="update">
        <template #title>
          <icon-to-bottom />
          {{ $t("setting.update.header_text") }}
        </template>
        <div class="setting-view-content">
          <fog-form
            :model="{}"
            size="small"
            :style="{ width: '700px' }"
            :label-col-props="{ span: 7, offset: 0 }"
            :wrapper-col-props="{ span: 14, offset: 0 }"
          >
            <fog-form-item field="update">
              <!-- {{ $t('setting.update.update_btn_text') }} -->
              <fog-button
                style="margin-left: -10px"
                type="text"
                size="small"
                @click="checkUpdate"
                :loading="isCheckingUpdate"
                >{{ $t("setting.update.update_btn_text") }}</fog-button
              >
            </fog-form-item>
            <fog-form-item
              field="channel"
              :label="$t('setting.update.channel_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="updateChannel"
                @change="updateChannelChanged"
              >
                <fog-radio value="Stable">{{
                  $t("setting.update.stable_channel_text")
                }}</fog-radio>
                <fog-radio value="Beta" disabled>{{
                  $t("setting.update.beta_channel_text")
                }}</fog-radio>
              </fog-radio-group>
            </fog-form-item>
            <fog-divider></fog-divider>
            <fog-form-item
              field="autoCheck"
              :label="t('setting.update.auto_check_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="isAutoCheckUpdate"
                @change="autoCheckUpdateChanged"
              >
                <fog-radio :value="true">{{
                  $t("setting.common.auto_text")
                }}</fog-radio>
                <fog-radio :value="false">{{
                  $t("setting.common.manual_text")
                }}</fog-radio>
              </fog-radio-group>
            </fog-form-item>
            <fog-form-item
              field="updateInterval"
              :label="$t('setting.update.update_interval_label_text')"
            >
              <fog-radio-group
                type="button"
                size="mini"
                v-model="updateInterval"
                :disabled="!isAutoCheckUpdate"
                @change="updateIntervalChanged"
              >
                <fog-radio value="Dayly">{{
                  $t("setting.update.dayly_text")
                }}</fog-radio>
                <fog-radio value="Weekly">{{
                  $t("setting.update.weekly_text")
                }}</fog-radio>
                <fog-radio value="Monthly">{{
                  $t("setting.update.monthly_text")
                }}</fog-radio>
              </fog-radio-group>
            </fog-form-item>
          </fog-form>
          <fog-divider orientation="center"
            >{{ $t("setting.update.header_text") }}
            {{
              lastCheckUpdateTime
                ? `| ${$t(
                    "setting.update.last_check_time_label_text"
                  )}: ${lastCheckUpdateTime}`
                : ``
            }}</fog-divider
          >
        </div>
      </fog-tab-pane>
      <!-- 关于 -->
      <fog-tab-pane keyd="about">
        <template #title>
          <icon-info-circle />
          {{ $t("setting.about.header_text") }}
        </template>
        <div class="setting-view-content">
          <div>
            <fog-typography-title
              type="secondary"
              :heading="4"
              @dblclick="handleAuthorClicked"
              >{{ $t("setting.about.author") }}</fog-typography-title
            >
            <fog-typography-title type="secondary" :heading="6">
              github:
              <fog-link @click="openExternal('https://github.com/XieYuanCode')"
                >https://github.com/XieYuanCode</fog-link
              >
            </fog-typography-title>
            <fog-typography-title type="secondary" :heading="6">
              {{ $t("setting.about.thanks") }}
              <fog-link @click="openZerocsssGithub">zerocsss</fog-link>
            </fog-typography-title>
            <fog-typography-title type="secondary" :heading="6">
              <fog-button-group :style="{ marginRight: '20px' }">
                <fog-button @click="openChangelogWebsite" size="small">{{
                  $t("setting.about.changelog_btn_text")
                }}</fog-button>
                <fog-button size="small" @click="openChangelogWebsite">
                  <template #icon>
                    <icon-share-internal />
                  </template>
                </fog-button>
              </fog-button-group>
              <fog-button-group>
                <fog-button @click="feedback" size="small">{{
                  $t("setting.about.feedback_btn_text")
                }}</fog-button>
                <fog-button size="small" @click="feedback">
                  <template #icon>
                    <icon-email />
                  </template>
                </fog-button>
              </fog-button-group>
            </fog-typography-title>
          </div>
          <fog-divider orientation="center"
            >{{ $t("setting.about.header_text") }} ｜ V.1.0.0</fog-divider
          >
        </div>
      </fog-tab-pane>
    </fog-tabs>
    <!-- 关于 -->
  </fog-typography>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, h, onMounted, reactive } from "vue";
import { ThemeType } from "../model/theme";
import { useStore } from "../store";
import { useI18n } from "vue-i18n";
import { isLinux, isMac, isWin } from "../utils/system";
import Shortcut from "../components/Shortcut.vue";
import { AutoFetch } from "../model/autoFetch";
import {
  getGlobalGitConfig,
  searchExistGitBinary,
  setGlobalGitEmail,
  setGlobalGitName,
} from "../utils/git";

const { shell, ipcRenderer, app } = require("electron");

const store = useStore();
const { t } = useI18n();
const internalInstance = getCurrentInstance();
const platform = isMac()
  ? "macOS"
  : isWin()
  ? "Windows"
  : isLinux()
  ? "Linux"
  : "Unknown";

const globalName = ref("");
const globalEmail = ref("");
const existGitBinarys = reactive<string[]>([]);

onMounted(() => {
  existGitBinarys.push(searchExistGitBinary());
  if (!gitBinaryName.value && existGitBinarys.length > 0) {
    changeGitBinary(existGitBinarys[0]);
    gitBinaryName.value = existGitBinarys[0];
  }
  refreshGlobalGitConfig();
});

const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);
const isAutoCheckUpdate = ref(store.state.appearance.autoUpdate);
const updateInterval = ref(store.state.appearance.updateInterval);
const updateChannel = ref(store.state.appearance.updateChannel);
const shortcutEnable = ref(store.state.appearance.isShortcutEnable);
const openOnLogin = ref(store.state.appearance.openOnLogin);
const autoFetch = ref(store.state.appearance.autoFetch);
const terminalApplication = ref(store.state.appearance.terminalApplication);
const IDEApplication = ref(store.state.appearance.IDEApplication);
const gitBinaryName = ref(store.state.appearance.gitBinary);
const changeGitBinary = (gitBinary: string) => {
  store.commit("gitBinaryChanged", gitBinary);
  refreshGlobalGitConfig();
};

const globalNameChanged = (e: string) => {
  setGlobalGitName(store.state.appearance.gitBinary, e);
};
const globalEmailChanged = (e: string) => {
  setGlobalGitEmail(store.state.appearance.gitBinary, e);
};

const isShortcutEnableText = computed(() =>
  shortcutEnable.value
    ? t("setting.shortcut.enable_text")
    : t("setting.shortcut.disable_text")
);
const themeText = computed(() =>
  theme.value === ThemeType.Dark
    ? t("setting.theme.themes.dark")
    : theme.value === ThemeType.System
    ? t("setting.theme.themes.system")
    : t("setting.theme.themes.light")
);
const languageText = computed(() =>
  language.value === "ch"
    ? t("setting.general.language.ch")
    : language.value === "en"
    ? t("setting.general.language.en")
    : language.value === "jp"
    ? t("setting.general.language.jp")
    : t("setting.general.language.kor")
);
const lastCheckUpdateTime = computed(
  () => store.state.appearance.lastCheckUpdateTime
);
const commitCounts = computed(() => store.state.appearance.commitCounts);

const themeChanged = (e: string) => store.commit("themeChanged", e);
const languageChanged = (e: string) => store.commit("languageChanged", e);
const autoCheckUpdateChanged = (e: boolean) =>
  store.commit("switchAutoUpdate", e);
const updateIntervalChanged = (e: number) =>
  store.commit("switchUpdateInterval", e);
const updateChannelChanged = (e: string) =>
  store.commit("switchUpdateChannel", e);
const shortcutEnableChanged = (e: boolean) =>
  store.commit("switchShortcutEnable", e);
const openOnLoginChanged = (e: boolean) => store.commit("switchOpenOnLogin", e);
const autoFetchChanged = (e: AutoFetch) => store.commit("switchAutoFetch", e);
const commitCountsChanged = (e: number) => store.commit("setCommitCounts", e);
const terminalApplicationChanged = (e: string) =>
  store.commit("setTerminalApplication", e);
const IDEApplicationChanged = (e: string) =>
  store.commit("setIDEApplication", e);

const isCheckingUpdate = ref(false);

const refreshGlobalGitConfig = () => {
  if (store.state.appearance.gitBinary) {
    const globalGitConfig = getGlobalGitConfig(
      store.state.appearance.gitBinary
    );
    globalName.value = globalGitConfig["user.name"];
    globalEmail.value = globalGitConfig["user.email"];
  }
};

/**
 * 打开外链
 */
const openExternal = (url: string) => {
  shell.openExternal(url);
};

/**
 * 反馈
 */
const feedback = () => {
  openExternal(
    "mailto:17010289943@163.com?subject=fog bug report or feature report&body="
  );
};

// 更新日志
const openChangelogWebsite = () => {};

/**
 * 打开Zerocsss的github
 */
const openZerocsssGithub = () => {
  openExternal("https://github.com/zerocsss");
};

/**
 * 双击作者名字 打开赞赏码
 */
const handleAuthorClicked = () => {
  internalInstance &&
    internalInstance.appContext.config.globalProperties.$modal.open({
      title: t("dialog.reward.title"),
      content: t("dialog.reward.subtitle"),
      okText: t("dialog.reward.ok_btn_text"),
      cancelText: t("dialog.reward.cancel_btn_text"),
      closable: true,
      onOk: () => {
        internalInstance &&
          internalInstance.appContext.config.globalProperties.$modal.open({
            title: t("dialog.reward.title_in"),
            okText: t("dialog.reward.ok_btn_1_text"),
            cancelText: t("dialog.reward.cancel_btn_text"),
            content: () =>
              h("img", {
                src: "src/render/assets/wechat_reward.jpg",
                style: {
                  width: "50%",
                  height: "50%",
                },
              }),
            onOk: feedback,
          });
      },
    });
};
// 打开目录选择
const openLogFolderDialog = () => {
  const folder = ipcRenderer.sendSync("show-open-dialog", {
    title: t("setting.general.default_cloned_folder_dialog_title"),
  });
  store.commit("defaultFolderChanged", folder[0]);
};

// 检查更新
const checkUpdate = () => {
  isCheckingUpdate.value = true;
  store.commit("setLastCheckUpdateTime", new Date());
};

// 重置快捷键
const resetShortcut = () => {
  // store.commit('resetShortcut')
};
</script>

<style scoped>
.setting-view-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
}
.shortcut-view {
  position: relative;
  overflow: hidden;
  /* height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
}

.shortcut-view-top {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  /* height: 47px; */
  width: 100%;
  background-color: #232324;
}

.shortcut-view-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  /* height: 41px; */
  background-color: #232324;
}

.setting-title {
  margin-bottom: 30px;
}

.user-info-cards {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.user-info-card {
  margin-right: 20px;
}

.shortcut-table {
  width: 99%;
}

.setting-view {
  padding: 20px;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  user-select: none;
  background-color: var(--color-bg-2);
  color: var(--color-text-2);
  opacity: 0.85;
}
.move-window-content {
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  -webkit-app-region: drag;
}
</style>
