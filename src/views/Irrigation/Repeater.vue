<template>
<loading :loading="isLoading" />
<div class="flussi-container">
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
      <img src="@/assets/repeater.png">
      <p>{{ $t('repeaterConfiguration') }}</p>
    </div>
  </div>
  <div class="content">
    <IdroTitle :title="title"/>
    <div class="main">
      <form @submit.prevent="configRepeater" class="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>{{$t('repeaterNumber')}}</span>
              </th>
              <th>
                <span>{{$t('repeaterCode')}} </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in tableData">
              <td>
                <label>{{data.repeaterNumber}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input
                  maxlength="6"
                  minlength="6"
                  v-model="data.repeaterCode"
                  type="text" >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-wrapper">
          <MyButton type="submit" class="filled"  :label="$t('save')" :loading="dataStore.postControlIsLoading" />
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
  import { useI18n } from 'vue-i18n';

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
  const devicesStore = useDevicesStore()
  const dataStore = useDataStore()
  const { postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())

  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const deleteButtonLabel = ref(t('delete'))
  const title = ref()


  const repeaterParams = ref({
    fields: 'S1700,S1701,S1702,S1703,S1704,S1705,S1706,S1707',
    measurement: 'REPEATERCONFIG',
    device_code: null
  }) 

  const postRepeaterParams = ref({
    command: 'REPEATERCONFIG',
    payload: {}
  })

  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    repeaterParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastRepeater(repeaterParams.value)    
    fillTableData()
  })


  const tableData = ref([])

  function fillTableData() {
    let repeaterIndex = 1700    
    let i = 0
    tableData.value = []
    for (let iFor = 0; iFor < dataStore.repeaterDataLength ; iFor++) {
      let dataObj = {
        repeaterNumber: iFor + 1,
        repeaterAddress: 'S' + (repeaterIndex+iFor),
        repeaterCode: dataStore.repeaterData['S' + (repeaterIndex+iFor)]
      }
      tableData.value.push(dataObj)
    }
    console.log(tableData.value)
  }

  async function getRepeater() {
    await dataStore.getLastRepeater(repeaterParams.value)    
    fillTableData()
  }

  async function configRepeater() {
    postRepeaterParams.value.payload = {}
    postRepeaterParams.value.payload[tableData.value[0].repeaterAddress] = tableData.value[0].repeaterCode
    postRepeaterParams.value.payload[tableData.value[1].repeaterAddress] = tableData.value[1].repeaterCode
    postRepeaterParams.value.payload[tableData.value[2].repeaterAddress] = tableData.value[2].repeaterCode
    postRepeaterParams.value.payload[tableData.value[3].repeaterAddress] = tableData.value[3].repeaterCode
    postRepeaterParams.value.payload[tableData.value[4].repeaterAddress] = tableData.value[4].repeaterCode
    postRepeaterParams.value.payload[tableData.value[5].repeaterAddress] = tableData.value[5].repeaterCode
    postRepeaterParams.value.payload[tableData.value[6].repeaterAddress] = tableData.value[6].repeaterCode
    postRepeaterParams.value.payload[tableData.value[7].repeaterAddress] = tableData.value[7].repeaterCode
    console.log(postRepeaterParams.value.payload)
    await dataStore.postControl(devicesStore.deviceData.code,postRepeaterParams.value)
    setTimeout(() => { getRepeater() }, 2000)
  }


</script>

<style scoped>
.flussi-container {
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
  @apply mt-3 flex w-[100px] mx-auto
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
  @apply cursor-default
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