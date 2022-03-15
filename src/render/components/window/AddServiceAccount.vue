<template>
  <div class="move-window-content"></div>
  <div class="add-service-account">{{ routeParams.type }}</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const routeParams = ref(router.currentRoute.value.params)
</script>

<style scoped>
.add-service-account {
  height: 100%;
  width: 100%;
  opacity: 0.85;
  display: flex;
  justify-content: center;
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
</style>