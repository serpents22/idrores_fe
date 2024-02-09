<template>
  <div class="slider"></div>
  <loading :loading="isLoading" />

  <DeleteAccount :isOpen="isShowDeleteAccount" @close="toggleDeleteAccount" title="Delete Account" />
  <ShareDevice :isOpen="isShowAddRole" @close="toggleAddRole" :title="$t('addRule')" />
  <ManageShare :isOpen="isShowManageRole" @close="toggleManageRole" :title="$t('manageRule')" />

  <sidebar :noSocial="true" :backOn="true" />
  <div class="main-container">
    <IdroTitle :title="title" />
    <div class="manage-account-container">
      <div class="addrole" @click="toggleAddRole">
        <span>{{ $t('addRule') }}</span>
      </div>
      <div class="managerole" @click="toggleManageRole">
        <span>{{ $t('manageRule') }}</span>
      </div>
      <div class="addrole" @click="toggleDeleteAccount">
        <span>Delete Account</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDeviceManagement } from '@/stores/DeviceManagementStore'
import { ref } from '@vue/runtime-core'
import DeleteAccount from '@/components/modal/DeleteAccount'
import ShareDevice from '@/components/modal/devices/ShareDevice'
import ManageShare from '@/components/modal/devices/ManageShare'
import { onMounted } from 'vue'

const deviceManagementStore = useDeviceManagement()

onMounted(() => {
  deviceManagementStore.superAdminDevices()
})
//init store
const title = 'Gestisci account'
//function
const isShowDeleteAccount = ref(false)
const isShowAddRole = ref(false)
const isShowManageRole = ref(false)

function toggleDeleteAccount() {
  isShowDeleteAccount.value = !isShowDeleteAccount.value
}
function toggleAddRole() {
  isShowAddRole.value = !isShowAddRole.value
}
function toggleManageRole() {
  isShowManageRole.value = !isShowManageRole.value
}



</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

span h2 {
  @apply text-xs font-light
}

span p {
  @apply text-base font-normal
}

.impiantos {
  @apply flex flex-wrap justify-between gap-8 w-[1000px] mx-auto
}

.impiantos modal {
  @apply w-72 transition ease-in-out delay-150 hover:-translate-y-2
}

.addrole, .managerole {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%);
  border: 3px solid #000000;
  padding: 20px;
  @apply text-black font-medium rounded-lg w-60
  /* border: 1px solid #031ac4;
    width: 25%;
    padding: 50px;
    border-radius: 24px;
    margin: 10px; */
}

.manage-account-container {
  @apply gap-10 flex flex-col sm:flex-row justify-center items-center mt-10
}

.addrole:hover, .managerole:hover {
  cursor: pointer;
}

@media (max-width:980px) {

  .addrole,
  .managerole {
    padding: 20px;
  }
}

.main-container {
  @apply flex flex-col
}
</style>