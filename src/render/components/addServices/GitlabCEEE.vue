<template>
  <div style="width: 100%;">
    <div class="head-text">Gitlab CE/EE</div>
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
          <fog-option>{{ ServiceAccountAuthenticationType.PrivateToken }}</fog-option>
        </fog-select>
      </fog-col>
    </fog-row>
    <!-- Host -->
    <fog-row class="grid-demo">
      <fog-col :span="7">
        <div class="title">{{ $t('welcome.content.setting.service.gitlabceee.host_label_text') }}</div>
      </fog-col>
      <fog-col :span="15">
        <fog-input
          size="mini"
          v-model="host"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.host_placeholder_text')"
        />
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
      <fog-col :span="15">
        <fog-input
          size="mini"
          type="password"
          v-model="personalAccessToken"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.personal_access_token_placeholder_text')"
        />
      </fog-col>
    </fog-row>
    <!-- Passwork -->
    <fog-row
      class="grid-demo"
      v-if="authenticationType === ServiceAccountAuthenticationType.PrivateToken"
    >
      <fog-col :span="7">
        <div
          class="title"
        >{{ $t('welcome.content.setting.service.gitlabceee.password_label_text') }}</div>
      </fog-col>
      <fog-col :span="15">
        <fog-input
          size="mini"
          type="password"
          v-model="password"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.password_placeholder_text')"
        />
      </fog-col>
    </fog-row>
    <!-- Private Token -->
    <fog-row
      class="grid-demo"
      v-if="authenticationType === ServiceAccountAuthenticationType.PrivateToken"
    >
      <fog-col :span="7">
        <div
          class="title"
        >{{ $t('welcome.content.setting.service.gitlabceee.private_token_label_text') }}</div>
      </fog-col>
      <fog-col :span="15">
        <fog-input
          size="mini"
          type="password"
          v-model="privateToken"
          :placeholder="$t('welcome.content.setting.service.gitlabceee.private_token_placeholder_text')"
        />
      </fog-col>
    </fog-row>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { ServiceAccountAuthenticationType } from "../../store/serviceAccount"

const authenticationType = ref(ServiceAccountAuthenticationType.PersonalAccessToken)
const host = ref('http://192.168.180.113')
const username = ref('xieyuan')
const personalAccessToken = ref('sVvcAH_My4gwEmVfqpuf')
const password = ref('')
const privateToken = ref('')

defineExpose({
  authenticationType,
  host,
  username,
  personalAccessToken,
  password,
  privateToken
})
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