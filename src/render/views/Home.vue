<template>
  <fog-layout class="layout">
     This Is Home Page
    <!-- <lver-layout style="height: 100%">
      <lver-layout-sider style="width:280px; height: 100%;">
        <div class="move-window-content"></div>
      </lver-layout-sider>
      <lver-layout-content class="lver-layout-content">
        <div class="move-window-content"></div>
        <setting v-if="isSettingView"></setting>
      </lver-layout-content>
    </lver-layout> -->
  </fog-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStore } from "../store";
import Setting from "./Setting.vue"
import { switchTheme } from "../utils/theme";
import i18n from "../locale";
import { electronStore } from "../utils/electronStore";
import { ShortcutAction } from "../model/shortcut";

const store = useStore();

const isSettingView = computed(() => store.state.appearance.settingViewVisible)

onMounted(() => {

  require('electron').ipcRenderer.on(ShortcutAction.Settings, () => store.commit('switchSettingViewVisible', !store.state.appearance.settingViewVisible))
  // TODO: 读取用户配置
  // electronStore.store.set('isFirstLoad', false)
  switchTheme(store.state.appearance.theme);
  i18n.global.locale = store.state.appearance.language as "ch" | "en" | "jp" | "kor";
})

</script>


<style scoped>
body {
  background: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(10px);
}

.layout {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
  opacity: 0.85;
}

.arco-layout-sider {
  width: 400px;
  box-shadow: 0 2px 5px 0 var(--color-text-2);
}

/* .arco-layout-sider-light {
  background: #ffffffb8;
} */

.arco-layout-sider-light {
  opacity: 0.85;
}

.lver-layout-content {
  height: calc(100% - 20px);
  padding-left: 20px;
  padding-top: 20px;
  background: var(--color-menu-light-bg);
}

.move-window-content {
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  -webkit-app-region: drag;
}
</style>