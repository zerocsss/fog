<template>
  <div class="service-account">
    <fog-empty v-if="store.state.serviceAccount.serviceAccounts.length < 1"></fog-empty>
    <fog-collapse
      :default-active-key="[ServiceAccountType.Github, ServiceAccountType.GitlabCEEE]"
      :bordered="false"
    >
      <fog-collapse-item
        :header="ServiceAccountType.Github"
        :key="ServiceAccountType.Github"
        v-if="gitHubServiceAccounts.length > 0"
      >
        <service-account-list-item
          v-for="githubAccount in gitHubServiceAccounts"
          :data="githubAccount"
        ></service-account-list-item>
      </fog-collapse-item>
      <fog-collapse-item
        :header="ServiceAccountType.GitlabCEEE"
        :key="ServiceAccountType.GitlabCEEE"
        v-if="gitLabCeeeServiceAccounts.length > 0"
      >
        <service-account-list-item
          v-for="gitLabCeeeAccount in gitLabCeeeServiceAccounts"
          :data="gitLabCeeeAccount"
        ></service-account-list-item>
      </fog-collapse-item>
    </fog-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { store } from "../../store"
import { ServiceAccountType } from '../../store/serviceAccount';
import ServiceAccountListItem from '../ServiceAccountListItem.vue';

const serviceAccounts = computed(() => store.state.serviceAccount.serviceAccounts)
const gitHubServiceAccounts = computed(() => serviceAccounts.value.filter(account => account.accountType === ServiceAccountType.Github))
const gitLabCeeeServiceAccounts = computed(() => serviceAccounts.value.filter(account => account.accountType === ServiceAccountType.GitlabCEEE))

onMounted(() => {
  const { ipcRenderer } = require('electron')

  ipcRenderer.on('context-menu-click', (_: any, arg: string) => {
    const [command, uuid] = arg.split('_')

    switch (command) {
      case 'service-account-list-item-edit':
        const selectedAccount = serviceAccounts.value.find(account => account.uuid === uuid)
        const userInfo = ipcRenderer.sendSync('add-service-Account', {
          type: selectedAccount?.accountType,
          uuid
        })
        userInfo && (userInfo.uuid = uuid)
        userInfo && store.commit('updateServiceAccount', userInfo)
        break;
      case "service-account-list-item-remove":
        store.commit('deleteServiceAccount', uuid)
      default:
        break;
    }
  })
})

</script>

<style scoped>
.service-account {
  padding: 20px 0px;
  height: calc(100% - 40px);
  width: 100%;
}
</style>