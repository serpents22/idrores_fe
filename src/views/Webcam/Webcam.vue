<template>
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData"
      :id="props.id" />
    <div class="xs-icon-card">
      <img src="@/assets/webcam.png">
      <p>{{ $t('webcam') }}</p>
    </div>
  </div>

  <div class="generali-container">
    <IdroTitle :title="title"/>
    <div class="camera-wrap">
      <div class="cameraview"></div>
        <div class="control-wrapper">
          <div class="camera-control">
            <img src="@/assets/play.png">
            <img src="@/assets/stop.png">
            <img src="@/assets/pause.png">
            <img src="@/assets/rec.png">
            <img src="@/assets/zoomin.png">
            <img src="@/assets/zoomout.png">
          </div>
          <div class="camera-nav">
            <img src="@/assets/left.png">
            <div class="up-down">
          <img src="@/assets/up.png">
          <img src="@/assets/down.png">
          </div>
          <img src="@/assets/right.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref, onBeforeMount } from '@vue/runtime-core'

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

  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat :' + devicesStore.deviceData.name
  })
</script>

<style scoped>

.generali-container {
  @apply flex flex-col w-full h-full  items-center justify-center
}


.device-container {
    @apply 
      flex sm:flex-col fixed items-end sm:items-center gap-2
      bottom-0 left-4
      pb-4 sm:pb-8
  }
  

.control-wrapper {
  @apply flex flex-col 2xl:flex-row h-full justify-center items-center gap-4 sm:gap-10 w-full
}
.camera-wrap {
  @apply
    flex flex-col items-center w-full
    gap-[20px]
}

.camera-wrap img{
  @apply
    w-[40px] h-[40px]
    sm:w-[80px] sm:h-[80px]
}


.cameraview {
  @apply
    bg-white border-4 border-black
    w-[200px] h-[200px]
    2xl:w-[720px] 2xl:h-[433px]
}

.camera-control {
  @apply
    flex justify-between cursor-pointer
    2xl:w-[720px]
}


.camera-nav {
  @apply
    flex items-center justify-center gap-0 sm:gap-[10px]
}

.camera-nav .up-down {
  @apply
    flex flex-col gap-[40px] sm:gap-[100px]
}

</style>