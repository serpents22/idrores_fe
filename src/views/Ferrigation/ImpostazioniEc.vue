<template>
  <!-- <loading :loading="isLoading" /> -->
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
      <img src="@/assets/EC_fertirrigazione.png">
      <p>{{ $t('fertigationEC') }}</p>
    </div>
    </div>
    <div class="content">
      <IdroTitle :title="title"/>
      <select 
        class="cursor-pointer w-[200px] rounded-md px-2 py-1 sm:px-4 sm:py-2 self-center" 
        @change="changeOption($event)">
        <option 
          v-for="tab in tabs" :key="tab.value"
          class="nav"
          :id="tab">{{tab}}</option>
      </select>
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
                  <label>{{$t('hysteresis')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F15 === undefined"
                      v-model="fertData.F15" type="number" name="isteresi">
                    <p>uS</p>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('checkEvery')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F18 === undefined" 
                      v-model="fertData.F18" type="number" name="controllaOgni">
                    <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                      <span class="flex gap-2">
                        <input id="secondi" type="radio" :disabled="fertData.F17 === undefined"  v-model="fertData.F17" value="0" name="F17">
                        <label for="secondi">{{$t('second')}}</label>
                      </span>
                      <span class="flex gap-2">
                        <input id="cicli" type="radio" :disabled="fertData.F17 === undefined" v-model="fertData.F17" value="1" name="F17">
                        <label for="cicli">{{$t('cycles')}}</label>
                      </span>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Setpoint Ec</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F19 === undefined"
                      v-model="fertData.F19" type="number" name="setPointEc">
                    <p>uS</p>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Setpoint Ph</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="fertData.F02 === undefined" 
                      v-model="fertData.F02" type="number" name="setPointPh">
                    <p>Sec</p>
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
                      <input id="phacido" :disabled="fertData.F01 === undefined" type="radio" v-model="fertData.F01" value="0" name="F01">
                      <label for="phacido">Ph {{$t('basic')}}</label>
                    </span>
                    <span class="flex gap-2">
                      <input id="phbasico" :disabled="fertData.F01 === undefined" type="radio" v-model="fertData.F01" value="1" name="F01">
                      <label for="phbasico">Ph {{$t('acid')}}</label> <!-- MV invertito 05.04.2023 richiesto da Giuseppe-->
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div class="button-wrapper">
                    <MyButton type="submit" class="filled__blue"  :label="$t('save')" :loading="postControlIsLoading" />
                    <MyButton type="button" class="filled__blue"  :label="$t('cancel')" :loading="fertConfigIsLoading" @click="onCancel" />
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
  const { postControlIsLoading, fertConfigIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])
  const title = ref()
  const fertParams = ref({
    fields: 'F10001,F10002,F10017,F10018,F10019,F10015',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })
  const fertData = ref({})

  function fillFertData() {
    fertData.value.F01 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10001)]
    fertData.value.F02 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10002)]
    fertData.value.F15 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10015)]
    fertData.value.F17 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10017)]
    fertData.value.F18 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10018)]
    fertData.value.F19 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10019)]
  }

  const postData = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })
    
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    fertParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastFertConfig(fertParams.value)
    fillFertData()
  })

  
  function onSubmit() {
    postData.value.payload = {}
    postData.value.command = String('FERTPRGCONFIG' + optionValue.value)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10001)] = String(fertData.value.F01)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10002)] = String(fertData.value.F02)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10015)] = String(fertData.value.F15)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10017)] = String(fertData.value.F17)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10018)] = String(fertData.value.F18)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10019)] = String(fertData.value.F19)
    console.log(postData.value.payload)

    dataStore.postControl(fertParams.value.device_code,postData.value)
  }
  function onCancel() {
    dataStore.getLastFertConfig(fertParams.value)
  }
  
  async function changeOption(e) {
    optionValue.value = e.target.value
    console.log(optionValue.value)
    fertParams.value.fields = String(
      'F' + (((e.target.value - 1) * 1000) + 10001) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10002) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10015) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10017) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10018) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10019))

    fertParams.value.measurement = String('FERTPRGCONFIG' + e.target.value)
    await dataStore.getLastFertConfig(fertParams.value)

    fillFertData()
    console.log(fertData.value)
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
    @apply pl-2 rounded w-10 sm:w-28 py-2 sm:py-3
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

input:disabled, select:disabled {
    @apply cursor-default animate-pulse
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