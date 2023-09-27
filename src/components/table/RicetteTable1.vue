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
            <span>{{$t('recipe')}} 1</span>
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
              <input :disabled="fertData.F51 === undefined" v-model="fertData.F51" type="number" name="erogazioneAcqua" step="0.1">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F50 === undefined" v-model="fertData.F50" value="0" name="F50">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F50 === undefined" v-model="fertData.F50" value="1" name="F50">
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
              <input :disabled="fertData.F53 === undefined" v-model="fertData.F53" type="number" step="0.1" name="erogazioneFertilizzante1">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F52 === undefined" v-model="fertData.F52" value="0" name="F52">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F52 === undefined" v-model="fertData.F52" value="1" name="F52">
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
              <input :disabled="fertData.F55 === undefined" v-model="fertData.F55" type="number" step="0.1" name="erogazioneFertilizzante2">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F54 === undefined" v-model="fertData.F54" value="0" name="F54">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F54 === undefined" v-model="fertData.F54" value="1" name="F54">
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
              <input :disabled="fertData.F57 === undefined" v-model="fertData.F57" type="number" step="0.1" name="erogazioneFertilizzante3">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F56 === undefined" v-model="fertData.F56" value="0" name="F56">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F56 === undefined" v-model="fertData.F56" value="1" name="F56">
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
              <input :disabled="fertData.F59 === undefined" v-model="fertData.F59" type="number" step="0.1" name="erogazioneFertilizzante4">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F58 === undefined" v-model="fertData.F58" value="0" name="F58">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F58 === undefined" v-model="fertData.F58" value="1" name="F58">
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
              <input class="w-16" :disabled="fertData.F63hour === undefined" v-model="fertData.F63hour" type="number" name="risciacquo">
              <p>{{$t('hour')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F63min === undefined" v-model="fertData.F63min" type="number" name="risciacquo">
              <p>{{$t('minute')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F63sec === undefined" v-model="fertData.F63sec" type="number" name="risciacquo">
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
              <input :disabled="fertData.F60 === undefined" v-model="fertData.F60" type="number" name="durata">
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
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])
  const fertParams = ref({
    fields: 'F10050,F10051,F10052,F10053,F10054,F10055,F10056,F10057,F10058,F10059,F10060,F10063,F10009',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })
  const fertData = ref({})

  function fillFertData() {
    fertData.value.F50 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10050)]
    fertData.value.F51 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10051)]
    fertData.value.F52 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10052)]
    fertData.value.F53 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10053)]
    fertData.value.F54 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10054)]
    fertData.value.F55 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10055)]
    fertData.value.F56 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10056)]
    fertData.value.F57 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10057)]
    fertData.value.F58 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10058)]
    fertData.value.F59 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10059)]
    fertData.value.F60 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10060)]
    fertData.value.F63hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10063)].split('.')[0]
    fertData.value.F63min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10063)].split('.')[1]
    fertData.value.F63sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10063)].split('.')[2]
    fertData.value.F09hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[0]
    fertData.value.F09min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[1]
    fertData.value.F09sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10009)].split('.')[2]
  }

  const postData = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })
  
  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    fertParams.value.device_code = deviceStore.deviceData.code
    await dataStore.getLastFertConfig(fertParams.value)
    fillFertData()
  })  

  function onSubmit() {
    postData.value.payload = {}
    postData.value.command = String('FERTPRGCONFIG' + optionValue.value)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10050)] = String(fertData.value.F50)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10051)] = String(fertData.value.F51)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10052)] = String(fertData.value.F52)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10053)] = String(fertData.value.F53)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10054)] = String(fertData.value.F54)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10055)] = String(fertData.value.F55)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10056)] = String(fertData.value.F56)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10057)] = String(fertData.value.F57)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10058)] = String(fertData.value.F58)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10059)] = String(fertData.value.F59)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10060)] = String(fertData.value.F60)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10063)] = String(fertData.value.F63hour+'.'+fertData.value.F63min+'.'+fertData.value.F63sec)
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
      'F' + (((e.target.value - 1) * 1000) + 10050) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10051) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10052) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10053) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10054) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10055) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10056) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10057) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10058) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10059) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10060) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10063))
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