<template>
  <div class="stato-programmi-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/stato_programmi.png">
      <p>{{ $t('programStatus') }}</p>
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
                  <span>{{$t('program')}}</span>
                </th>
                <th>
                  <span>{{$t('status')}}</span>
                </th>
                <th>
                  <span>{{$t('action')}}</span>
                </th>
                <th>
                  <span>{{$t('stationUsed')}}</span>
                </th>
                <th>
                  <span>{{$t('remainingTime')}}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" >
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
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 w-48"></div>
                  </div>
                </td>
              </tr>
              <tr v-for="tData in satData" :key="tData.programma">
                <td>
                  <p>{{ tData.programma }}</p>
                </td>
                <td>
                  <Indicator :status="tData.stato" />
                </td>
                <td>
                  <p>{{ tData.azione }}</p>
                </td>
                <td>
                  <p>{{ tData.stazione }}</p>
                </td>
                <td>
                  <p>{{ tData.tempo }}</p>
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
  //props
  const props = defineProps({
    id: String
  })
  
  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  //state
  const deviceStore = useDevicesStore()
  const dataStore = useDataStore()
  const { satConfigIsLoading, satStartsIsLoading,satTimesIsLoading,satStatIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
    return [deviceStore.deviceData]
  })
  const title = ref()
  // const satConParams = ref({
  //   fields: 'S10000',
  //   measurement: 'SATPRGCONFIG1',
  //   device_code: null
  // })
  const satStatParams = ref({
    fields: 'S16,S40000,S40001,S40002,S40003,S40004,S40005,S40006,S40007,S40008,S40009,S40010,S40011,S40012,S40013,S40014,S40015,S40016,S40017,S40018,S40019,S40020,S40021,S40022,S40023,S40024,S40025,S40026,S40027,S40028,S40029',
    measurement: 'SATSTAT',
    device_code: null
  })
  // const satTimesParams = ref({
  //   fields: 'S10200,S10201,S10202,S10203,S10204,S10205,S10206,S10207,S10208,S10209,S10210,S10211,S10212,S10213,S10214,S10215,S10216,S10217,S10218,S10219,S10220,S10221,S10222,S10223,S10224,S10225,S10226,S10227,S10228,S10229,S10230,S10231,S10232,S10233,S10234,S10235,S10236,S10237,S10238,S10239,S10240,S10241,S10242,S10243,S10244,S10245,S10246,S10247,S10248,S10249,S10250,S10251,S10252,S10253,S10254,S10255,S10256,S10257,S10258,S10259,S10260,S10261,S10262,S10263,S10264,S10265,S10266,S10267,S10268,S10269,S10270,S10271,S10272,S10273,S10274,S10275,S10276,S10277,S10278,S10279,S10280,S10281,S10282,S10283,S10284,S10285,S10286,S10287,S10288,S10289,S10290,S10291,S10292,S10293,S10294,S10295',
  //   measurement: 'SATPRGTIMES1',
  //   device_code: null
  // })
  const satStartsParams = ref({
    fields: 'S10057',
    measurement: 'SATPRGSTARTS1',
    device_code: null
  })

  const satData = ref([])
  const statoList = ref([])
  const stazioneList = ref([])
  const stazioneAzioneTempoList = ref([])
  // const azioneList = ref([])
  // const tempoList = ref([])
  const loading = ref(true)
  let MAX_PROGRAM_NUMBER = 8

  // async function fillStatoListData() {
  //   statoList.value = []
  //   let satConfigStartAddress = 10000
  //   satConParams.value.measurement = ''
  //   satConParams.value.fields = ''
  //   for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
  //     satConParams.value.measurement = 'SATPRGCONFIG' + String(i+1)
  //     satConParams.value.fields = 'S' + (((i) * 1000) + satConfigStartAddress)
  //     await dataStore.getLastSatConfig(satConParams.value)
  //     let tmpSatConfig = dataStore.satConfig === undefined ? '0' : dataStore.satConfig['S' + (((i) * 1000) + 10000)]
  //     let tmpSatConfigToBoolean = tmpSatConfig === '1' ? true : false
  //     statoList.value.push(tmpSatConfigToBoolean)
  //   }
  //   console.log(statoList.value)
  // }
  
  async function fillStatoListData() {
    statoList.value = []
    let stazioneActive
    await dataStore.getLastSatStat(satStatParams.value)   
    stazioneActive = dataStore.satStat === undefined ? 0 : dataStore.satStat.S16
    console.log(stazioneActive)
    for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
      let tmpStato = stazioneActive.includes((i+1)) ? true : false
      console.log(tmpStato)
      statoList.value.push(tmpStato)
    }
    console.log(statoList.value)
  }

  // async function fillStazioneListData() {
  //   stazioneList.value = []
  //   let satTimesStartAddress = 10200
  //   let MAX_STEPS = 96
  //   let satTimesSteps = {}
  //   // Iterate the Programs Number
  //   for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
  //     satTimesParams.value.measurement = ''
  //     satTimesParams.value.fields = ''
  //     satTimesParams.value.measurement = 'SATPRGTIMES' + String(i+1) // Filling the params measurement
  //     // Iterate the Steps of Programs
  //     for (let j = 0; j < MAX_STEPS; j++) {
  //       satTimesParams.value.fields = satTimesParams.value.fields.concat(String('S' + (((i) * 1000) + (satTimesStartAddress+j)) + ',' ))// Filling the params fields
  //     }
  //     await dataStore.getLastSatTimes(satTimesParams.value)
  //     if (dataStore.satTimes !== undefined) {
  //       satTimesSteps = {}
  //       for (let k = 0; k < MAX_STEPS; k++) {
  //         let tmpSatTimes = dataStore.satTimes['S' + (((i) * 1000) + (satTimesStartAddress+k))] === undefined ? '0' : dataStore.satTimes['S' + (((i) * 1000) + (satTimesStartAddress+k))].split(',')
  //         satTimesSteps['S'+ k ] = tmpSatTimes[0]
  //       }
  //     } else {
  //       satTimesSteps = {}
  //       for (let k = 0; k < MAX_STEPS; k++) {
  //         satTimesSteps['S'+ k ] = '0'
  //       }
  //     }
  //     stazioneList.value.push(satTimesSteps)
  //   }
  //   console.log(stazioneList.value)
  // }

  
  async function fillAzioneTempoData() {
    stazioneAzioneTempoList.value = []
    let azioneStartAddress = 40000
    await dataStore.getLastSatStat(satStatParams.value)   

    for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
      let tmpAzioneTempo = dataStore.satStat['S' + (azioneStartAddress + i)] === undefined ? undefined : dataStore.satStat['S' + (azioneStartAddress + i)].split(',')
      let tmpAzione
      let tmpStazione
      let tmpTempo
      if (tmpAzioneTempo !== undefined) {
        tmpTempo = tmpAzioneTempo[2].replaceAll('.',' : ')
        tmpStazione  = tmpAzioneTempo[1]
        let tmpBoolean = tmpAzioneTempo[0]
        switch (tmpBoolean) {
          case '1':
          tmpAzione = t('waitingDeparture')
            break;
          case '2':
          tmpAzione = t('mvActive')
            break;
          case '3':
          tmpAzione = t('pause')
            break;
          case '4':
          tmpAzione = t('evActive')
            break;
          default:
          tmpAzione = t('notActive')
            break;
        }
      } else {
        tmpAzione = t('notActive')
        tmpTempo = '00:00:00'
      }
      let newObj = {
        stazione: tmpStazione,
        azione: tmpAzione,
        tempo: tmpTempo
      }
      stazioneAzioneTempoList.value.push(newObj)
    }
    console.log(stazioneAzioneTempoList.value)
  }


  // async function fillAzioneData() {
  //   let programActive
  //   await dataStore.getLastSatStat(satStatParams.value)   
  //   programActive = dataStore.satStat === undefined ? 0 : dataStore.satStat.S16
    
  //   for (let i = 1; i < MAX_PROGRAM_NUMBER+1; i++) {
  //     let tmpAzione
  //     tmpAzione = programActive.includes(i) ? 'attivo' : 'non attivo'
  //     azioneList.value.push(tmpAzione)
  //   }
  //   console.log(azioneList)
  // }

  // async function fillTempoListData() {
  //   let satStartsStartAddress = 10057
  //   satStartsParams.value.measurement = ''
  //   satStartsParams.value.fields = ''
  //   for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
  //     satStartsParams.value.measurement = 'SATPRGSTARTS' + String(i+1)
  //     satStartsParams.value.fields = 'S' + (((i) * 1000) + satStartsStartAddress)
  //     await dataStore.getLastSatStarts(satStartsParams.value)
  //     let tmpSatStarts = dataStore.satStarts === undefined ? '0' : dataStore.satStarts['S' + (((i) * 1000) + satStartsStartAddress)]
  //     // let tmpSatStartsToBoolean = tmpSatStarts === '1' ? true : false
  //     tempoList.value.push(tmpSatStarts)
  //   }
  //   console.log(tempoList.value)
  // }

  function fillSatData() {
    satData.value = []
    // let MAX_STEPS = 96
    // let tmpStazione = ref([])

    for (let i = 0; i < MAX_PROGRAM_NUMBER; i++) {
      // tmpStazione.value[i] = ''
      // for (let j = 0; j < MAX_STEPS; j++) {
      //   if (stazioneList.value[i]['S' + j] !== '0') {
      //     if (tmpStazione.value[i].length !== 0) {
      //       tmpStazione.value[i] = tmpStazione.value[i].concat(',' + stazioneList.value[i]['S' + j])
      //     } else {
      //       tmpStazione.value[i] = String(stazioneList.value[i]['S' + j])
      //     }
      //   }
      // }

      let newObj = {
        programma: String(i+1),
        stato: statoList.value[i],
        azione: stazioneAzioneTempoList.value[i].azione,
        stazione: stazioneAzioneTempoList.value[i].stazione,
        tempo: stazioneAzioneTempoList.value[i].tempo
      } 
      satData.value.push(newObj)
    }
    console.log(satData.value)
  }

  async function getLastData() {
    console.log('fetching new data')
    await fillStatoListData()
    await fillAzioneTempoData()
    fillSatData()
  }
  let getLastDataInterval = null

  onBeforeMount( async () => {
    await deviceStore.loadDevice(props.id)
    // satConParams.value.device_code = deviceStore.deviceData.code
    satStatParams.value.device_code = deviceStore.deviceData.code
    // satTimesParams.value.device_code = deviceStore.deviceData.code
    satStartsParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    await getLastData()
    loading.value = false
  })

  onMounted(()=> {
    getLastDataInterval = setInterval(getLastData, 5000)
  })

  onUnmounted(()=>{
    clearInterval(getLastDataInterval)
  })
  
  
  </script>
  
  <style scoped>
  
  .stato-programmi-container {
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