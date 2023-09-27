<template>
  <div class="rilevazioni-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/report_eventi_sensori_umidita.png">
      <p>{{ $t('soilMoistureReports') }}</p>
    </div>
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
        :items="formatedhistoricalEventi"
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
      	:data   = "formatedhistoricalEventi"
      	:name    = "fileName">
        <div class="button-wrapper">
            <IveButton label="Export CSV" />
        </div>
      </download-csv>
      <div id="chart" class="mt-20"></div>
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
import ApexCharts from "apexcharts";
import { toInteger } from 'lodash'
// import { Header, Item } from "vue3-easy-data-table";
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
  //props
  const props = defineProps({
    id: String
  })
  var options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    // series: [
    //     {
    //       name: 'Series 1',
    //       data: [
    //       [1691028000000, 0],[1691031600000, 0],[1691035200000, 0],[1691038800000, 0]
    //       ],
    //     },],
    series: [],
    xaxis: {
      type: 'datetime',
      // categories: [],
      tickPlacement: 'on'
    }
  }
  
  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  //state
  const devicesStore = useDevicesStore()
  const dataStore = useDataStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const { historicalDataIsLoading } = storeToRefs(useDataStore())
  const formatedhistoricalEventi = ref([])
  const searchValue = ref()
  const searchField = 'tipoAlarme'
  const title = ref()

  //date filter init
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
  const fileName = ref(String(startDate.value + '_' + endDate.value) + '_Umidita_Eventi.csv')

  //change date format to ISOString
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

  const historicalEventiParams = ref({
    fields: 'S87',
    measurement: 'SATEVENTSTAT',
    device_code: null,
    start: start,
    end: end
  })

  
  function fillTableData() {
    console.log(dataStore.historicalData)
    formatedhistoricalEventi.value = []
    let tmphistoricalEventi
    let chartData = []

    if (dataStore.historicalData !== undefined) {
      dataStore.historicalData.map((data) => {
        tmphistoricalEventi = data.S87.split(',')
        let newObj = {
          date: new Date(toInteger(tmphistoricalEventi[0])*1000).toLocaleString(),
          numeroSensori: tmphistoricalEventi[1],
          rh1: String(tmphistoricalEventi[2] + ' %'),
          rh2: String(tmphistoricalEventi[3] + ' %'),
          rh3: String(tmphistoricalEventi[4] + ' %'),
          rh4: String(tmphistoricalEventi[5] + ' %')
        }
        let newObj2 = {
          date: toInteger(tmphistoricalEventi[0])*1000,
          numeroSensori: toInteger(tmphistoricalEventi[1]),
          rh1: toInteger(tmphistoricalEventi[2]),
          rh2: toInteger(tmphistoricalEventi[3]),
          rh3: toInteger(tmphistoricalEventi[4]),
          rh4: toInteger(tmphistoricalEventi[5])
        }
        chartData.push(newObj2)
        formatedhistoricalEventi.value.push(newObj)
      })
      options.series = []
      options.series.push({
        name: 'RH1',
        data: chartData.map(obj => [obj.date,obj.rh1])
      })
      options.series.push({
        name: 'RH2',
        data: chartData.map(obj => [obj.date,obj.rh2])
      })
      options.series.push({
        name: 'RH3',
        data: chartData.map(obj => [obj.date,obj.rh3])
      })
      options.series.push({
        name: 'RH4',
        data: chartData.map(obj => [obj.date,obj.rh4])
      })
    }
    chart.updateSeries(options.series)
    console.log('table-data', formatedhistoricalEventi.value)
    console.log('chart-data', options.series)
  }

  //table headers
  const headers = [
    { text: "Date Time", value: "date",sortable: true, width: 100},
    { text: t('rhNumber'), value: "numeroSensori",sortable: true, width: 80},
    { text: t('rhLevel1'), value: "rh1",sortable: true, width: 100},
    { text: t('rhLevel2'), value: "rh2",sortable: true, width: 100},
    { text: t('rhLevel3'), value: "rh3",sortable: true, width: 100},
    { text: t('rhLevel4'), value: "rh4",sortable: true, width: 100},
  ]
    
  async function getHistoryData() {
    await dataStore.getHistoricalData(historicalEventiParams.value)
    fillTableData()
  }

  function dateFiltering() {
    historicalEventiParams.value.start = start
    historicalEventiParams.value.end = end
    fileName.value = String(startDate.value + '_' + endDate.value) + '_Umidita_Eventi.csv'
    getHistoryData()
  }

  let chart
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    historicalEventiParams.value.device_code = devicesStore.deviceData.code
    dateFiltering()
    chart = new ApexCharts(document.querySelector("#chart"), options)
    chart.render()
  })

  const newData = computed(() => {
      return [devicesStore.deviceData]
  })


</script>

<style scoped>
.rilevazioni-container {
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
