<template>
  <div class="service-account-list-item" @contextmenu="showServiceAccountListItemContextMenu">
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
      <div class="service-account-list-item-info-name">
        <span>{{ props.data.userInfo.name }}</span>
        <span
          class="service-account-list-item-info-name-host"
        >{{ props.data.accountType === ServiceAccountType.GitlabCEEE ? props.data.host : '' }}</span>
      </div>
      <div
        class="service-account-list-item-info-fullname"
      >{{ props.data.userInfo.fullName || props.data.userInfo.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { IServiceAccount, ServiceAccountType } from "../store/serviceAccount"
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

type PropsType<T> = {
  data: T
}

const props = defineProps<PropsType<IServiceAccount>>()
const avatarClicked = () => {
  const web_url = props.data.userInfo.web_url
  web_url && require('electron').shell.openExternal(web_url)
}

const showServiceAccountListItemContextMenu = (e: PointerEvent) => {
  const contentMenuTemplate = [{
    id: `service-account-list-item-edit_${props.data.uuid}`,
    label: `${t('context_menu.service_account_list_item.edit')} "${props.data.userInfo.name}"`,
  },
  {
    id: `service-account-list-item-remove_${props.data.uuid}`,
    label: `${t('context_menu.service_account_list_item.remove')} "${props.data.userInfo.name}"`,
  },
  { type: 'separator' },
  {
    id: `service-account-list-item-refresh_${props.data.uuid}`,
    label: `${t('context_menu.service_account_list_item.refresh')} "${props.data.userInfo.name}"`,
  }]

  require('electron').ipcRenderer.send('show-context-menu', {
    contentMenuTemplate,
    x: e.clientX,
    y: e.clientY
  })
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

.service-account-list-item-info-name-host {
  font-size: 10px;
  font-weight: bold;
  color: var(--color-text-4);
  margin-left: 10px;
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