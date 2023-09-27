<template>
  <DeviceAlarm
    :isOpen="isShowAlarmModal" 
    @close="deviceAlarmToggle"
    :id="device_code"
    :title="$t('alarmsList')" 
  />
  <loading :loading="isLoading" />
  <sidebar 
    :backOn="true" 
    :noSocial="true" 
    :isAlarm="devicesStore.deviceData.alarm"
    @alarmList="deviceAlarmToggle"
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title" />
    <div class="content">
      <div class="md-icon-card">
        <router-link :to="{name: 'IrrigationView'}"><img src="@/assets/irrigation.png"></router-link>
        <p>{{ $t('irrigation') }}</p>
      </div>
      <div class="md-icon-card" v-if="devicesStore.deviceData.role !== 'user'" >
        <router-link  :to="{ name: 'MapView' }" >
          <img src="@/assets/map.png">
        </router-link>
        <p>{{ $t('map') }}</p>
     </div>
      <div class="md-icon-card opacity-40" v-else>
        <img src="@/assets/map.png" >
        <p>{{ $t('map') }}</p>
      </div>
      <div class="md-icon-card">
        <router-link :to="{name: 'ReportView'}"><img src="@/assets/report.png"></router-link>
        <p>{{ $t('report') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onBeforeMount, onUnmounted,  ref } from '@vue/runtime-core'
  import { useAlarmStore } from '@/stores/alarm/AlarmStore'
  import { useDataStore } from '@/stores/DataStore'

  //props
  const props = defineProps({
    id: String
  })

  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )

  const DeviceAlarm = defineAsyncComponent(
    () => import('@/components/modal/devices/DeviceAlarm.vue'),
  )
  //state
  const devicesStore = useDevicesStore()
  const alarmStore = useAlarmStore()
  const dataStore = useDataStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  
  const title = ref()
  const device_code = ref()
  let satStatParams = {
      fields: 'S15',
      measurement: 'SATSTAT',
      device_code: null
    }

  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    satStatParams.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    device_code.value = devicesStore.deviceData.code
  })

  const isShowAlarmModal = ref(false)

  async function deviceAlarmToggle() {
    await alarmStore.getAlarmList(device_code.value)
    isShowAlarmModal.value = !isShowAlarmModal.value
  }

</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full justify-center items-center
}

.device-container {
  @apply 
    flex sm:flex-col fixed items-end sm:items-center gap-2
    bottom-0 left-4
    pb-4 sm:pb-8
}

.content {
  @apply 
    flex flex-wrap justify-center 
    w-[300px] gap-1
    sm:w-[500px] sm:gap-6
    md:w-[700px] md:gap-8
    lg:w-[800px] lg:gap-10
    transition-all ease-in-out delay-300

}



/* .content img {
  @apply 
  w-24 h-24
  sm:w-32 sm:h-32 
  md:w-40 md:h-40 
  lg:w-60 lg:h-60
  transition-all ease-in-out delay-150
} */
</style>