<template>
<div class="sensori-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/gestisci_sensori.png">
      <p>{{ $t('sensorsManagement') }}</p>
    </div>
  </div>
  <div class="content">
    <div class="header">
      <IdroTitle :title="$t('sensorsManagement')"/>
      <select 
        class="dropdown"
        @change="changeOption($event)">
        <option 
          v-for="tab in tabs" :key="tab.value"
          class="nav"
          :id="tab">{{tab}}</option>
      </select>
      <h2 class="font-bold text-xl">{{title}}</h2>
    </div>
    <div class="main">
      <form @submit.prevent="onSubmit" class="form-container">
        <div class="frame">
          <div class="frame-header">
            <span class="text-left font-semibold">{{ $t('sensorsSetting') }}</span>
          </div>
          <div class="form">
            <div class="border-b-4 border-yellow-100 pb-4">
              <div class="field-title">
                <span  class="w-[360px] text-left font-semibold">{{ $t('humidity') }}</span>
              </div>
              <div class="field-wrapper">
                <div class="field">
                  <span>
                    <label for="umidita-bassa">{{ $t('low') }} <sup>o</sup>C</label>
                  </span>
                  <input v-model="umiditaBassa" type="number" id="umidita-bassa" disabled>
                </div>
                <div class="field">
                  <span>
                    <label for="umidita-bassa">{{ $t('high') }} <sup>o</sup>C</label>
                  </span>
                  <input v-model="umiditaAlta" type="number" id="umidita-bassa" disabled>
                </div>
              </div>
              <div class="slider">
                <VueSlider 
                  @dragging="syncValues"
                  @click="syncValues"
                  v-model="satData.umidita"
                  :min="umiditaMin" 
                  :max="umiditaMax"
                  :enableCross="false" />
              </div>
              <div class="field-wrapper">
                <span class="w-[360px] flex">
                  <label for="sensora-umidita">{{ $t('humiditySensorType') }} :</label>
                </span>
                <span class="field">
                  <select 
                    class="dropdown"
                     v-model="satData.S5" :disabled="satData.S5 === undefined"
                     id="sensora-umidita">
                    <option v-for="option in sensoraUmiditaOptions" :key="option" :value=option.value>{{option.title}}</option>
                  </select>
                </span>
              </div>
              <div class="field-wrapper">
                <span class="w-[360px] flex">
                  <label for="sensora-umidita">{{ $t('humiditySensorLevel') }} :</label>
                </span>
                <span class="field">
                  <select 
                    class="dropdown" 
                    v-model="satData.S20" :disabled="satData.S20 === undefined"
                    id="sensora-umidita">
                    <option v-for="option in livellosensoraUmiditaOptions" :key="option" :value=option.value>{{option.title}}</option>
                  </select>
                </span>
              </div>
              <div class="field-title">
                <span  class="w-[360px] text-left font-semibold">Water Budget %</span>
              </div>
              <div class="field-wrapper">
                <div class="field">
                  <span>
                    <label for="water-budget">{{ $t('low') }} <sup>o</sup>C</label>
                  </span>
                  <input 
                    v-model="satData.S7" 
                    type="number" id="water-budget" disabled>
                </div>
                <div class="field">
                  <span>
                    <label for="water-budget">Auto</label>
                  </span>
                  <div class="field">
                    <label for="auto-toggle" class="inline-flex relative items-center cursor-pointer">
                     <input 
                      type="checkbox" 
                      v-model="satData.auto" 
                      id="auto-toggle" 
                      class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div class="slider">
                <VueSlider 
                  :disabled="satData.S7 === undefined || satData.auto === true"
                  v-model="satData.S7"
                  :min="waterBudgetMin" 
                  :max="waterBudgetMax"/>
              </div>
            </div>
            <div class="border-b-4 border-yellow-100 py-4">
              <div class="field-wrapper">
                <span class="w-[360px] text-lg font-bold flex text-left">
                  <label>{{ $t('programStop') }}</label>
                </span>
                <span class="field">
                  <span class="flex gap-2">
                    <input 
                      :disabled="satData.S8 === undefined" 
                      id="primo-ingresso" type="checkbox" 
                      v-model="satData.S8" value="5">
                    <label for="primo-ingresso" >{{ $t('firstEntry') }}</label>
                  </span>
                  <span class="flex gap-2">
                    <input 
                      :disabled="satData.S8 === undefined" 
                      id="umidita-bassa" type="checkbox" 
                      v-model="satData.S8" value="2">
                    <label for="umidita-bassa" >{{ $t('lowHumidity') }}</label>
                  </span>
                  <span class="flex gap-2">
                    <input 
                      :disabled="satData.S8 === undefined" 
                      id="umidita-alta" type="checkbox" 
                      v-model="satData.S8" value="8">
                    <label for="umidita-alta">{{ $t('highHumidity') }}</label>
                  </span>
                  <span class="flex gap-2">
                    <input 
                      :disabled="satData.S8 === undefined" 
                      id="pressione-bassa" type="checkbox" 
                      v-model="satData.S8" value="11">
                    <label for="pressione-bassa">{{ $t('lowPressure') }}</label>
                  </span>
                  <span class="flex gap-2">
                    <input 
                      :disabled="satData.S8 === undefined" 
                      id="pressione-alta" type="checkbox" 
                      v-model="satData.S8" value="12">
                    <label for="pressione-alta">{{ $t('highPressure') }}</label>
                  </span>
                </span>
              </div>
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
import { defineAsyncComponent,  computed,  onMounted,  ref, watchEffect, watch } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import Toggle from '@/components/button/Toggle.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
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
  const { postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [deviceStore.deviceData]
    })

  const tabs = ref(['1','2','3','4','5','6','7','8'])
  const title = ref()
  const satConfigParams = ref({
    fields: 'S10005,S10007,S10008,S10009,S10010,S10011,S10014,S10015,S10016,S10017,S10020',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })
  const satData = ref({})

  const temperaturaBassa = ref()
  const temperaturaAlta = ref()
  const temperaturaMin = -20
  const temperaturaMax = 100
  const umiditaBassa = ref()
  const umiditaAlta = ref()
  const umiditaMin = 0
  const umiditaMax = 100
  const waterBudget = ref(20)
  const waterBudgetMin = 0
  const waterBudgetMax = 100
  const optionValue = ref(1)

  function fillSatData() {
    let checkBoxS8 = binToArray(dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10008)])
    let checkBoxS9 = binToArray(dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10009)])
    let checkBoxS10 = binToArray(dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10010)])
    let checkBoxS11 = binToArray(dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10011)])

    
    satData.value.S5 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10005)]
    satData.value.S7 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10007)]
    satData.value.S8 = checkBoxS8 === undefined ? undefined : checkBoxS8
    satData.value.S9 = checkBoxS9 === undefined ? undefined : checkBoxS9
    satData.value.S10 = checkBoxS10 === undefined ? undefined : checkBoxS10
    satData.value.S11 = checkBoxS11 === undefined ? undefined : checkBoxS11
    satData.value.S14 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10014)]
    satData.value.S15 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10015)]
    satData.value.S16 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10016)]
    satData.value.S17 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10017)]
    satData.value.S20 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) + 10020)]
    satData.value.temperatura = [parseInt(satData.value.S14),parseInt(satData.value.S15)]
    satData.value.umidita = [parseInt(satData.value.S16),parseInt(satData.value.S17)]
    if (satData.value.S7 === '255') {
      satData.value.auto = true
    } else {
      satData.value.auto = false
    }
  }

  const postData = ref({
    command: 'SATPRGCONFIG1',
    payload: {}
  })

  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    satConfigParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    await dataStore.getLastSatConfig(satConfigParams.value)
    fillSatData()
    syncValues()
  })
  

  function onSubmit() {
    console.log(satData.value)
    syncValues()
    postData.value.payload = {}
    postData.value.command = String('SATPRGCONFIG' + optionValue.value)

    let binaryS8 = arrayToBinary(satData.value.S8)
    let binaryS9 = arrayToBinary(satData.value.S9)
    let binaryS10 = arrayToBinary(satData.value.S10)
    let binaryS11 = arrayToBinary(satData.value.S11)
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10005)] = String(satData.value.S5)
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10007)] = String(satData.value.S7)
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10008)] = binaryS8
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10009)] = binaryS9
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10010)] = binaryS10
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10011)] = binaryS11
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10014)] = String(satData.value.temperatura[0])
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10015)] = String(satData.value.temperatura[1])
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10016)] = String(satData.value.umidita[0])
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10017)] = String(satData.value.umidita[1])
    postData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10020)] = String(satData.value.S20)
    console.log(postData.value.payload)
    dataStore.postControl(satConfigParams.value.device_code,postData.value)
  }  

  async function changeOption(e) {
    optionValue.value = e.target.value
    console.log(optionValue.value)
    satConfigParams.value.fields = String(
      'S' + (((e.target.value - 1) * 1000) + 10005) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10007) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10008) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10009) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10010) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10011) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10014) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10015) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10016) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10017) + ',' + 
      'S' + (((e.target.value - 1) * 1000) + 10020))

    satConfigParams.value.measurement = String('SATPRGCONFIG' + e.target.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    fillSatData()
    syncValues()
    console.log(satData.value)
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
    console.log(checkBox.value)
  }
    return checkBox.value
  })

  const arrayToBinary = ((value) => {
    let tmpArray = value === undefined ? undefined : value
    console.log(tmpArray)
    let tmpBinary =''
    if (tmpArray === undefined) {
      tmpBinary = '000000000000'
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
    }
    console.log(tmpBinary)
    return tmpBinary
  })

  function syncValues() {
    temperaturaBassa.value = satData.value.temperatura[0]
    temperaturaAlta.value = satData.value.temperatura[1]
    umiditaBassa.value = satData.value.umidita[0]
    umiditaAlta.value = satData.value.umidita[1]
  }

  const sensoraUmiditaOptions = [
    {title: t('airSensor'), value: '0'},
    { title: t('soilSensor') + ' 1', value: '1'}, { title: t('soilSensor') + ' 2', value: '2'}, { title: t('soilSensor') + ' 3', value: '3'}, { title: t('soilSensor') + ' 4', value: '4'}, { title: t('soilSensor') + ' 5', value: '5'},
    { title: t('soilSensor') + ' 6', value: '6'}, { title: t('soilSensor') + ' 7', value: '7'}, { title: t('soilSensor') + ' 8', value: '8'}, { title: t('soilSensor') + ' 9', value: '9'}, { title: t('soilSensor') + ' 10', value: '10'},
    { title: t('soilSensor') + ' 11', value: '11'}, { title: t('soilSensor') + ' 12', value: '12'}, { title: t('soilSensor') + ' 13', value: '13'}, { title: t('soilSensor') + ' 14', value: '14'}, { title: t('soilSensor') + ' 15', value: '15'},
    { title: t('soilSensor') + ' 16', value: '16'}, { title: t('soilSensor') + ' 17', value: '17'}, { title: t('soilSensor') + ' 18', value: '18'}, { title: t('soilSensor') + ' 19', value: '19'}, { title: t('soilSensor') + ' 20', value: '20'},
    { title: t('soilSensor') + ' 21', value: '21'}, { title: t('soilSensor') + ' 22', value: '22'}, { title: t('soilSensor') + ' 23', value: '23'}, { title: t('soilSensor') + ' 24', value: '24'}, { title: t('soilSensor') + ' 25', value: '25'},
    { title: t('soilSensor') + ' 26', value: '26'}, { title: t('soilSensor') + ' 27', value: '27'}, { title: t('soilSensor') + ' 28', value: '28'}, { title: t('soilSensor') + ' 29', value: '29'}, { title: t('soilSensor') + ' 30', value: '30'},
  ]
  const livellosensoraUmiditaOptions = [
  { title: '0', value: '0'},{ title: '1', value: '1'}, { title: '2', value: '2'}, { title: '3', value: '3'}, { title: '4', value: '4'}
  ]

  // const impulsiPortarte = ref()
  const formData = ref ({
    auto : null,
  })


</script>

<style scoped>

.sensori-container {
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
.header {
@apply
  flex flex-col justify-center items-center
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
input[type=checkbox], input[type=radio], input[type=range]{
  @apply cursor-pointer
}

.dropdown {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
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
          flex border-b-2 border-[#3a3a3e]
          py-3 px-5
}
.field-title {
  @apply
          flex border-b
          py-3 px-5
}

.field-wrapper {
  @apply flex py-3 px-5 items-center justify-between
}

.field {
  @apply w-[360px] flex flex-col gap-1 items-start
}

.slider {
  @apply mx-10 my-3 px-6 py-3 rounded-xl bg-white
}

</style>