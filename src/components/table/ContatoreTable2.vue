<template>
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
            <label>{{$t('counter')}} 2</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F1002 === undefined"
                id="reed" type="radio"  name="F1002"
                v-model="fertData.F1002" value="0">
              <label for="reed">REED</label>
            </span>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F1002 === undefined"
                id="ttl" type="radio"  name="F1002"
                v-model="fertData.F1002" value="1">
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
              <input :disabled="fertData.F1007 === undefined"
                type="number" name="impulsi"
                v-model="fertData.F1007" >
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('counterAlarm')}}</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F1012 === undefined"
                type="number" name="soglia"
                v-model="fertData.F1012">
              <p>sec</p>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('activationDuration')}} {{ $t('minute') }}</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F1020 === undefined"
                type="number" name="durataAttivazione"
                v-model="fertData.F1020">
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label>{{$t('breakDuration')}} {{ $t('minute') }}</label>
          </td>
          <td>
            <span class="flex gap-2 items-center">
              <input :disabled="fertData.F1021 === undefined"
                type="number" name="durataPausa"
                v-model="fertData.F1021" >
            </span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
              <MyButton type="button" class="filled"  :label="$t('cancel')" :loading="fertConfigIsLoading" @click="onCancel" />
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
import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue';
import MyButton from '@/components/button/BaseButton.vue'
import { useDevicesStore } from '@/stores/DevicesStore';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

  const props = defineProps({
    id: String
  })

  const dataStore = useDataStore()
  const deviceStore = useDevicesStore()
  const { postControlIsLoading,fertConfigIsLoading } = storeToRefs(useDataStore())

  const fertParams = ref({
    fields: 'F1002,F1007,F1012,F1020,F1021',
    measurement: 'FERTCONFIG',
    device_code: null
  })
  const fertData = computed(() => {
    return {
      F1002 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1002,
      F1007 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1007,
      F1012 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1012,
      F1020 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1020,
      F1021 : dataStore.fertConfig === undefined ? undefined : dataStore.fertConfig.F1021,
    }
  }) 
  const postData = ref({
    command: 'FERTCONFIG',
    payload: {}
  })

  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    fertParams.value.device_code = deviceStore.deviceData.code
    dataStore.getLastFertConfig(fertParams.value)
  })

  function onSubmit() {
    postData.value.payload.F1002 = String(fertData.value.F1002)
    postData.value.payload.F1007 = String(fertData.value.F1007)
    postData.value.payload.F1012 = String(fertData.value.F1012)
    postData.value.payload.F1020 = String(fertData.value.F1020)
    postData.value.payload.F1021 = String(fertData.value.F1021)
    
    dataStore.postControl(fertParams.value.device_code,postData.value)
    console.log(postData.value)
  }
  function onCancel() {
    dataStore.getLastFertConfig(fertParams.value)
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