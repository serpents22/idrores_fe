<template>
<loading :loading="isLoading" />
<div class="avazanta-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/configurazione_avanza.png">
      <p>{{ $t('advancedConfig') }}</p>
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
                <span>{{$t('element')}}</span>
              </th>
              <th>
                <span>{{$t('action')}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label>{{$t('openedCircuit')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1000 === undefined"
                    v-model="icodData.I1000" type="number" >
                  <p>mA</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('acknowledgePulseTime')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1001 === undefined"
                    v-model="icodData.I1001" type="number" >
                  <p>ms</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('minAmpere')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1002 === undefined"
                    v-model="icodData.I1002" type="number" >
                  <p>mA</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('activationDelayMaster')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1003 === undefined"
                    v-model="icodData.I1003" type="number" >
                  <p>ms</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('activationDelayEV')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1004 === undefined" 
                    v-model="icodData.I1004" type="number" >
                  <p>Sec</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('evHoldingVoltage')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1005 === undefined"   
                    v-model="icodData.I1005" type="number" >
                  <p>V</p>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('triggerPulseTime')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    :disabled="icodData.I1006 === undefined"
                    v-model="icodData.I1006" type="number" >
                  <p>sec</p>
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
           <tr>
             <td>
               <div class="button-wrapper">
                 <MyButton type="submit" class="filled"  :label="$t('save')" :loading="dataStore.postControlIsLoading" />
               </div>
             </td>
             <td>
               <div class="button-wrapper">
               </div>
             </td>
           </tr>
          </tfoot>
        </table>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { useDataStore } from '@/stores/DataStore';
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
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
  const icodParams = ref({
    fields: 'I1000,I1001,I1002,I1003,I1004,I1005,I1006',
    measurement: 'ICODCONFIG',
    device_code: undefined
  })

  const icodData = computed(() => {
    return {
      I1000 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1000,
      I1001 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1001,
      I1002 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1002,
      I1003 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1003,
      I1004 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1004,
      I1005 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1005,
      I1006 : dataStore.icodConfig === undefined ? undefined : dataStore.icodConfig.I1006,
    }
  })


  const postData = ref({
    command: 'ICODCONFIG',
    payload: {}
  })

  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    icodParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    dataStore.getLastIcodConfig(icodParams.value)
    console.log(icodData.value)
  })

  function onSubmit() {
    postData.value.payload.I1000 = String(icodData.value.I1000)
    postData.value.payload.I1001 = String(icodData.value.I1001)
    postData.value.payload.I1002 = String(icodData.value.I1002)
    postData.value.payload.I1003 = String(icodData.value.I1003)
    postData.value.payload.I1004 = String(icodData.value.I1004)
    postData.value.payload.I1005 = String(icodData.value.I1005)
    postData.value.payload.I1006 = String(icodData.value.I1006)
    
    dataStore.postControl(icodParams.value.device_code,postData.value)
    console.log(postData.value)
  }

</script>

<style scoped>
.avazanta-container {
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
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3
}

.dropdown {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
}

.button-wrapper {
  @apply mt-3 flex gap-4 justify-between w-52
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
    border-b border-[#3a3a3e] bg-[#DDE8FA]/60 backdrop-blur-lg z-10
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

.field-wrapper {
  @apply flex py-2 px-4 items-center
}

</style>