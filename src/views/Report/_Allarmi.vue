<template>
  <div class="alarmi-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <img class="w-40" src="@/assets/report_allarmi.png">
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <div class="header">
        <div class="date-filter">
          <DatePicker
            @change="dateFiltering()"  
            v-model="startDate"
          />
          <label>AL</label>
          <DatePicker  
            @change="dateFiltering()"  
            v-model="endDate"
          />
          <!-- <div class="button-wrapper">
            <IveButton type="submit" label="Visualizza" />
          </div> -->
        </div>
        <div class="search-field">
          <SearchField v-model="searchValue" />
        </div>
      </div>
      <div class="table-wrap">
      <EasyDataTable
        table-class-name="customize-table"
        alternating
        buttons-pagination
        no-hover
        :loading="historicalDataIsLoading"
        :headers="headers"
        :items="formatedhistoricalAlarmi"
        :search-field="searchField"
        :search-value="searchValue"
        :rows-items="[5,10,20,30,40,50]"
        :rows-per-page="5"
        theme-color="#1363df">
        <template #loading>
          <img
            src="@/assets/loader/loader.gif"
            style="width: 100px; height: 80px;"
          />
        </template>
      </EasyDataTable>
      <download-csv
      	class   = "btn btn-default mt-6 justify-end flex"
      	:data   = "formatedhistoricalAlarmi"
      	:name    = "fileName">
        <div class="button-wrapper">
            <IveButton label="Export CSV" />
        </div>
      </download-csv>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/DataStore'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
import SearchField from '@/components/input/searchField.vue'
import DatePicker from '@/components/input/datePicker.vue'
import IveButton from '@/components/input/iveButton.vue'
import { toInteger } from 'lodash'
// import { Header, Item } from "vue3-easy-data-table";

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
  const { isLoading } = storeToRefs(useDevicesStore())
  const { historicalDataIsLoading } = storeToRefs(useDataStore())
  const formatedhistoricalAlarmi = ref([])
  const searchValue = ref()
  const searchField = 'tipoAlarme'
  const title = ref()

  let MINIMUM_DIGIT = 2
  let date = new Date()
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  let tmpFirstYear = String(firstDay.getFullYear())
  let tmpFirstMonth = String((firstDay.getMonth()+1))
  let tmpFirstDay = String(firstDay.getDate())
  while (tmpFirstDay.length < MINIMUM_DIGIT) {
    tmpFirstDay = '0' + tmpFirstDay
  }
  const startDate = ref(String(tmpFirstYear + '-' + tmpFirstMonth + '-' + tmpFirstDay))

  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  let tmpLastYear = String(lastDay.getFullYear())
  let tmpLastMonth = String((lastDay.getMonth()+1))
  let tmpLastDay = String(lastDay.getDate())
  while (tmpLastDay.length < MINIMUM_DIGIT) {
    tmpLastDay = '0' + tmpLastDay
  }

  const endDate = ref(String(tmpLastYear + '-' + tmpLastMonth + '-' + tmpLastDay))
  const fileName = ref(String(startDate.value + '_' + endDate.value) + '_Alarmi.csv')

  const start = computed(() => {
    let tmpStart = startDate.value.split('-')
    let tmpYear = tmpStart[0]
    let tmpMonth = tmpStart[1]
    let tmpDay = tmpStart[2]
    console.log(tmpStart)
    return new Date(tmpYear, tmpMonth-1, tmpDay, '00', '00', '00').toISOString()
    // return new Date(Date.UTC(tmpYear, tmpMonth-1, tmpDay, '00', '00', '00')).toISOString()
  })
  const end = computed(() => {
    let tmpEnd = endDate.value.split('-')
    let tmpYear = tmpEnd[0]
    let tmpMonth = tmpEnd[1]
    let tmpDay = tmpEnd[2]
    console.log(tmpEnd)
    return new Date(tmpYear, tmpMonth-1, tmpDay, '24', '00', '00').toISOString()
    // return new Date(Date.UTC(tmpYear, tmpMonth-1, tmpDay, '24', '00', '00')).toISOString()
  })

  const historicalAlarmiParams = ref({
    fields: 'S200,S206,S212,S218,S224,S230,S236,S242,S248,S254',
    measurement: 'SATALARMSTAT',
    device_code: null,
    start: start,
    end: end
  })
  
  function fillTableData() {
    console.log(dataStore.historicalData)
    formatedhistoricalAlarmi.value = []
    let tmphistoricalAlarmi
    tmphistoricalAlarmi = dataStore.historicalData.map((data) => {
      return {
        S200 : data.S200,
        S206 : data.S206,
        S212 : data.S212,
        S218 : data.S218,
        S224 : data.S224,
        S230 : data.S230,
        S236 : data.S236,
        S242 : data.S242,
        S248 : data.S248,
        S254 : data.S254
      }
    })
    console.log(tmphistoricalAlarmi)
    
    tmphistoricalAlarmi.map((data) => {
      for (const prop in data) {
        if(data[prop] !== "" ){
          let tmpData = data[prop].split(',')
          tmpData[1] = describeErrorCode(tmpData[1])
          tmpData[4] = describeActionCode(tmpData[4])
          let newObj = {
            date: new Date(toInteger(tmpData[0])*1000).toLocaleString(),
            tipoAlarme: tmpData[1],
            programmaNumero: tmpData[2],
            stazioneNumero: tmpData[3],
            anzioneIntrepresa: tmpData[4]
          }
          formatedhistoricalAlarmi.value.push(newObj)
        }
      }
    })
    console.log(formatedhistoricalAlarmi.value)
  }      
  
  async function getHistoryData() {
    await dataStore.getHistoricalData(historicalAlarmiParams.value)
    fillTableData()
  }

  function dateFiltering() {
    historicalAlarmiParams.value.start = start
    historicalAlarmiParams.value.end = end
    fileName.value = String(startDate.value + '_' + endDate.value) + '_Alarmi.csv'
    getHistoryData()
  }

  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    historicalAlarmiParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    dateFiltering()
  })

  const newData = computed(() => {
      return [devicesStore.deviceData]
  })

  //table headers
  const headers = [
    { text: "Tipo Alarme", value: "tipoAlarme",sortable: true, width: 160},
    { text: "Programma Numero", value: "programmaNumero",sortable: true, width: 180},
    { text: "Stazione Numero", value: "stazioneNumero",sortable: true, width: 160},
    { text: "Anzione Intrapresa", value: "anzioneIntrepresa",sortable: true, width: 160},
    { text: "Date", value: "date",sortable: true, width: 160},
  ] 

  //other function
  function describeErrorCode(value) {
    switch (value) {
            case '0':
              value = 'No Alarm'
              break;
            case '1':
              value = 'Short cicruit'
              break;
            case '2':
              value = 'First Entrance'
              break;
            case '3':
              value = 'Second entrance'
              break;
            case '4':
              value = 'Wind'
              break;
            case '5':
              value = 'Water leak'
              break;
            case '6':
              value = 'High temperature'
              break;
            case '7':
              value = 'Low temperature'
              break;
            case '8':
              value = 'High humidity'
              break;
            case '9':
              value = 'Low humidity'
              break;
            case '10':
              value = 'High brightness'
              break;
            case '11':
              value = 'Excessive flow'
              break;
            case '12':
              value = 'Open / closed input (on EV via radio)'
              break;
            case '13':
              value = 'Excessive flow on Minifert'
              break;
            case '14':
              value = 'Minifert'
              break;
            case '15':
              value = 'The program (or the station) cannot start'
              break;
            case '16':
              value = 'Lack of network'
              break;
            case '17':
              value = 'Low battery'
              break;
            case '18':
              value = 'Low fertilizer level on minifert'
              break;
            case '19':
              value = 'Circuit paerto (on ICOD)'
              break;
            case '20':
              value = 'Third entrance'
              break;
            case '21':
              value = 'Fourth entrance'
              break;
            case '22':
              value = 'Low pressure'
              break;
            case '23':
              value = 'High pressure'
              break;
            case '24':
              value = 'No EV connection via radio'
              break;
            case '25':
              value = 'No repeater connection'
              break;
            case '26':
              value = 'Emergency button'
              break;
            default:
              break;
          }
    return value
  }
  function describeActionCode(value) {
    switch (value) {
            case '0':
              value = 'No action'
              break;
            case '1':
              value = 'End of program / station deactivation'
              break;
            case '2':
              value = 'Skip station'
              break;
            case '3':
              value = 'Program start'
              break;
            case '4':
              value = 'Program suspension'
              break;
            default:
              break;
          }
    return value
  }

</script>

<style scoped>
.alarmi-container {
  @apply 
    relative flex flex-col 
    px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
    
}
.dashboard-container {
  @apply flex flex-col w-full justify-center items-center
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
    flex gap-2 sm:justify-between
    flex-col sm:flex-row
    h-full
}

.table-wrap {
  @apply
    h-[300px] sm:h-full
    overflow-auto sm:overflow-visible
}

.search-field {
  @apply
    relative 
    h-[24px]
    sm:w-[300px]
    sm:h-[40px]
}


.date-filter {
  @apply 
    relative items-center
    flex gap-2
    w-full
    h-[24px]
    sm:w-[500px]
    sm:h-[40px]
}

.date-filter label {
  @apply
  text-[12px] sm:text-[16px]
    relative
   text-white
}

.button-wrapper {
  @apply
    relative 
    h-full w-full
    sm:w-[100px]
    sm:h-[40px]
    max-w-[80px]
    sm:max-w-[100px]
}

.customize-table {
  --easy-table-header-font-size: 10px;
  --easy-table-header-background-color: #DFEAFB;
  --easy-table-row-border:	1px solid #D2DDEE;
  --easy-table-header-height:	30px;

  --easy-table-body-row-background-color: #DFEAFB;
  --easy-table-body-even-row-background-color:	#D2DDEE;
  --easy-table-body-row-font-size:	10px;
  --easy-table-body-row-height:	20px;

  --easy-table-footer-font-size:	8px;
  --easy-table-footer-height:	30px;
  --easy-table-footer-background-color:	#F5F8FA;	
  --easy-table-footer-font-color:	#3A3A3E;

}

@media only screen and (min-width: 1536px) {
  .customize-table {
    --easy-table-header-font-size: 16px;
    --easy-table-header-background-color: #DFEAFB;
    --easy-table-header-height:	60px;
    --easy-table-row-border:	2px solid #D2DDEE;

    --easy-table-body-row-background-color: #DFEAFB;
    --easy-table-body-even-row-background-color:	#D2DDEE;
    --easy-table-body-row-font-size:	16px;
    --easy-table-body-row-height:	60px;

    --easy-table-footer-font-size:	14px;
    --easy-table-footer-height:	50px;
    --easy-table-footer-background-color:	#F5F8FA;	
    --easy-table-footer-font-color:	#3A3A3E;

  }
}

</style>
