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
            <span>{{$t('recipe')}} 2</span>
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
              <input :disabled="fertData.F101 === undefined" v-model="fertData.F101" type="number" step="0.1" name="erogazioneAcqua">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F100 === undefined" v-model="fertData.F100" value="0" name="F100">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F100 === undefined" v-model="fertData.F100" value="1" name="F100">
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
              <input :disabled="fertData.F103 === undefined" v-model="fertData.F103" type="number" step="0.1" name="erogazioneFertilizzante1">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F102 === undefined" v-model="fertData.F102" value="0" name="F102">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F102 === undefined" v-model="fertData.F102" value="1" name="F102">
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
              <input :disabled="fertData.F105 === undefined" v-model="fertData.F105" type="number" step="0.1" name="erogazioneFertilizzante2">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F104 === undefined" v-model="fertData.F104" value="0" name="F104">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F104 === undefined" v-model="fertData.F104" value="1" name="F104">
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
              <input :disabled="fertData.F107 === undefined" v-model="fertData.F107" type="number" step="0.1" name="erogazioneFertilizzante3">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F106 === undefined" v-model="fertData.F106" value="0" name="F106">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F106 === undefined" v-model="fertData.F106" value="1" name="F106">
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
              <input :disabled="fertData.F109 === undefined" v-model="fertData.F109" type="number" step="0.1" name="erogazioneFertilizzante4">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F108 === undefined" v-model="fertData.F108" value="0" name="F108">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F108 === undefined" v-model="fertData.F108" value="1" name="F108">
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
              <input class="w-16" :disabled="fertData.F113hour === undefined" v-model="fertData.F113hour" type="number" name="risciacquo">
              <p>{{$t('hour')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F113min === undefined" v-model="fertData.F113min" type="number" name="risciacquo">
              <p>{{$t('minute')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F113sec === undefined" v-model="fertData.F113sec" type="number" name="risciacquo">
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
              <input :disabled="fertData.F110 === undefined" v-model="fertData.F110" type="number" name="durata">
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
    fields: 'F10100,F10101,F10102,F10103,F10104,F10105,F10106,F10107,F10108,F10109,F10110,F10113,F10009',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })

  const fertData = ref({})

  function fillFertData() {
    fertData.value.F100 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10100)]
    fertData.value.F101 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10101)]
    fertData.value.F102 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10102)]
    fertData.value.F103 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10103)]
    fertData.value.F104 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10104)]
    fertData.value.F105 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10105)]
    fertData.value.F106 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10106)]
    fertData.value.F107 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10107)]
    fertData.value.F108 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10108)]
    fertData.value.F109 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10109)]
    fertData.value.F110 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10110)]
    fertData.value.F113hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10113)].split('.')[0]
    fertData.value.F113min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10113)].split('.')[1]
    fertData.value.F113sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10113)].split('.')[2]
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
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10100)] = String(fertData.value.F100)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10101)] = String(fertData.value.F101)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10102)] = String(fertData.value.F102)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10103)] = String(fertData.value.F103)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10104)] = String(fertData.value.F104)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10105)] = String(fertData.value.F105)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10106)] = String(fertData.value.F106)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10107)] = String(fertData.value.F107)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10108)] = String(fertData.value.F108)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10109)] = String(fertData.value.F109)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10110)] = String(fertData.value.F110)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10113)] = String(fertData.value.F113hour+'.'+fertData.value.F113min+'.'+fertData.value.F113sec)
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
      'F' + (((e.target.value - 1) * 1000) + 10100) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10101) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10102) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10103) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10104) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10105) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10106) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10107) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10108) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10109) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10110) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10113))
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