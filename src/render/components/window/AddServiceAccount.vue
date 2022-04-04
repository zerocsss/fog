<template>
  <div class="add-service-account">
    <component :is="component" ref="componentRef"></component>
    <div class="footer">
      <div>{{ authenticationStatus }}</div>
      <div class="footer-button">
        <fog-button
          @click="cancel"
          size="mini"
          type="outline"
        >{{ $t('welcome.content.setting.service.cancel_button_text') }}</fog-button>
        <fog-button
          @click="add"
          size="mini"
          type="primary"
          style="margin-left: 10px;"
        >{{ $t('welcome.content.setting.service.add_button_text') }}</fog-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { ServiceAccountType, ServiceAccountAuthenticationType } from "../../store/serviceAccount"
import Github from "../addServices/Github.vue"
import Gitee from "../addServices/Gitee.vue"
import GitlabCEEE from "../addServices/GitlabCEEE.vue"

const router = useRouter();

const componentRef = ref<any>(null)
const ipcRenderer = require('electron').ipcRenderer
const { type } = router.currentRoute.value.params

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape") {
      cancel()
    }
    if (event.code === "Enter") {
      if (type === ServiceAccountType.GitlabCEEE) {
        if (componentRef.value.host && componentRef.value.username && componentRef.value.personalAccessToken) {
          add()
        }
      } else {
        if (componentRef.value.username && componentRef.value.personalAccessToken) {
          add()
        }
      }

    }
  });
});


const authenticationStatus = ref('')

const component = computed(() => {
  switch (type) {
    case ServiceAccountType.Github:
      return Github;
    case ServiceAccountType.Gitee:
      return Gitee;
    case ServiceAccountType.GitlabCEEE:
      return GitlabCEEE;
    default:
      break;
  }
})

const add = async () => {
  authenticationStatus.value = "Authenticating..."
  try {
    await componentRef.value.addAccount()
    authenticationStatus.value = "Authenticate Successed!"
  } catch (error) {
    authenticationStatus.value = "Authenticate Failed!"
  }
}
const cancel = () => {
  ipcRenderer.send('add-service-account-canceled')
}
</script>

<style scoped>
.add-service-account {
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  user-select: none;
  background-color: var(--color-bg-2);
  color: var(--color-text-2);
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>