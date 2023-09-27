<template>
  <div class="parametri-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/parametri_fertirrigazione.png">
      <p>{{ $t('fertigationParameter') }}</p>
    </div>
    </div>
    <div class="content">
      <div class="header">
        <IdroTitle :title="$t('program')" />
        <select 
          class="cursor-pointer w-[200px] rounded-md px-2 py-1 sm:px-4 sm:py-2 self-center" 
          @change="changeOption($event)">
          <option 
            v-for="tab in tabs" :key="tab.value"
            class="nav"
            :id="tab">{{tab}}</option>
        </select>
        <h2 class="font-bold text-xl">{{title}}</h2>
      </div>
      <div class="main">
        <form @submit.prevent="onSubmit" class="table-container">
          <div class="frame">
            <div class="frame-header justify-between">
              <span class="text-left font-semibold">{{$t('element')}}</span>
              <span class="text-left font-semibold">{{$t('action')}}</span>
            </div>
            <div class="field-wrapper">
              <span class="flex text-left">
                <label>{{$t('idrosatProgram')}}</label>
              </span>
              <span class="flex flex-col pl-4">
                <span class="flex gap-2"  v-for="check in checks" :key="check">
                  <input disabled type="checkbox" v-model="fertData.F0" :value=check>
                  <label>{{check}}</label>
                </span>
                <!-- <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="2">
                  <label>2</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="3">
                  <label>3</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="4">
                  <label>4</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="5">
                  <label>5</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="6">
                  <label>6</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="7">
                  <label>7</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="8">
                  <label>8</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="8">
                  <label>8</label>
                </span>
                <span class="flex gap-2">
                  <input :disabled="fertData.F0 === undefined" type="checkbox" v-model="fertData.F0" value="8">
                  <label>8</label> 
                </span>-->
              </span>
            </div>
            <div class="slider-wrapper">
              <div class="field-wrapper">
                <span class="flex">
                  <label for="nome">{{$t('dosagePump')}} 1 (%)</label>
                </span>
                <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F5}}</div>
              </div>
              <div class="w-full px-10 py-3">
                <input 
                  :disabled="fertData.F5 === undefined" 
                  type="range" min="0" max="100" step="1" 
                  v-model="fertData.F5"
                  class="bg-blue-400">
              </div>
            </div>
            <div class="slider-wrapper">
              <div class="field-wrapper">
                <span class="flex">
                  <label for="nome">{{$t('dosagePump')}} 2 (%)</label>
                </span>
                <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F6}}</div>
              </div>
              <div class="w-full px-10 py-3">
                <input :disabled="fertData.F6=== undefined" type="range" min="0" max="100" step="1" v-model="fertData.F6">
              </div>
            </div>
            <div class="slider-wrapper">
              <div class="field-wrapper">
                <span class="flex">
                  <label for="nome">{{$t('dosagePump')}} 3 (%)</label>
                </span>
                <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F7}}</div>
              </div>
              <div class="w-full px-10 py-3">
                <input :disabled="fertData.F7 === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F7">
              </div>
            </div>
            <div class="slider-wrapper">
              <div class="field-wrapper">
                <span class="flex">
                  <label for="nome">{{$t('dosagePump')}} 4 (%)</label>
                </span>
                <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F8}}</div>
              </div>
              <div class="w-full px-10 py-3">
                <input :disabled="fertData.F8 === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F8">
              </div>
            </div>
          </div>
          <div class="button-wrapper">
            <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
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
  
  const deviceStore = useDevicesStore()
  const dataStore = useDataStore()
  const { postControlIsLoading, fertConfigIsLoading } = storeToRefs(useDataStore())
  const newData = computed(() => {
    return [deviceStore.deviceData]
  })

  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])
  const checks = ref(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'])
  const title = ref()
  const fertParams = ref({
    fields: 'F10000,F10006,F10005,F10007,F10008',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })
  const fertData = ref({})

  function fillFertData() {


    let checkBoxF0 = dataStore.fertConfig === undefined ? undefined : binToArray(dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10000)])

    fertData.value.F0 = checkBoxF0 === undefined ? undefined : checkBoxF0
    fertData.value.F5 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10005)]
    fertData.value.F6 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10006)]
    fertData.value.F7 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10007)]
    fertData.value.F8 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10008)]
  }

  const postData = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })
    
  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    fertParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    await dataStore.getLastFertConfig(fertParams.value)
    fillFertData()
  })
  
  function onSubmit() {
    postData.value.payload = {}
    postData.value.command = String('FERTPRGCONFIG' + optionValue.value)
    let binaryF0 = arrayToBinary(fertData.value.F0)

    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10000)] = String(binaryF0)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10005)] = String(fertData.value.F5)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10006)] = String(fertData.value.F6)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10007)] = String(fertData.value.F7)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10008)] = String(fertData.value.F8)
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
      'F' + (((e.target.value - 1) * 1000) + 10000) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10005) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10006) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10007) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10008))

    fertParams.value.measurement = String('FERTPRGCONFIG' + e.target.value)
    await dataStore.getLastFertConfig(fertParams.value)

    fillFertData()
    console.log(fertData.value)
  }

  //other function
  const binToArray = ((address) => {
    let binary = address === undefined ? undefined : address
    console.log(binary)
    let checkBox = ref([])
    if (binary === undefined) {
      checkBox.value = undefined
    } else {
      if (binary.charAt(0) === '1') { checkBox.value.push('1') }
      if (binary.charAt(1) === '1') { checkBox.value.push('2') }
      if (binary.charAt(2) === '1') { checkBox.value.push('3') }
      if (binary.charAt(3) === '1') { checkBox.value.push('4') }
      if (binary.charAt(4) === '1') { checkBox.value.push('5') }
      if (binary.charAt(5) === '1') { checkBox.value.push('6') }
      if (binary.charAt(6) === '1') { checkBox.value.push('7') }
      if (binary.charAt(7) === '1') { checkBox.value.push('8') }
      if (binary.charAt(8) === '1') { checkBox.value.push('9') }
      if (binary.charAt(9) === '1') { checkBox.value.push('10') }
      if (binary.charAt(10) === '1') { checkBox.value.push('11') }
      if (binary.charAt(11) === '1') { checkBox.value.push('12') }
      if (binary.charAt(12) === '1') { checkBox.value.push('13') }
      if (binary.charAt(13) === '1') { checkBox.value.push('14') }
      if (binary.charAt(14) === '1') { checkBox.value.push('15') }
      if (binary.charAt(15) === '1') { checkBox.value.push('16') }
      if (binary.charAt(16) === '1') { checkBox.value.push('17') }
      if (binary.charAt(17) === '1') { checkBox.value.push('18') }
      if (binary.charAt(18) === '1') { checkBox.value.push('19') }
      if (binary.charAt(19) === '1') { checkBox.value.push('20') }
      if (binary.charAt(20) === '1') { checkBox.value.push('21') }
      if (binary.charAt(21) === '1') { checkBox.value.push('22') }
      if (binary.charAt(22) === '1') { checkBox.value.push('23') }
      if (binary.charAt(23) === '1') { checkBox.value.push('24') }
      if (binary.charAt(24) === '1') { checkBox.value.push('25') }
      if (binary.charAt(25) === '1') { checkBox.value.push('26') }
      if (binary.charAt(26) === '1') { checkBox.value.push('27') }
      if (binary.charAt(27) === '1') { checkBox.value.push('28') }
      if (binary.charAt(28) === '1') { checkBox.value.push('29') }
      if (binary.charAt(29) === '1') { checkBox.value.push('30') }
      console.log(checkBox.value)
    }
    return checkBox.value
  })

  
  const arrayToBinary = ((value) => {
    let tmpArray = value === undefined ? undefined : value
    console.log(tmpArray)
    let tmpBinary =''
    if (tmpArray === undefined) {
      tmpBinary = '000000000000000000000000000000'
    } else {
      tmpBinary = ''
      if (tmpArray.includes('1')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('2')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('3')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('4')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('5')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('6')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('7')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('8')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('9')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('10')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('11')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('12')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('13')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('14')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('15')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('16')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('17')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('18')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('19')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('20')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('21')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('22')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('23')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('24')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('25')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('26')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('27')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('28')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('29')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
      if (tmpArray.includes('30')) { tmpBinary = tmpBinary.concat('1') } else { tmpBinary = tmpBinary.concat('0') }
    }
    console.log(tmpBinary)
    return tmpBinary
  })

  </script>
  
  <style scoped>
.parametri-container {
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

.header {
  @apply
    flex flex-col justify-center items-center
}

input[type=checkbox], input[type=radio], input[type=range]{
  @apply cursor-pointer
}

input[type=range]{
  @apply w-full
}
.frame {
  @apply  flex flex-col
          bg-[#DDE8FA]/60 backdrop-blur-lg
          w-full mb-10
}
.frame-header {
  @apply
          flex border-b-2 border-[#3a3a3e] w-full
          py-3 px-5
}

  
.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}

input:disabled, select:disabled {
    @apply cursor-default animate-pulse
} 
  
.field-wrapper {
  @apply flex py-2 px-4 w-full justify-between items-center
}

.slider-wrapper {
  @apply flex flex-col
}

.table-container {
    @apply 
      w-full
      relative
      h-[300px] sm:h-full
      overflow-auto sm:overflow-visible
}
  </style>