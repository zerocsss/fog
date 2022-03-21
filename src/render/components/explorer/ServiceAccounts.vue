<template>
  <div class="service-account">
    <fog-collapse :default-active-key="[ServiceAccountType.Github, ServiceAccountType.GitlabCEEE]" :bordered="false">
      <fog-collapse-item
        :header="ServiceAccountType.Github"
        :key="ServiceAccountType.Github"
        v-if="gitHubServiceAccounts"
      >
        <service-account-list-item
          v-for="githubAccount in gitHubServiceAccounts"
          :data="githubAccount"
        ></service-account-list-item>
      </fog-collapse-item>
      <fog-collapse-item
        :header="ServiceAccountType.GitlabCEEE"
        :key="ServiceAccountType.GitlabCEEE"
        v-if="gitLabCeeeServiceAccounts"
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
import { ref, computed } from 'vue';
import { store } from "../../store"
import { ServiceAccountType } from '../../store/serviceAccount';
import ServiceAccountListItem from '../ServiceAccountListItem.vue';

const serviceAccounts = computed(() => store.state.serviceAccount.serviceAccounts)
const gitHubServiceAccounts = computed(() => serviceAccounts.value.filter(account => account.accountType === ServiceAccountType.Github))
const gitLabCeeeServiceAccounts = computed(() => serviceAccounts.value.filter(account => account.accountType === ServiceAccountType.GitlabCEEE))

</script>

<style scoped>
.service-account {
  padding: 20px 0px;
  height: calc(100% - 40px);
  width: 100%;
}
</style>