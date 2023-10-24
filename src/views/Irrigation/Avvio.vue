<template>
<div class="avvio-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/avvio_manuale.png">
      <p>{{ $t('manualStart') }}</p>
    </div>
  </div>
  <div class="content">
    <IdroTitle :title="title"/>
    <div class="main">
      <form @submit.prevent="onSubmit" class="form-container">
        <div class="frame">
          <div class="frame-header">
            <span class="font-bold text-xl">{{$t('manualIdrosatStart')}}</span>
          </div>
          <div class="frame-content">
            <div class="field-wrapper">
              <span class="w-[320px] flex text-left font-semibold">
                <label for="radiazione-solare">{{$t('stationsNumber')}} :</label>
              </span>
              <span class="flex w-full gap-2 items-center">
                <input 
                  class="w-full" type="number" name="radiazione-solare"
                  v-model="satData.stazione" >
              </span>
            </div>
            <div class="field-wrapper flex-col sm:flex-row ">
              <span class="w-[320px] flex text-left font-semibold">
                <label for="radiazione-solare">{{$t('irrigationTime')}} :</label>
              </span>
              <span class="flex w-full gap-2 items-center">
                <input 
                  class="w-full" type="number" name="radiazione-solare"
                  v-model="satData.ore">
                <p>ore</p>
                <input 
                  class="w-full" type="number" name="radiazione-solare"
                  v-model="satData.min">
                <p>min</p>
                <input 
                  class="w-full" type="number" name="radiazione-solare"
                  v-model="satData.sec">
                <p>sec</p>
                <div class="flex w-[80px]">
                  <MyButton
                    @click="sendS996"
                    class="filled__blue" label="Start" 
                    :loading="postControlIsLoading" />
                </div>
              </span>
            </div>
            <div class="field-wrapper">
              <span class="w-[320px] flex text-left font-semibold">
                <label for="radiazione-solare">{{$t('stopStation')}} N :</label>
              </span>
              <span class="flex w-full gap-2 items-center">
                <input 
                  class="w-full" type="number" name="radiazione-solare" 
                  v-model="satData.ferma">
                <div class="flex w-[80px]">
                  <MyButton
                  @click="sedS998(1)"
                   class="filled__blue" label="Stop"
                   :loading="postControlIsLoading" />
                </div>
              </span>
            </div>
            <!-- <div class="field-wrapper">
              <span class="w-[320px] flex text-left font-semibold">
                <label for="radiazione-solare">{{$t('skipStation')}} :</label>
              </span>
              <span class="flex w-full gap-2 items-center">
                <input class="w-full" type="number" name="radiazione-solare"
                  v-model="satData.salta">
                <div class="flex w-[80px]">
                  <MyButton 
                    @click="sedS998(2)"
                    class="filled__blue" label="Skip" 
                    :loading="postControlIsLoading" />
                </div>
              </span>
            </div> -->
            <div class="prog-wrapper">
              <div class="toggle-wrapper" v-for="prog,index in progs" :key="prog">
                <span class="font-semibold">prog{{index+1}}</span>
                <label class="inline-flex relative items-center cursor-pointer">
                 <input 
                  type="checkbox"
                  @click="onToggle(index+1)"
                  v-model="prog['prog' + (index+1)]"
                  class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { useDevicesStore } from '@/stores/DevicesStore'
import { useDataStore } from '@/stores/DataStore';
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref, onBeforeMount } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import toggle from '@/components/button/Toggle.vue'

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
  const { postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [deviceStore.deviceData]
    })
  const title = ref()
  const satConfigParams = ref({
    fields: 'S16',
    measurement: 'SATSTAT',
    device_code: null
  })
  const satData = ref({
    stazione: 0,
    ore: 0,
    min: 0,
    sec: 0,
    ferma: 0,
    salta: 0
  })
  
  function fillSatData() {
    // let tmpS16 = '1,2,3,4'
    let tmpS16 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig.S16

    if (tmpS16 === undefined) {
      for (let index = 0; index < 30; index++) {
        let progFalse = {['prog' + (index+1)] : false}
        progs.value.push(progFalse)
      }
    } else {
      // let splitS16 = tmpS16.split('/')
      let tmpProg = tmpS16.split(',')
      // let tmpProg = splitS16[0].split(',')
      // let tmpStat = splitS16[1].split(',')
      progs.value =[]
      for (let index = 0; index < 8; index++) {
        if (tmpProg.includes(String((index+1)))) { 
          let progTrue = {['prog' + (index+1)] : true}
          progs.value.push(progTrue)
          // progs.value[index]['prog' + (index+1)] = true 
        } else {
          let progFalse = {['prog' + (index+1)] : false}
          progs.value.push(progFalse)
        }
      }
      console.log(progs.value)
    }
  }

  const postData = ref({
    command: 'SATSTAT',
    payload: {}
  })



  function sendS996() {
    postData.value.payload = {}
    let tmpStazione = satData.value.stazione
    let tmpOre = satData.value.ore
    let tmpMin = satData.value.min
    let tmpSec = satData.value.sec
    let appendedValue = String(tmpStazione + ',' + tmpOre + ',' + tmpMin + ',' + tmpSec)
    postData.value.payload.S996 = appendedValue
    console.log(postData.value.payload)
    dataStore.postControl(satConfigParams.value.device_code,postData.value)
  }

  function sedS998(index) {
    postData.value.payload = {}
    if (index === 1) {
      satData.value.ferma
      postData.value.payload.S998 = satData.value.ferma
      console.log(postData.value.payload)
      dataStore.postControl(satConfigParams.value.device_code,postData.value)
    } else if (index === 2) {
      satData.value.salta
      postData.value.payload.S998 = satData.value.salta
      console.log(postData.value.payload)
      dataStore.postControl(satConfigParams.value.device_code,postData.value)
    }
  }

  onMounted( async () => {
    await deviceStore.loadDevice(props.id)    
    satConfigParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    await dataStore.getLastSatConfig(satConfigParams.value)
    fillSatData()
  })


  const progs = ref([])

  function onToggle(index) {
   console.log(index)
   console.log(progs.value)
   postData.value.payload = {}

   progs.value[index-1]['prog'+ index] = !progs.value[index-1]['prog'+ index]

   if (progs.value[index-1]['prog'+ index] === true) {
     postData.value.payload.S997 = String(index)
   } else if (progs.value[index-1]['prog'+ index] === false) {
     postData.value.payload.S999 = String(index)
   }
   console.log(postData.value.payload)
   dataStore.postControl(satConfigParams.value.device_code,postData.value)
  }


</script>

<style scoped>

.avvio-container {
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


.form-container {
  @apply 
    w-full
    relative
    h-[300px] sm:h-full
    overflow-auto sm:overflow-visible
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
  @apply pl-2 rounded py-2 w-full min-w-[30px]
}

.button-wrapper {
  @apply mt-3 flex mx-auto w-full min-w-[40px]
}

.frame {
  @apply  flex flex-col
          bg-[#DDE8FA]/60 backdrop-blur-lg
          w-full mb-10
}
.frame-header {
  @apply
          flex justify-center
          border-b-2 border-[#3a3a3e]
          py-3 px-5
}

.field-wrapper {
  @apply  flex gap-4
          py-3 px-5 items-center
}

.prog-wrapper {
  @apply flex flex-wrap gap-x-32 gap-y-8
}
.toggle-wrapper {
  @apply flex flex-col items-center 
  gap-4 px-5 py-3 w-20
}
</style>