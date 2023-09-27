<template>
  <select 
    class="cursor-pointer w-[200px] rounded-md px-2 py-1 sm:px-4 sm:py-2 self-center" 
    @change="changeOption($event)">
    <option 
      v-for="tab in tabs" :key="tab.value"
      class="nav"
      :id="tab">{{tab}}</option>
  </select>
  <form @submit.prevent="onSubmit" class="table-container">
    <table>
      <thead>
        <tr>
          <th>
            <span>{{$t('recipe')}} 3</span>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <label>{{$t('waterDispensing')}}</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F151 === undefined" v-model="fertData.F151" type="number" step="0.1" name="erogazioneAcqua">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F150 === undefined" v-model="fertData.F150" value="0" name="F150">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F150 === undefined" v-model="fertData.F150" value="1" name="F150">
                  <label for="litri">{{$t('litre')}}</label>
                </span>
              </span>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('fertilizerDispensing')}} 1</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F153 === undefined" v-model="fertData.F153" type="number" step="0.1" name="erogazioneFertilizzante1">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F152 === undefined" v-model="fertData.F152" value="0" name="F152">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F152 === undefined" v-model="fertData.F152" value="1" name="F152">
                  <label for="litri">{{$t('litre')}}</label>
                </span>
              </span>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('fertilizerDispensing')}} 2</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F155 === undefined" v-model="fertData.F155" type="number" step="0.1" name="erogazioneFertilizzante2">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F154 === undefined" v-model="fertData.F154" value="0" name="F154">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F154 === undefined" v-model="fertData.F154" value="1" name="F154">
                  <label for="litri">{{$t('litre')}}</label>
                </span>
              </span>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('fertilizerDispensing')}} 3</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F157 === undefined" v-model="fertData.F157" type="number" step="0.1" name="erogazioneFertilizzante3">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F156 === undefined" v-model="fertData.F156" value="0" name="F156">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F156 === undefined" v-model="fertData.F156" value="1" name="F156">
                  <label for="litri">{{$t('litre')}}</label>
                </span>
              </span>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('fertilizerDispensing')}} 4</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F159 === undefined" v-model="fertData.F159" type="number" step="0.1" name="erogazioneFertilizzante4">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F158 === undefined" v-model="fertData.F158" value="0" name="F158">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F158 === undefined" v-model="fertData.F158" value="1" name="F158">
                  <label for="litri">{{$t('litre')}}</label>
                </span>
              </span>
            </span>
          </td>
        </tr>
        
        <tr>
          <td>
            <label>{{$t('prewash')}}</label>
          </td>
          <td class="flex gap-4">
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F09hour === undefined" v-model="fertData.F09hour" type="number" name="risciacquo">
              <p>{{$t('hour')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F09min === undefined" v-model="fertData.F09min" type="number" name="risciacquo">
              <p>{{$t('minute')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F09sec === undefined" v-model="fertData.F09sec" type="number" name="risciacquo">
              <p>{{$t('second')}}</p>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('flushing')}}</label>
          </td>
          <td class="flex gap-4">
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F163hour === undefined" v-model="fertData.F163hour" type="number" name="risciacquo">
              <p>{{$t('hour')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F163min === undefined" v-model="fertData.F163min" type="number" name="risciacquo">
              <p>{{$t('minute')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F163sec === undefined" v-model="fertData.F163sec" type="number" name="risciacquo">
              <p>{{$t('second')}}</p>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('timeDuration')}}</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F160 === undefined" v-model="fertData.F160" type="number" name="durata">
              <p>%</p>
            </span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
              <MyButton type="button" class="filled"  :label="$t('cancel')" :loading="fertConfigIsLoading" @click="onCancel"/>
            </div>
          </td>
          <td>

          </td>
        </tr>
      </tfoot>
    </table>
  </form>
</template>

<script setup>
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import { useDataStore } from '@/stores/DataStore'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
  const { postControlIsLoading, fertConfigIsLoading } = storeToRefs(useDataStore())
  const newData = computed(() => {
      return [deviceStore.deviceData]
    })

  const fertParams = ref({
    fields: 'F10150,F10151,F10152,F10153,F10154,F10155,F10156,F10157,F10158,F10159,F10160,F10163,F10009',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])

  const fertData = ref({})

  function fillFertData() {
    fertData.value.F150 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10150)]
    fertData.value.F151 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10151)]
    fertData.value.F152 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10152)]
    fertData.value.F153 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10153)]
    fertData.value.F154 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10154)]
    fertData.value.F155 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10155)]
    fertData.value.F156 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10156)]
    fertData.value.F157 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10157)]
    fertData.value.F158 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10158)]
    fertData.value.F159 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10159)]
    fertData.value.F160 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10160)]
    fertData.value.F163hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10163)].split('.')[0]
    fertData.value.F163min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10163)].split('.')[1]
    fertData.value.F163sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10163)].split('.')[2]
    fertData.value.F09hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[0]
    fertData.value.F09min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[1]
    fertData.value.F09sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[2]
  }

  const postData = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })
  
  onMounted( async () => {
    console.log(props.id)
    await deviceStore.loadDevice(props.id)
    fertParams.value.device_code = deviceStore.deviceData.code
    await dataStore.getLastFertConfig(fertParams.value)
    fillFertData()
  })  

  async function onSubmit() {
    postData.value.payload = {}
    postData.value.command = String('FERTPRGCONFIG' + optionValue.value)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10150)] = String(fertData.value.F150)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10151)] = String(fertData.value.F151)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10152)] = String(fertData.value.F152)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10153)] = String(fertData.value.F153)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10154)] = String(fertData.value.F154)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10155)] = String(fertData.value.F155)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10156)] = String(fertData.value.F156)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10157)] = String(fertData.value.F157)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10158)] = String(fertData.value.F158)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10159)] = String(fertData.value.F159)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10160)] = String(fertData.value.F160)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10163)] = String(fertData.value.F163hour+'.'+fertData.value.F163min+'.'+fertData.value.F163sec)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10009)] = String(fertData.value.F09hour+'.'+fertData.value.F09min+'.'+fertData.value.F09sec)
    
    dataStore.postControl(fertParams.value.device_code,postData.value)
    console.log(postData.value)
  }
  function onCancel() {
    dataStore.getLastFertConfig(fertParams.value)
  }

  async function changeOption(e) {
    optionValue.value = e.target.value
    console.log(optionValue.value)
    fertParams.value.fields = String(
      'F' + (((e.target.value - 1) * 1000) + 10150) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10151) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10152) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10153) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10154) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10155) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10156) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10157) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10158) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10159) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10160) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10163))
    fertParams.value.measurement = String('FERTPRGCONFIG' + e.target.value)
    await dataStore.getLastFertConfig(fertParams.value)

    fillFertData()
    console.log(fertData.value)
  }

</script>

<style scoped>
input[type=text], input[type=password], input[type=number] {
    @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3
  }

input[type=radio] {
  @apply cursor-pointer
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