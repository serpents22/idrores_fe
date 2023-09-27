<template>
  <sidebar 
    :backOn="true" 
    :noSocial="true"
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/programma_fertirrigaz.png">
      <p>{{ $t('fertigationProgram') }}</p>
    </div>
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <div class="sm-icon-card">
        <router-link :to="{name: 'FerrigationParametri'}"><img src="@/assets/parametri_fertirrigazione.png"></router-link>
      <p>{{ $t('fertigationParameter') }}</p>
      </div>
      <div class="sm-icon-card">
        <router-link :to="{name: 'FerrigationImpostazioni'}"><img src="@/assets/EC_fertirrigazione.png"></router-link>
      <p>{{ $t('fertigationEC') }}</p>
      </div>
      <div class="sm-icon-card">
        <router-link :to="{name: 'FerrigationRicetta'}"><img src="@/assets/ricette_fertirrigazione.png"></router-link>
      <p>{{ $t('fertigationRecipes') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { defineAsyncComponent,  computed,  onBeforeMount,  ref } from '@vue/runtime-core'

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
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })

  const title = ref()

  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
  })


</script>

<style scoped>
.dashboard-container {
    @apply flex flex-col w-full justify-center items-center
  }
  
  .device-container {
    @apply 
      flex flex-col fixed items-center gap-2
      bottom-0 left-4
      pb-4 sm:pb-8
  }
  
  .content {
    @apply 
      flex flex-wrap justify-center
      w-[80px] mt-[20px] gap-[20px]
      sm:w-[340px] sm:mt-[60px] 
      md:w-[440px] md:gap-[40px]
      lg:w-[500px] 
      xl:w-[620px] 
      2xl:w-[760px] 2xl:mt-[80px] 2xl:gap-[100px]
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