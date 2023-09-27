<template>
<div class="orario-contai">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/imposta_orario.png">
      <p>{{ $t('setTimeData') }}</p>
    </div>
  </div>
  <div class="content">
    <IdroTitle :title="title"/>
    <div class="main">
      <form @submit.prevent="onSubmit" class="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>{{$t('idrosatSettingDataTime')}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="field-wrapper">
                  <input class="self-center" v-model="satData.giorno" type="number" name="giorno">
                  <span>/</span>
                  <input class="self-center" v-model="satData.mese" type="number" name="mese">
                  <span>/</span>
                  <input class="self-center" v-model="satData.anno" type="number" name="anno">
                  <span>{{$t('day')}}/{{$t('month')}}/{{$t('year')}}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field-wrapper">
                  <input class="self-center" v-model="satData.ore" type="number" name="ore">
                  <span>:</span>
                  <input class="self-center" v-model="satData.min" type="number" name="min">
                  <span>{{$t('hour')}}:{{$t('minute')}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="frame">
          <div class="frame-header">
            <span class="min-w-[100px] self-center font-semibold">Imposta orario alla tua idrosat</span>
          </div>
          <div class="frame-content">
            <div class="field-wrapper">
              <input class="self-center" v-model="formData.giorno" type="number" name="giorno">
              <span>/</span>
              <input class="self-center" v-model="formData.mese" type="number" name="mese">
              <span>/</span>
              <input class="self-center" v-model="formData.anno" type="number" name="anno">
              <span>giorno/mese/anno</span>
            </div>
            <div class="field-wrapper">
              <input class="self-center" v-model="formData.ore" type="number" name="ore">
              <span>:</span>
              <input class="self-center" v-model="formData.min" type="number" name="min">
              <span>ore:min</span>
            </div>
          </div>
        </div> -->
        <div class="button-wrapper">
          <MyButton type="submit" class="filled"  :label="$t('save')" :loading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
  import { useDataStore } from '@/stores/DataStore';
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
  import MyButton from '@/components/button/BaseButton.vue'
import { toInteger } from 'lodash';

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
  const dataStore = useDataStore()
  const { evConfigIsLoading, postControlIsLoading } = storeToRefs(useDataStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const title = ref()
  const satStatParams = ref({
    fields: 'S8',
    measurement: 'SATSTAT',
    device_code: null
  })

  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    satStatParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastSatStat(satStatParams.value)
    console.log(dataStore.satStat.S8)
    console.log(new Date(toInteger(dataStore.satStat.S8)*1000))
  })

  

  const satData = computed(() => {
    let now = new Date();
    let tz = now.getTimezoneOffset()*60
    let unixTime = (toInteger(dataStore.satStat.S8))-(tz*-1)
    console.log(toInteger(dataStore.satStat.S8))
    console.log(unixTime)
    const date = dataStore.satStat === undefined ? undefined : new Date(unixTime*1000)
    return {
      fullDate: date,
      giorno : date.getDate(),
      mese : date.getMonth()+1,
      anno : date.getFullYear(),
      ore : date.getHours(),
      min : date.getMinutes(),
      tz : date.getTimezoneOffset()
    }
  })

  const postData = ref({
    command: 'SATSTAT',
    payload: {}
  })

  function onSubmit() {
    const date = new Date(satData.value.anno, satData.value.mese-1,satData.value.giorno,satData.value.ore,satData.value.min)
    let unixtime = date.getTime()/1000
    let tz = date.getTimezoneOffset()*60
    let localeUnixTime = unixtime+(tz*-1)
    postData.value.payload.S8 = String(localeUnixTime)
    console.log(postData.value.payload)
    dataStore.postControl(satStatParams.value.device_code,postData.value)
  }

</script>

<style scoped>


.content {
  @apply 
    relative flex flex-col 
    px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
    
}
.main {
  @apply flex flex-col justify-center items-center relative max-w-[800px] w-full
  mx-auto 
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
  @apply  bg-[#DDE8FA]/60 backdrop-blur-lg 
          mb-10 w-full
}

.table-container thead {
  @apply border-b-2 border-[#3a3a3e]
}

.table-container th {
  @apply font-semibold py-[10px] px-[10px] text-left
}
.table-container td {
  @apply py-[10px] px-[10px]
}
.table-container th,td {
  @apply text-[10px] md:text-[16px]
}

.table-container tr {
  @apply text-left
} 

.field-wrapper {
  @apply  flex gap-2
          py-3 px-5 items-center
}

/* 
.orario-container {
  @apply flex flex-col w-full justify-center items-center
}

.device-container {
  @apply fixed top-0 left-0 items-center justify-start pt-[220px] ml-8 flex flex-col gap-10
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-10
}
.header img {
  @apply w-40
}

.content {
  @apply 
          flex flex-col items-center
          my-[40px]
}
.frame {
  @apply  flex flex-col
          bg-[#DDE8FA]/60 backdrop-blur-lg
          w-[800px] mb-10
}
.frame-header {
  @apply
          flex 
          border-b-2 border-[#3a3a3e]
          py-3 px-5
}



.content img {
  @apply w-40
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

input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded w-20 h-8
}


.dropdown {
  @apply pl-2 rounded w-20 h-8
}

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
} */
</style>