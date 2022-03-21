import { ref } from 'vue';
<template>
  <div class="explorer">
    <div class="explore-header">
      <fog-radio-group type="button" size="mini" v-model="currentExplorerType">
        <fog-radio value="service_account">
          <icon-cloud />
        </fog-radio>
        <fog-radio value="local">
          <icon-desktop />
        </fog-radio>
      </fog-radio-group>
    </div>
    <div class="explore-content">
      <component :is="exploreView" class="explore-view"></component>
    </div>
    <div class="explore-footer">Footer</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { store } from "../store"
import ServiceAccount from "../components/explorer/ServiceAccounts.vue"
import LocalRepo from "../components/explorer/LocalRepo.vue"

const currentExplorerType = ref(store.state.appearance.defaultExplorerType)
const exploreView = computed(() => currentExplorerType.value === 'service_account' ? ServiceAccount : LocalRepo)
</script>

<style scoped>
.explorer {
  padding: 8px 0px;
  height: calc(100% - 20px);
}

.explore-header {
  padding-right: 10px;
  width: calc(100% - 10px);
  display: flex;
  justify-content: end;
}

.explore-content {
  width: 100%;
  height: 90%;
}
</style>