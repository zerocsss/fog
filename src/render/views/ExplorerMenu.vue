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
    <div class="explore-footer">
      <fog-button size="mini" shape="circle" @click="openSettingView">
        <icon-settings />
      </fog-button>
      <fog-button size="mini" shape="circle" @click="addButtonClicked">
        <icon-plus />
      </fog-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { store } from "../store"
import ServiceAccount from "../components/explorer/ServiceAccounts.vue"
import LocalRepo from "../components/explorer/LocalRepo.vue"
import { ServiceAccountType } from '../store/serviceAccount';

const currentExplorerType = ref(store.state.appearance.defaultExplorerType)
const exploreView = computed(() => currentExplorerType.value === 'service_account' ? ServiceAccount : LocalRepo)

const ipcRenderer = require('electron').ipcRenderer

const addButtonClicked = (e: PointerEvent) => {
  const addServiceAccountContextMenuTemplate = [
    {
      id: "add-service-account-github",
      label: "GitHub",
      icon: "src/main/icons/github.png",
    },
    {
      id: "add-service-account-github-enterprise",
      label: "GitHub Enterprise",
      icon: "src/main/icons/github.png",
      enabled: false
    },
    {
      id: "add-service-account-gitlab",
      label: "GitLab",
      icon: "src/main/icons/gitlab.png",
      enabled: false
    },
    {
      id: "add-service-account-gitlab-ceee",
      label: "GitLab CE/EE",
      icon: "src/main/icons/github.png",
    },
    {
      id: "add-service-account-gitee",
      label: "Gitee",
      icon: "src/main/icons/gitee.png",
      enabled: false
    },
    {
      id: "add-service-account-coding",
      label: "Coding",
      enabled: false
    },
    {
      id: "add-service-account-bitbucket",
      label: "Bitbucket",
      icon: "src/main/icons/bitbucket.png",
      enabled: false
    },
    {
      id: "add-service-account-bitbucket-server",
      label: "Bitbucket Server",
      icon: "src/main/icons/bitbucket.png",
      enabled: false
    }
  ]
  const addLocalContextMenuTemplate = [
    {
      id: "add-local-new-group",
      label: "New Group",
    },
    {
      type: "separator",
    },
    {
      id: "add-local-add-repositories",
      label: "Add Repositories",
    },
    {
      id: "add-local-create-new-local-repository",
      label: "Create New Local Repository",
    },
    {
      type: "separator",
    },
    {
      id: "add-local-clone-gi-repository",
      label: "Clone Git Repository",
    },
  ]

  if (currentExplorerType.value === 'service_account') {
    ipcRenderer.send("show-context-menu", {
      contentMenuTemplate: addServiceAccountContextMenuTemplate,
      x: e.clientX,
      y: e.clientY
    })
  } else {
    ipcRenderer.send("show-context-menu", {
      contentMenuTemplate: addLocalContextMenuTemplate,
      x: e.clientX,
      y: e.clientY
    })
  }
}

const openSettingView = ()=>{
  console.log(123);
  ipcRenderer.send("open-setting-view")
}

onMounted(() => {
  ipcRenderer.on('context-menu-click', (e: any, arg: any) => {
    let userInfo;
    switch (arg) {
      case "add-service-account-github":
        userInfo = ipcRenderer.sendSync('add-service-Account', {
          type: ServiceAccountType.Github,
          hostUrl: "",
          name: "",
          pat: "",
        })
        break;
      case "add-service-account-gitlab-ceee":
        userInfo = ipcRenderer.sendSync('add-service-Account', {
          type: ServiceAccountType.GitlabCEEE,
          hostUrl: "",
          name: "",
          pat: "",
        })
      default:
        break;
    }
    userInfo && store.commit('addServiceAccounts', userInfo)
  })
})
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
  height: 94%;
}
.explore-footer {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>