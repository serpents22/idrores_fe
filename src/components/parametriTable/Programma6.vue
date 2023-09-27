<template>
  <form @submit.prevent="onSubmit" class="table-container">
    <div class="frame">
      <div class="frame-header">
        <span class="text-left font-semibold">{{$t('element')}}</span>
        <span class="text-left font-semibold">{{$t('action')}}</span>
      </div>
      <div class="field-wrapper">
        <span class="flex text-left">
          <label>{{$t('idrosatProgram')}}</label>
        </span>
        <span class="flex flex-col pl-4">
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="1">
            <label>1</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="2">
            <label>2</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="3">
            <label>3</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="4">
            <label>4</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="5">
            <label>5</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="6">
            <label>6</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="7">
            <label>7</label>
          </span>
          <span class="flex gap-2">
            <input :disabled="dataStore.fertConfig === undefined" type="checkbox" v-model="F15000" value="8">
            <label>8</label>
          </span>
        </span>
      </div>
      <div class="slider-wrapper">
        <div class="field-wrapper">
          <span class="flex">
            <label for="nome">{{$t('dosagePump')}} 1 (%)</label>
          </span>
          <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F15005}}</div>
        </div>
        <div class="w-full px-10 py-3">
          <input :disabled="dataStore.fertConfig === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F15005">
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="field-wrapper">
          <span class="flex">
            <label for="nome">{{$t('dosagePump')}} 2 (%)</label>
          </span>
          <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F15006}}</div>
        </div>
        <div class="w-full px-10 py-3">
          <input :disabled="dataStore.fertConfig === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F15006">
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="field-wrapper">
          <span class="flex">
            <label for="nome">{{$t('dosagePump')}} 3 (%)</label>
          </span>
          <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F15007}}</div>
        </div>
        <div class="w-full px-10 py-3">
          <input :disabled="dataStore.fertConfig === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F15007">
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="field-wrapper">
          <span class="flex">
            <label for="nome">{{$t('dosagePump')}} 4 (%)</label>
          </span>
          <div class="text-left px-4 py-2 bg-gray-200 rounded">{{fertData.F15008}}</div>
        </div>
        <div class="w-full px-10 py-3">
          <input :disabled="dataStore.fertConfig === undefined" type="range" min="0" max="100" step="1" v-model="fertData.F15008">
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
    </div>
  </form>
</template>

<script setup> 

import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue';
import { useDevicesStore } from '@/stores/DevicesStore';
import MyButton from '@/components/button/BaseButton.vue'

  const props = defineProps({
    id: String
  })

  const dataStore = useDataStore()
  const deviceStore = useDevicesStore()
  const { postControlIsLoading,fertConfigIsLoading } = storeToRefs(useDataStore())

  const fertParams = ref({
    fields: 'F15000,F15006,F15005,F15007,F15008',
    measurement: 'FERTPRGCONFIG6',
    device_code: null
  })

  const fertData = ref({})
  function fillFertData() {
    fertData.value.F15005 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F15005
    fertData.value.F15006 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F15006
    fertData.value.F15007 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F15007
    fertData.value.F15008 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F15008
  }
  const F15000 = ref([])

  function fillF15000Data() {
    let number = dataStore.fertConfig === undefined ? undefined : parseInt(dataStore.fertConfig.F15000)
    console.log(number)
    let checkBox = ref([])
    if (number === undefined) {
      checkBox = undefined
    } else {
      let binary = number.toString(2)
      if (binary.charAt(0) === '1') { checkBox.value.push('1') }
      if (binary.charAt(1) === '1') { checkBox.value.push('2') }
      if (binary.charAt(2) === '1') { checkBox.value.push('3') }
      if (binary.charAt(3) === '1') { checkBox.value.push('4') }
      if (binary.charAt(4) === '1') { checkBox.value.push('5') }
      if (binary.charAt(5) === '1') { checkBox.value.push('6') }
      if (binary.charAt(6) === '1') { checkBox.value.push('7') }
      if (binary.charAt(7) === '1') { checkBox.value.push('8') }
      console.log(checkBox.value)
    }
    F15000.value = checkBox.value
  }

  const postData = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })

  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    fertParams.value.device_code = deviceStore.deviceData.code
    await dataStore.getLastFertConfig(fertParams.value)
    fillF15000Data()
    fillFertData()
  }) 

  function onSubmit() {
    console.log(F15000.value)
    let tmpArray = []
    if (F15000.value.includes('1')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('2')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('3')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('4')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('5')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('6')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('7')) { tmpArray.push('1') } else { tmpArray.push('0') }
    if (F15000.value.includes('8')) { tmpArray.push('1') } else { tmpArray.push('0') }
    console.log(tmpArray)
    let tmpBinary = tmpArray.toString().replaceAll(',', '')
    let tmpDecimal = parseInt(tmpBinary,2)

    postData.value.payload.F15000 = String(tmpDecimal)
    postData.value.payload.F15005 = String(fertData.value.F15005)
    postData.value.payload.F15006 = String(fertData.value.F15006)
    postData.value.payload.F15007 = String(fertData.value.F15007)
    postData.value.payload.F15008 = String(fertData.value.F15008)
    
    dataStore.postControl(fertParams.value.device_code,postData.value)
    console.log(postData.value.payload)
  }

</script>

<style scoped>
 
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