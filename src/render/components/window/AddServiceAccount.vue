<template>
  <div class="add-service-account">
    <component :is="component" ref="componentRef"></component>
    <div class="footer">
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

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape") {
      cancel()
    }
    if (event.code === "Enter") {
      if (componentRef.value.host && componentRef.value.username && componentRef.value.personalAccessToken) {
        add()
      }
    }
  });
});

const routeParams = router.currentRoute.value.params

const component = computed(() => {
  switch (routeParams.type) {
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

const add = () => {
  const { authenticationType, host, username, personalAccessToken, password, privateToken } = componentRef.value
  if (authenticationType === ServiceAccountAuthenticationType.PersonalAccessToken) {
    require("electron").ipcRenderer.send('add-service-account-successed', {
      accountType: ServiceAccountType.GitlabCEEE,
      authType: ServiceAccountAuthenticationType.PersonalAccessToken,
      host: host,
      name: username,
      avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    })
  } else if (authenticationType === ServiceAccountAuthenticationType.PrivateToken) { }
}
const cancel = () => {
  require("electron").ipcRenderer.send('add-service-account-canceled')
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
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
  opacity: 0.85;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>