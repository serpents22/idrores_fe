<template>
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/report.png">
      <p>{{ $t('report') }}</p>
    </div>
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <div class="flex flex-col gap-12">
        <div class="sm-icon-card">
          <router-link :to="{name: 'ReportAlarm'}"><img src="@/assets/report_allarmi.png"></router-link>
        <p>{{ $t('alarms') }}</p>
        </div>
        <div class="sm-icon-card">
          <router-link :to="{name: 'ReportEventi'}"><img src="@/assets/report_eventi_programmi.png"></router-link>
        <p>{{ $t('programEventReports') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'

  //props
  const props = defineProps({
    id: String
  })

  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  //state
  const devicesStore = useDevicesStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })

  const title = ref()
  
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
  })


</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full justify-center items-center relative
}

.device-container {
  @apply 
    flex sm:flex-col fixed items-end sm:items-center gap-2
    bottom-0 left-4
    pb-4 sm:pb-8
}

 

.content {
  @apply 
    flex justify-center items-center
    gap-[20px]
    lg:gap-[30px]
    xl:gap-[40px]
    2xl:gap-[80px]
    transition-all ease-in-out duration-300
}


.row {
  @apply
    flex flex-col relative justify-center
    gap-[60px]
    md:gap-[20px]
    lg:gap-[40px]
    xl:gap-[80px]
    transition-all ease-in-out duration-300
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


</style>