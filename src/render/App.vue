<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "./store";
import { switchTheme } from "./utils/theme";
import i18n from "./locale";

const store = useStore();

onMounted(() => {
  // 还原用户配置的主题与语言
  switchTheme(store.state.appearance.theme);
  i18n.global.locale = store.state.appearance.language as "ch" | "en" | "jp" | "kor";
})

</script>

<style scoped>
* {
  font-family: 'MiSansNormal' !important;
}
</style>
