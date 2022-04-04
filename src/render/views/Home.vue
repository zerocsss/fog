<template>
  <fog-layout class="layout">
    <div class="move-window-content"></div>
    <fog-layout style="height: 100%; width: 100%;">
      <fog-layout-sider style="width:280px; height: 100%;">
        <explorer-menu></explorer-menu>
      </fog-layout-sider>
      <fog-layout-content class="fog-layout-content"></fog-layout-content>
    </fog-layout>
  </fog-layout>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "../store";
import { electronStore } from "../utils/electronStore";
import { switchTheme } from "../utils/theme";
import ExplorerMenu from "./ExplorerMenu.vue"

const store = useStore();
const { ipcRenderer } = require("electron")

onMounted(() => {
  // 多窗口同步
  ipcRenderer.on("ThemeChanged", () => {
    const theme = electronStore.store.get("theme")
    switchTheme(theme);
  })
})

</script>


<style scoped>
.layout {
  height: 100%;
  width: 100%;
  color: var(--color-text-2);
}

.arco-layout-sider {
  width: 400px;
  box-shadow: 0 2px 2px 0 var(--color-text-2);
}

.arco-layout-sider-light {
  opacity: 0.85;
}

.fog-layout-content {
  height: calc(100% - 20px);
  width: calc(100% - 280px - 20px);
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