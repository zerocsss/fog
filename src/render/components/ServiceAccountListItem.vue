<template>
  <div class="service-account-list-item">
    <div class="service-account-list-item-avatar">
      <fog-avatar :size="37" shape="square" trigger-type="mask" @click="avatarClicked">
        <img
          class="service-account-list-item-avatar-image"
          alt="avatar"
          v-if="props.data.userInfo.avatar_url"
          :src="props.data.userInfo.avatar_url"
        />
        <span v-else>{{ props.data.userInfo.name[0] }}</span>
        <template #trigger-icon>
          <icon-share-external />
        </template>
      </fog-avatar>
    </div>
    <div class="service-account-list-item-info">
      <div class="service-account-list-item-info-name">{{ props.data.userInfo.name }}</div>
      <div
        class="service-account-list-item-info-fullname"
      >{{ props.data.userInfo.fullName || props.data.userInfo.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IServiceAccount } from "../store/serviceAccount"

type PropsType<T> = {
  data: T
}

const props = defineProps<PropsType<IServiceAccount>>()
const avatarClicked = () => {
  const web_url = props.data.userInfo.web_url
  web_url && require('electron').shell.openExternal(web_url)
}
</script>

<style scoped>
.service-account-list-item {
  width: calc(100% - 20px);
  padding: 10px 0px 10px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}

.service-account-list-item-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.service-account-list-item-info-name {
  font-weight: 800;
}

.service-account-list-item-info-fullname {
  font-weight: 200;
  font-size: 12px;
}
</style>