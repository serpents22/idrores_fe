<template>
  <div class="slider"></div>
  <loading :loading="isLoading" />
  <!-- <impiantoAddModal 
    v-if="isShowAddModal" 
    @close="toggleAddModal" 
    title="AGGIUNGI IMPIANTO" 
    /> -->
  <NewDevice 
    :isOpen="isShowAddModal" 
    @close="toggleAddModal" 
    :title="$t('createPlant')" 
    />
  <impiantoEditModal 
    v-if="isShowEditModal" 
    @close="toggleEditModal" 
    :title="$t('editPlant')" 
    />
  <impiantoDelModal 
    v-if="isShowDelModal" 
    @close="toggleDelModal" 
    :title="$t('deletePlant')" 
    />
  <toolBar
    :noAdd=false
    @addClick="toggleAddModal"
    @editClick="toggleEditModal"
    @deleteClick="toggleDelModal" 
    />
  <sidebar
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="dashboard-container">
    <div class="flex">
      <IdroTitle :title="$t('welcome')" :name="username" />
    </div>
    <deviceCard 
        :content="devicesList" 
        :clickable=true
        :grid=true
        :medium=true
        @clicked="gotoDeviceConfig"/>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  onBeforeMount,onMounted,  ref } from '@vue/runtime-core'
  import router from '@/router'
  import NewDevice from '@/components/modal/devices/NewDevice'
  import { useDeviceManagement } from '@/stores/DeviceManagementStore'

  const deviceManagementStore = useDeviceManagement()

  onMounted(() => {
    deviceManagementStore.superAdminDevices()
  })
  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  const impiantoAddModal = defineAsyncComponent(() => 
    import ('@/components/popups/impiantoAddModal.vue')
  )
  const impiantoDelModal = defineAsyncComponent(() => 
    import ('@/components/popups/impiantoDelModal.vue')
  )
  const impiantoEditModal = defineAsyncComponent(() => 
    import ('@/components/popups/impiantoEditModal.vue')
  )
  //init store
  const devicesStore = useDevicesStore()
  const { devicesList, isLoading } = storeToRefs(useDevicesStore())
  const username = localStorage.getItem('auth.user')
  //function
  const isShowAddModal = ref(false)
  const isShowDelModal = ref(false)
  const isShowEditModal = ref(false)

  function toggleAddModal() {
    isShowAddModal.value = !isShowAddModal.value
  }
  function toggleDelModal() {
    isShowDelModal.value = !isShowDelModal.value
  }
  function toggleEditModal() {
    isShowEditModal.value = !isShowEditModal.value
  }

  const gotoDeviceConfig= (id) => {
    router.push({ name: 'DeviceConfig', params: { id: id }})
  }

  const gotoAddDevice= () => {
    router.push({ name: 'AddDevice'})
  }


  //fetch data
  onBeforeMount( async () => {
    await devicesStore.loadDevices()
  })

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

/* .impiantos {
  @apply  flex flex-wrap justify-between gap-8
          w-[1000px] mx-auto
}

.impiantos modal {
  @apply w-72 transition ease-in-out delay-150 hover:-translate-y-2
} */
</style>