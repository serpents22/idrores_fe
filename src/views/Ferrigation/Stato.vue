<template>
  <div class="stato-fertirrigazione-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/stato_fertirrigazione.png">
      <p>{{ $t('fertigationStatus') }}</p>
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
                  <span>{{$t('status')}}</span>
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{{$t('counter')}} {{$t('principal')}}</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F12}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{{$t('counter')}}  1</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F4}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{{$t('counter')}}  2</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F6}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{{$t('counter')}}  3</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F8}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{{$t('counter')}}  4</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F10}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>EC</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F14}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>pH</p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F15}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{{$t('numberOfAlarm')}} </p>
                </td>
                <td>
                  <div v-show="isLoading" role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                  </div>
                  <p  v-show="!isLoading">{{fertData.F22}}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>
                  <span>{{$t('activeProg')}} </span>
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tData,index in fertData.F17" :key="tData">
                <td>
                  <p>{{$t('program')}} {{index+1}}</p>
                </td>
                <td>
                  <Indicator :status="tData" />
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
import Indicator from '@/components/Indicator.vue'
import MyButton from '@/components/button/BaseButton.vue'
  
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
  const title = ref()
 
  const fertParams = ref({
    fields: 'F12,F4,F6,F8,F10,F14,F15,F22,F17',
    measurement: 'FERTSTAT',
    device_code: null
  })

const fertData = computed(() => {

  let number = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F17
  let checkBox = ref([])
  if (number === undefined) {
    checkBox.value = [false,false,false,false,false,false,false,false]
  } else {
    if (number.includes('1')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('2')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('3')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('4')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('5')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('6')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('7')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    if (number.includes('8')) { checkBox.value.push(true) } else {checkBox.value.push(false)}
    console.log(checkBox.value)
  }

  return {
    F17 : checkBox.value === undefined ? undefined : checkBox.value,
    F12 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F12,
    F4 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F4,
    F6 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F6,
    F8 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F8,
    F10 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F10,
    F14 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F14,
    F15 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F15,
    F22 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F22,
  }
})  
 
const getLastData = () => {
  dataStore.getLastFertConfig(fertParams.value)
}
 
let dataInterval = null

onBeforeMount( async () => {
  await devicesStore.loadDevice(props.id)
  fertParams.value.device_code = devicesStore.deviceData.code
  title.value = 'Idrosat:' + devicesStore.deviceData.name
  getLastData()
})
 
onMounted( () => {
  dataInterval = setInterval(getLastData, 5000)
})

onUnmounted(() => {
  clearInterval(dataInterval)
})
 
</script>
 
<style scoped>
  
  .stato-fertirrigazione-container {
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