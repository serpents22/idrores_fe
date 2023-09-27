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
    <div class="xs-icon-card">
      <img src="@/assets/report_allarmi.png">
      <p>{{ $t('alarms') }}</p>
    </div>
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <div class="header">
        <div class="date-filter">
          <DatePicker v-model="startDate" @change="dateFiltering()">{{startDate}}</DatePicker>
          <label> to </label>
          <DatePicker @change="dateFiltering()" v-model="endDate">{{endDate}}</DatePicker>
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
        :class="{'restrictedAccess': devicesStore.deviceData.role == 'user'}"
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
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
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
  /*while (tmpFirstDay.length < MINIMUM_DIGIT) {
    tmpFirstDay = '0' + tmpFirstDay
  }*/
  tmpFirstDay = tmpFirstDay.padStart(MINIMUM_DIGIT,"0")
  tmpFirstMonth = tmpFirstMonth.padStart(MINIMUM_DIGIT,"0")

  const startDate = ref(String(tmpFirstYear + '-' + tmpFirstMonth + '-' + tmpFirstDay))
  
  let lastDay = date.getDay()
  let tmpLastYear = String(date.getFullYear())
  let tmpLastMonth = String((date.getMonth()+1))
  let tmpLastDay = String(date.getDate())
  /*while (tmpLastDay.length < MINIMUM_DIGIT) {
    tmpLastDay = '0' + tmpLastDay
  }*/
  tmpLastDay = tmpLastDay.padStart(MINIMUM_DIGIT,"0")
  tmpLastMonth = tmpLastMonth.padStart(MINIMUM_DIGIT,"0")

  const endDate = ref(String(tmpLastYear + '-' + tmpLastMonth + '-' + tmpLastDay))
  const fileName = ref(String(startDate.value + '_' + endDate.value) + '_Allarmi.csv')

  let rangeEpochStart = 0
  let rangeEpochEnd = 0

  const start = computed(() => {
    let tmpStart = startDate.value.split('-')
    let tmpYear = tmpStart[0]
    let tmpMonth = tmpStart[1]
    let tmpDay = tmpStart[2]
    
    rangeEpochStart = new Date(tmpYear, tmpMonth-1, tmpDay, '00', '00', '00').getTime()
    //console.log("Epoch Start: "+rangeEpochStart)
    return new Date(tmpYear, tmpMonth-1, tmpDay, '00', '00', '00').toISOString()
  })
  const end = computed(() => {
    let tmpEnd = endDate.value.split('-')
    let tmpYear = tmpEnd[0]
    let tmpMonth = tmpEnd[1]
    let tmpDay = tmpEnd[2]
    
    rangeEpochEnd = new Date(tmpYear, tmpMonth-1, tmpDay, '24', '00', '00').getTime()
    //console.log("Epoch End: "+rangeEpochEnd)
    return new Date(tmpYear, tmpMonth-1, tmpDay, '24', '00', '00').toISOString()
    
  })

  const historicalAlarmiParams = ref({
    fields: 'S200,S206,S212,S218,S224,S230,S236,S242,S248,S254',
    measurement: 'SATALARMSTAT',
    device_code: null,
    start: start,
    end: end
  })
  
  function fillTableData() {
    //console.log(dataStore.historicalData)
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
    //console.log(tmphistoricalAlarmi)
    let tmpUnique=[]
    tmphistoricalAlarmi.map((data) => {
      for (const prop in data) {
        if(data[prop] !== "0,0,0,0,0"){
          let tmpData = data[prop].split(',')
          var alarmEpoch = Number(tmpData[0])*1000
          if(alarmEpoch >= rangeEpochStart && alarmEpoch <= rangeEpochEnd){
            tmpData[1] = describeErrorCode(tmpData[1])
            tmpData[4] = describeActionCode(tmpData[4])
            let newObj = {
              date: new Date(alarmEpoch).toLocaleString(),
              tipoAllarme: tmpData[1],
              programmaNumero: tmpData[2],
              stazioneNumero: tmpData[3],
              azioneIntrapresa: tmpData[4]
            }
            tmpUnique.push(newObj)
          } 
        }
      }
    })
    
    let reducedArray = tmpUnique.reduce((prev, el) =>{
      if(prev.some(o => o.date == el.date && o.tipoAllarme == el.tipoAllarme && o.programmaNumero == el.programmaNumero && o.stazioneNumero == el.stazioneNumero  && o.azioneIntrapresa == el.azioneIntrapresa))
           return prev;
      return [...prev, {date:el.date, tipoAllarme:el.tipoAllarme, programmaNumero:el.programmaNumero, stazioneNumero:el.stazioneNumero, azioneIntrapresa:el.azioneIntrapresa}]
    }, []);

    tmpUnique = sortArrayOfObjects(reducedArray, 'date', 'descending') //[...new Map(tmpUnique.map((item) => [item["date"], item])).values(),]
    formatedhistoricalAlarmi.value = tmpUnique
    console.log(formatedhistoricalAlarmi.value)
  }      
  
  async function getHistoryData() {
    await dataStore.getHistoricalData(historicalAlarmiParams.value)
    fillTableData()
  }

  function dateFiltering() {
    historicalAlarmiParams.value.start = start
    historicalAlarmiParams.value.end = end
    fileName.value = String(startDate.value + '_' + endDate.value) + '_Allarmi.csv'
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
    { text: t('alarmType'), value: "tipoAllarme",sortable: true, width: 160},
    { text: t('programNumber'), value: "programmaNumero",sortable: true, width: 180},
    { text: t('stationsNumber'), value: "stazioneNumero",sortable: true, width: 160},
    { text: t('action'), value: "azioneIntrapresa",sortable: true, width: 160},
    { text: "Date Time", value: "date",sortable: true, width: 160},
  ] 


  function sortArrayOfObjects(arr, propertyName, order = 'ascending')  {
    const sortedArr = arr.sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
    });

    if (order === 'descending') {
      return sortedArr.reverse();
    }

    return sortedArr;
}
  //other function
  function describeErrorCode(value) {
    switch (value) {
            case '0':
              value = t('noAlarm')
              break;
            case '1':
              value = t('shortCircuit')
              break;
            case '2':
              value = t('firstEntry')
              break;
            case '3':
              value = t('secondEntrance')
              break;
            case '4':
              value = t('wind')
              break;
            case '5':
              value = t('lossOfWater')
              break;
            case '6':
              value = t('highTemperature')
              break;
            case '7':
              value = t('lowTemperature')
              break;
            case '8':
              value = t('highHumidity')
              break;
            case '9':
              value = t('lowHumidity')
              break;
            case '10':
              value = t('highBrightness')
              break;
            case '11':
              value = t('excessiveFlow')
              break;
            case '12':
              value = t('openCloseInput')
              break;
            case '13':
              value = t('excessiveFlowOnMinifert')
              break;
            case '14':
              value = t('minifert')
              break;
            case '15':
              value = t('theProgramCannotStart')
              break;
            case '16':
              value = t('noNetwork')
              break;
            case '17':
              value = t('lowBattery')
              break;
            case '18':
              value = t('lowFertilizerMinifert')
              break;
            case '19':
              value = t('openCircuit')
              break;
            case '20':
              value = t('thirdEntry') 
              break;
            case '21':
              value = t('fourthEntrance')
              break;
            case '22':
              value = t('lowPressure')
              break;
            case '23':
              value = t('highPressure')
              break;
            case '24':
              value = t('noEvRadioConnection')
              break;
            case '25':
              value = t('noRepeaterConnection')
              break;
            case '26':
              value = t('emergencyKey')
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
