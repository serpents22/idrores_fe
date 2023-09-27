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
            <span>{{$t('recipe')}} 4</span>
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
              <input :disabled="fertData.F201 === undefined" v-model="fertData.F201" type="number" step="0.1" name="erogazioneAcqua">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F200 === undefined" v-model="fertData.F200" value="0" name="F200">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F200 === undefined" v-model="fertData.F200" value="1" name="F200">
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
              <input :disabled="fertData.F203 === undefined" v-model="fertData.F203" type="number" step="0.1" name="erogazioneFertilizzante1">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F202 === undefined" v-model="fertData.F202" value="0" name="F202">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F202 === undefined" v-model="fertData.F202" value="1" name="F202">
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
              <input :disabled="fertData.F205 === undefined" v-model="fertData.F205" type="number" step="0.1" name="erogazioneFertilizzante2">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F204 === undefined" v-model="fertData.F204" value="0" name="F204">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F204 === undefined" v-model="fertData.F204" value="1" name="F204">
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
              <input :disabled="fertData.F207 === undefined" v-model="fertData.F207" type="number" step="0.1" name="erogazioneFertilizzante3">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F206 === undefined" v-model="fertData.F206" value="0" name="F206">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F206 === undefined" v-model="fertData.F206" value="1" name="F206">
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
              <input :disabled="fertData.F209 === undefined" v-model="fertData.F209" type="number" step="0.1" name="erogazioneFertilizzante4">
              <span class="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-4">
                <span class="flex gap-2">
                  <input id="sec" type="radio" :disabled="fertData.F208 === undefined" v-model="fertData.F208" value="0" name="F208">
                  <label for="sec">sec</label>
                </span>
                <span class="flex gap-2">
                  <input id="litri" type="radio" :disabled="fertData.F208 === undefined" v-model="fertData.F208" value="1" name="F208">
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
              <input class="w-16" :disabled="fertData.F213hour === undefined" v-model="fertData.F213hour" type="number" name="risciacquo">
              <p>{{$t('hour')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F213min === undefined" v-model="fertData.F213min" type="number" name="risciacquo">
              <p>{{$t('minute')}}</p>
            </span>
            <span class="flex gap-2 items-center">
              <input class="w-16" :disabled="fertData.F213sec === undefined" v-model="fertData.F213sec" type="number" name="risciacquo">
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
              <input :disabled="fertData.F210 === undefined" v-model="fertData.F210" type="number" name="durata">
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
    fields: 'F10200,F10201,F10202,F10203,F10204,F10205,F10206,F10207,F10208,F10209,F10210,F10213,F10009',
    measurement: 'FERTPRGCONFIG1',
    device_code: null
  })
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])

  const fertData = ref({})

  function fillFertData() {
    fertData.value.F200 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10200)]
    fertData.value.F201 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10201)]
    fertData.value.F202 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10202)]
    fertData.value.F203 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10203)]
    fertData.value.F204 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10204)]
    fertData.value.F205 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10205)]
    fertData.value.F206 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10206)]
    fertData.value.F207 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10207)]
    fertData.value.F208 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10208)]
    fertData.value.F209 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10209)]
    fertData.value.F210 = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10210)]
    fertData.value.F213hour = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10213)].split('.')[0]
    fertData.value.F213min = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10213)].split('.')[1]
    fertData.value.F213sec = dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig['F' + (((optionValue.value - 1) * 1000) + 10213)].split('.')[2]
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
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10200)] = String(fertData.value.F200)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10201)] = String(fertData.value.F201)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10202)] = String(fertData.value.F202)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10203)] = String(fertData.value.F203)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10204)] = String(fertData.value.F204)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10205)] = String(fertData.value.F205)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10206)] = String(fertData.value.F206)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10207)] = String(fertData.value.F207)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10208)] = String(fertData.value.F208)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10209)] = String(fertData.value.F209)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10210)] = String(fertData.value.F210)
    postData.value.payload['F' + (((optionValue.value - 1) * 1000) + 10213)] = String(fertData.value.F213hour+'.'+fertData.value.F213min+'.'+fertData.value.F213sec)
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
      'F' + (((e.target.value - 1) * 1000) + 10200) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10201) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10202) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10203) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10204) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10205) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10206) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10207) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10208) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10209) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10210) + ',' + 
      'F' + (((e.target.value - 1) * 1000) + 10213))
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