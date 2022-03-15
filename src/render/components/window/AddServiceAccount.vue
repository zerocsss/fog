<template>
  <div class="add-service-account">
    <component :is="component"></component>
    <div class="footer">
      <fog-button @click="cancel" size="mini" type="outline">cancel</fog-button>
      <fog-button @click="add" size="mini" type="primary" style="margin-left: 10px;">add</fog-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { ServiceAccountType, ServiceAccountAuthenticationType } from "../../store/serviceAccount"
import Github from "../addServices/Github.vue"
import Gitee from "../addServices/Gitee.vue"
import GitlabCEEE from "../addServices/GitlabCEEE.vue"

const router = useRouter();

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
  require("electron").ipcRenderer.send('add-service-account-successed', {
    accountType: ServiceAccountType.Github,
    authType: ServiceAccountAuthenticationType.PersonalAccessToken,
    host: "192.168.180.113",
    name: "name",
    avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
  })
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
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>