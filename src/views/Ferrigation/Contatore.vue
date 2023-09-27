<template>
  <loading :loading="isLoading" />
  <div class="contatore-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" 
        />
    <div class="xs-icon-card">
      <img src="@/assets/contatore_fertirrigazione.png">
      <p>{{ $t('fertigationCounter') }}</p>
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
                  <label>{{$t('counter')}} {{$t('principal')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F1001 === undefined"
                      id="reed" name="F1001" type="radio" 
                      v-model="fertData.F1001" value="0">
                    <label for="reed">REED</label>
                  </span>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F1001 === undefined"
                      id="ttl" name="F1001" type="radio" 
                      v-model="fertData.F1001" value="1">
                   <label for="ttl">TTL</label>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('impulsiLitri')}}</label>
                </td>
                <td>
                  <span class="flex gap-2">
                    <input :disabled="fertData.F1010 === undefined"
                      type="number" name="impulsi"
                      v-model="fertData.F1010" >
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('counterAlarm')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F1011 === undefined"
                      type="number" name="soglia"
                      v-model="fertData.F1011">
                    <p>sec</p>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('minimumFlowRate')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F1016 === undefined"
                      type="number" name="valoreMinimo"
                      v-model="fertData.F1016">
                    <span class="fle flex-col sm:flex-row gap-4 pl-4">
                      <span class="flex gap-2">
                        <input id="litri/minuto" name="F1017" :disabled="fertData.F1017 === undefined" type="radio" v-model="fertData.F1017" value="0">
                        <label for="litri/minuto">{{$t('litre')}}/{{$t('minute')}}</label>
                      </span>
                      <span class="flex gap-2">
                        <input id="m3/ora" name="F1017" :disabled="fertData.F1017 === undefined" type="radio" v-model="fertData.F1017" value="1">
                        <label for="m3/ora">m<sup>3</sup>/{{$t('hour')}}</label>
                      </span>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('dosage')}} pH</label>
                </td>
                <td>
                  <span class="flex flex-col pl-4">
                    <span class="flex gap-2">
                      <input id="phacido" :disabled="fertData.F1026 === undefined" type="radio" v-model="fertData.F1026" value="0" name="F1026">
                      <label for="phacido">Ph {{$t('acid')}}</label>
                    </span>
                    <span class="flex gap-2">
                      <input id="phbasico" :disabled="fertData.F1026 === undefined" type="radio" v-model="fertData.F1026" value="1" name="F1026">
                      <label for="phbasico">Ph {{$t('basic')}}</label>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('hysteresis')}} Ph</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F1028 === undefined"
                      type="number" name="isteresiPh" step="0.01"
                      v-model="fertData.F1028">
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div class="button-wrapper">
                    <MyButton type="submit" class="filled"  :label="$t('save')" :loading="dataStore.postControlIsLoading" />
                    <MyButton type="button" class="filled"  :label="$t('cancel')" :loading="fertConfigIsLoading" @click="onCancel"/>
                  </div>
                </td>
                <td>
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
  const { postControlIsLoading, fertConfigIsLoading } = storeToRefs(useDataStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  
  const title = ref()
  const fertParams = ref({
    fields: 'F1001,F1010,F1011,F1016,F1017,F1026,F1028',
    measurement: 'FERTCONFIG',
    device_code: null
  })
  const fertData = computed(() => {
    return {
      F1001 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1001,
      F1010 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1010,
      F1011 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1011,
      F1016 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1016,
      F1017 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1017,
      F1026 :dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1026,
      F1028 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1028,
    }
  })  
  const postData = ref({
    command: 'FERTCONFIG',
    payload: {}
  })
    
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    fertParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    dataStore.getLastFertConfig(fertParams.value)
  })
  
  function onSubmit() {
    postData.value.payload.F1001 = String(fertData.value.F1001)
    postData.value.payload.F1010 = String(fertData.value.F1010)
    postData.value.payload.F1011 = String(fertData.value.F1011)
    postData.value.payload.F1016 = String(fertData.value.F1016)
    postData.value.payload.F1017 = String(fertData.value.F1017)
    postData.value.payload.F1026 = String(fertData.value.F1026)
    postData.value.payload.F1028 = String(fertData.value.F1028)
    
    dataStore.postControl(fertParams.value.device_code,postData.value)
    console.log(postData.value)
  }
  function onCancel() {
    dataStore.getLastFertConfig(fertParams.value)
  }
  
</script>
  
  <style scoped>
  .contatore-container {
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
  input[type=radio] {
    @apply cursor-pointer
  }
  .dropdown {
    @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
  }
  

.button-wrapper {
  @apply mt-3 flex mx-auto gap-4 justify-between
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
  
  input:disabled, select:disabled {
    @apply cursor-default animate-pulse
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