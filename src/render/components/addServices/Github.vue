<template>
  <div style="width: 100%;">
    <div class="head-text">GitHub</div>
    <!-- Authentication -->
    <fog-row class="grid-demo">
      <fog-col :span="7">
        <div
          class="title"
        >{{ $t('welcome.content.setting.service.gitlabceee.authentication_label_text') }}</div>
      </fog-col>
      <fog-col :span="15">
        <fog-select size="mini" v-model="authenticationType">
          <fog-option>{{ ServiceAccountAuthenticationType.PersonalAccessToken }}</fog-option>
        </fog-select>
      </fog-col>
    </fog-row>
    <!-- Username -->
    <fog-row class="grid-demo">
      <fog-col :span="7">
        <div
          class="title"
        >{{ $t('welcome.content.setting.service.gitlabceee.username_label_text') }}</div>
      </fog-col>
      <fog-col :span="15">
        <fog-input
          size="mini"
          v-model="username"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.username_placeholder_text')"
        />
      </fog-col>
    </fog-row>
    <!-- Personal Access Token -->
    <fog-row
      class="grid-demo"
      v-if="authenticationType === ServiceAccountAuthenticationType.PersonalAccessToken"
    >
      <fog-col :span="7">
        <div
          class="title"
        >{{ $t('welcome.content.setting.service.gitlabceee.personal_access_token_label_text') }}</div>
      </fog-col>
      <fog-col :span="13">
        <fog-input
          size="mini"
          type="password"
          v-model="personalAccessToken"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.personal_access_token_placeholder_text')"
        />
      </fog-col>
      <fog-col :span="1" :offset="1">
        <fog-button size="mini" type="text" @click="createPAT">
          <template #icon>
            <icon-plus />
          </template>
        </fog-button>
      </fog-col>
    </fog-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ServiceAccountAuthenticationType, ServiceAccountType } from "../../store/serviceAccount"
import gitHubAxiosInstanceFactory from "../../message/github"
import { useRouter } from 'vue-router';

const router = useRouter();
const { hostUrl, name, pat } = router.currentRoute.value.params

console.log('hostUrl', hostUrl);
console.log('name', name);
console.log('pat', pat);

const authenticationType = ref(ServiceAccountAuthenticationType.PersonalAccessToken)
const username = ref(name || 'xieyuancode')
const personalAccessToken = ref(pat || '')

const createPAT = () => {
  require('electron').shell.openExternal('https://github.com/settings/tokens/new')
}

const addAccount = async () => {
  const axiosInstance = gitHubAxiosInstanceFactory.getInstance(username.value, personalAccessToken.value)
  try {
    const userInfo = await axiosInstance.listCurrentUser()
    require("electron").ipcRenderer.send('add-service-account-successed', {
      accountType: ServiceAccountType.Github,
      authType: ServiceAccountAuthenticationType.PersonalAccessToken,
      token: personalAccessToken.value,
      userInfo
    })
  } catch (error) {
    throw error
  }
}

defineExpose({ addAccount })
</script>
<style scoped>
.grid-demo {
  width: 100%;
  margin-bottom: 10px;
}

.head-text {
  border-bottom: 1px solid var(--color-border-2);
  padding: 10px 0px;
  margin-bottom: 10px;
}
.title {
  line-height: 22px;
  text-align: right;
  padding-right: 15px;
}
</style>