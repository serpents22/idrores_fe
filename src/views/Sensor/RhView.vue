<template>
  <div class="stato-stazione-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/umiditterreno.png">
      <p>{{ $t('soilMoisture') }}</p>
    </div>
    </div>
    <div class="content">
      <IdroTitle :title="title"/>
      <div class="main">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <span></span>
                </th>
                <th>
                  <span>{{$t('level')}} 1</span>
                </th>
                <th>
                  <span>{{$t('level')}} 2</span>
                </th>
                <th>
                  <span>{{$t('level')}} 3</span>
                </th>
                <th>
                  <span>{{$t('level')}} 4</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="skeletonLoading" >
              <td>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-full"></div>
                </div>
              </td>
                <td>
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-full"></div>
                  </div>
                </td>
                <td>
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-full"></div>
                  </div>
                </td>
                <td>
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-full"></div>
                  </div>
                </td>
                <td>
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-full"></div>
                  </div>
                </td>
              </tr>
              <tr v-for="(tData, index) in gropointData" :key="tData">
                <td>
                  <p>RH {{index+1}}</p>
                </td>
                <td>
                  <p>{{ tData.livello1 }}</p>
                </td>
                <td>
                  <p>{{ tData.livello2 }}</p>
                </td>
                <td>
                  <p>{{ tData.livello3 }}</p>
                </td>
                <td>
                  <p>{{ tData.livello4 }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </template>
  
<script setup>
import { useDevicesStore } from '@/stores/DevicesStore'
import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref, onBeforeMount, onUnmounted } from '@vue/runtime-core'
  
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
  const dataStore = useDataStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  //data params
  const groParams = ref({
    fields: 'M100,M101,M102,M103,M104,M105,M106,M107,M108,M109,M110,M111,M112,M113,M114,M115,M116,M117,M118,M119,M120,M121,M122,M123,M124,M125,M126,M127,M128,M129',
    measurement: 'GROPOINTSTAT',
    device_code: null
  })
  
  const title = ref()
  const skeletonLoading = ref(true)
  const gropointData = ref([])
  const gropointList = ref([])
  let MAX_PROGRAM_NUMBER = 30

  
  async function fillGropointList() {
    gropointList.value = []
    await dataStore.getLastGropointStat(groParams.value)
    let GROPOINT_START_ADDRESS = 100
    if (dataStore.gropointStat !== undefined) {
      for(let i = 0; i < MAX_PROGRAM_NUMBER; i++){
        let tmpGropoint
        tmpGropoint = dataStore.gropointStat['M' + (GROPOINT_START_ADDRESS+i)] === undefined ? ['0', '0', '0', '0'] : dataStore.gropointStat['M' + (GROPOINT_START_ADDRESS+i)].split(',')
        let newObj = {
          livello1: tmpGropoint[0],
          livello2: tmpGropoint[1],
          livello3: tmpGropoint[2],
          livello4: tmpGropoint[3]
        }
        gropointList.value.push(newObj)
      }
    }
    console.log(gropointList.value)
  }

  function fillGropointData() {
    gropointData.value = []
    for (let i = 0; i < MAX_PROGRAM_NUMBER;i++) {
      let newObj = {
        livello1: gropointList.value[i].livello1,
        livello2: gropointList.value[i].livello2,
        livello3: gropointList.value[i].livello3,
        livello4: gropointList.value[i].livello4
      } 
      gropointData.value.push(newObj)
    }
    console.log(gropointData.value)
  }

  async function getLastData() {
    console.log('fetching new data')
    await fillGropointList()
    fillGropointData()
  }

  let getLastDataInterval = null


  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    groParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    getLastData()
    skeletonLoading.value = false
  })

  onMounted(() => {
    getLastDataInterval = setInterval(getLastData,5000)
  })

  onUnmounted(()=> {
    clearInterval(getLastDataInterval)
  })
  
  
  
  </script>
  
  <style scoped>
  
  .stato-stazione-container {
    @apply 
      relative flex flex-col 
      px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
      
  }
  .main {
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
      flex flex-col justify-center
      gap-2
      w-full
      sm:gap-4
      sm:my-[20px] 
  }
  
  
  input[type=text], input[type=password], input[type=number] {
    @apply pl-2 rounded w-10 md:w-20 py-2
  }
  
  .button-wrapper {
    @apply mt-3 flex w-[100px] mx-auto
  }
  
  
  /* Table Style */
  .table-container {
    @apply 
      w-full
      relative
      h-[300px] sm:h-full
      overflow-auto sm:overflow-visible
  }
  .table-container table {
    @apply 
      mb-10 w-full
  }
  
  
  .table-container th {
    @apply 
      font-semibold py-[10px] px-[10px] text-left sticky top-0 
      border-b-2 border-[#3a3a3e] bg-[#DDE8FA]/60 backdrop-blur-lg z-10
  }
  .table-container td {
    @apply 
      py-[10px] px-[10px]
      bg-[#DDE8FA]/60 backdrop-blur-lg 
  }
  .table-container th,td {
    @apply text-[10px] md:text-[16px]
  }
  
  .table-container tr {
    @apply text-left 
  } 
  </style>