<template>
  <div class="parametri-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/parametri_generali.png">
      <p>{{ $t('generalParameter') }}</p>
    </div>
    </div>
    <div class="content">
      <div class="header">
        <IdroTitle :title="$t('program')" />
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
        <form @submit.prevent="onSubmit" class="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <span>{{$t('parameter')}}</span>
                </th>
                <th>
                  <span>{{$t('action')}}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label for="nome">{{$t('programName')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input type="text" class="flex gap-2" v-model="programData.Name" :maxlength="15" placeholder="Max 15 caratteri" maxlength="15" :disabled="programData.Name === undefined" 
                    id="nomeProgramma">                    
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('programMode')}}</label>
                </td>
                <td>
                  <span class="flex flex-col gap-1">
                    <span class="flex gap-2">
                      <input :disabled="programData.Enabled === undefined" id="modalitaProgrammaOff" type="radio" v-model="programData.Enabled" value="1" >
                      <label for="modalitaProgrammaOff">OFF</label>
                    </span>
                    <span class="flex gap-2">
                      <input :disabled="programData.Enabled === undefined" id="modalitaProgrammaOn" type="radio" v-model="programData.Enabled" value="0" >
                      <label for="modalitaProgrammaOn">ON</label>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label></label>
                </td>
                <td>
                  <span class="flex flex-col gap-1">
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.functionMode === undefined"
                        name="tempo"
                        id="tempoStazioneMinuti" type="radio" v-model="programData.functionMode" value="1">
                      <label for="tempoStazioneMinuti">{{$t('minute')}}/{{$t('second')}}</label>
                    </span>
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.functionMode === undefined"
                        name="tempo"
                        id="tempoStazioneOre" type="radio" v-model="programData.functionMode" value="2">
                      <label for="tempoStazioneOre">{{$t('hour')}}/{{$t('minute')}}</label>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('cyclesOrTime')}}</label>
                </td>
                <td>
                  <span class="flex flex-col gap-1">
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.cicleTimeMode === undefined"
                        name="F3" id="cicliTemporaleCicli" type="radio" 
                        v-model="programData.cicleTimeMode" value="1">
                      <label for="cicliTemporaleCicli">{{$t('cycles')}}</label>
                    </span>
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.cicleTimeMode === undefined"
                        name="F3" id="cicliTemporaleTempo" type="radio" 
                        v-model="programData.cicleTimeMode" value="0">
                      <label for="cicliTemporaleTempo">{{$t('time')}}</label> 
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('delayBetweenStation')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input
                      :disabled="programData.evDelay === undefined"
                      v-model="programData.evDelay" 
                      type="number" name="F12">
                    <p>sec</p>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('delayBetweenCycles')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input
                      :disabled="programData.cycleDelay === undefined"
                      v-model="programData.cycleDelay" 
                      type="number" name="F13">
                    <p>sec</p>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('startMode')}}</label>
                </td>
                <td>
                  <span class="flex flex-col gap-1">
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.pauseWeekMode === undefined"
                        id="giorniselezionati" type="radio" v-model="programData.pauseWeekMode" value="0">
                      <label for="giorniselezionati" >{{$t('selectedDays')}}</label>
                    </span>
                    <span class="flex gap-2">
                      <input
                        :disabled="programData.pauseWeekMode === undefined"
                        id="giornisaltati" type="radio" v-model="programData.pauseWeekMode" value="1">
                      <label for="giornisaltati" >{{$t('skippedDays')}}</label>
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('biweeklyCalendar')}}</label>
                </td>
                <td v-if="endReload">
                  <div class="biweek-container">
                    <div>
                      <label>{{$t('firstWeek')}}</label>
                      <div name="days-container" v-for="giorno in 7" :key="giorno">
                        <input type="checkbox" :disabled="programData.pauseWeekMode!=0" @change="setIrrigationDay($event, (giorno-1))" :checked="biWeekCalendar[giorno-1].status == 1" :value="biWeekCalendar[giorno-1].status" > {{ biWeekCalendar[giorno-1].day }}
                      </div>
                    </div>
                    <!-- <div class="week-container">
                      <label>{{$t('firstWeek')}}</label>
                      <div name="days-container" v-for="giorno in 7" :key="giorno" >
                        <input type="checkbox" :disabled="programData.pauseWeekMode!=0" @change="setIrrigationDay($event, (giorno+7)-1)" :checked="biWeekCalendar[(giorno+7)-1].status == 1" :value="biWeekCalendar[(giorno+7)-1].status"> {{ biWeekCalendar[(giorno+7)-1].day }}
                      </div>
                    </div> -->
                  </div>
                </td>
              </tr>
              <!-- <tr>
                <td>
                  <label>{{$t('activeWeek')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <p>{{programData.currentWeek}}<sup> o</sup></p>
                  </span>
                </td>
              </tr> -->
              <tr>
                <td>
                  <label>{{$t('skippedDays')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="programData.pauseWeekMode == 0" v-model="programData.skipDays" type="number">
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>{{$t('daysBeforeStart')}}</label>
                </td>
                <td>
                  <span class="flex gap-2 items-center">
                    <input :disabled="programData.pauseWeekMode == 0" v-model="programData.remainingDays" type="number">
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import { functionsIn } from 'lodash';
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
  
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'])
  const title = ref()

  //,S10018 Registro satprgstarts
  const satConfigParams = ref({
    fields: 'S10000,S10001,S10002,S10003,S10004,S10005,S10006,S10007,S10012,S10013,S10018,S10019,S10021',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })

  const satStatParams = ref({
    fields: 'S71',
    measurement: 'SATSTAT',
    device_code: null
  })
  const satData = ref({})


  //----Definizione Globali----
  let programNumber=0;
  let base_reg=(10000+(programNumber * 1000))

  const programData = ref ({
    Name : undefined,
    Enabled : undefined,
    timeMode : undefined,
    pauseWeekMode : undefined,
    cicleTimeMode : undefined,
    flowMode : undefined,
    functionMode : undefined,
    humSensor : undefined,
    waterBudget : undefined,
    calendarBM : '',
    skipDays : 0,
    remainingDays : 0,
    currentWeek : 1,
    evDelay : 0,
    cycleDelay : 0,
    miniFert : 0,
  })

  const endReload = ref(false)
  //---------------------------

  function setIrrigationDay(event, day){
    var retVal=0;
    if(Number(event.target.value) == 1) {
      retVal=0
    }else{
      retVal=1
    }
    event.target.value = retVal
    biWeekCalendar[day].status = retVal
  }

  function fillSatData() {

    base_reg=(10000+(programNumber * 1000))

    let enabledRegister = 'S' + (base_reg);
    let timeModeRegister = 'S' + (base_reg + 1);
    let pauseWeekModeRegister = "S" + (base_reg + 2);
    let cicleTimeModeRegister = 'S' + (base_reg + 3);
    let nameRegister = "S" + (base_reg + 4);
    let humSensorRegister = "S" + (base_reg + 5);
    let flowModeRegister = "S" + (base_reg + 6);
    let waterBudgetRegister = "S" + (base_reg + 7);
    let evDelayRegister = "S" + (base_reg + 12);
    let cycleDelayRegister = "S" + (base_reg + 13);
    let calendarBMRegister = "S" + (base_reg + 18);
    let miniFertRegister  = "S" + (base_reg + 19);
    let remainingDaysRegister = "S" + (base_reg + 21);
    let currentWeekRegister = "S71" ;

    if(dataStore.satConfig !== undefined){
      
      programData.value.Enabled = dataStore.satConfig[enabledRegister]
      programData.value.timeMode = dataStore.satConfig[timeModeRegister]
      programData.value.pauseWeekMode = dataStore.satConfig[pauseWeekModeRegister]
      programData.value.cicleTimeMode = dataStore.satConfig[cicleTimeModeRegister]
      programData.value.Name = dataStore.satConfig[nameRegister]
      programData.value.humSensor = dataStore.satConfig[humSensorRegister]
      programData.value.flowMode = dataStore.satConfig[flowModeRegister]
      programData.value.waterBudget = dataStore.satConfig[waterBudgetRegister]
      programData.value.remainingDays = dataStore.satConfig[remainingDaysRegister]
      programData.value.currentWeek = dataStore.satStat.S71
      programData.value.evDelay = dataStore.satConfig[evDelayRegister]
      programData.value.cycleDelay = dataStore.satConfig[cycleDelayRegister]
      programData.value.miniFert = dataStore.satConfig[miniFertRegister]


      if(programData.value.flowMode === undefined) programData.value.flowMode = 1
      if(programData.value.timeMode === undefined) programData.value.timeMode = 2
      if(programData.value.cicleTimeMode === undefined) programData.value.cicleTimeMode = 0
      if(programData.value.evDelay === undefined) programData.value.evDelay = 0
      if(programData.value.cycleDelay === undefined) programData.value.cycleDelay = 0
      if(programData.value.miniFert === undefined) programData.value.miniFert = 0
      if(programData.value.currentWeek === undefined) programData.value.currentWeek = 1

      if(programData.value.flowMode ==  0){
        programData.value.functionMode = 0 //Lavora a Volume
      }else{
        if(programData.value.timeMode == 0){
          programData.value.functionMode = 1 //Lavora a Minuti/Secondi
        }else{
          programData.value.functionMode = 2 //Lavora a Ore/Minuti
        }
      }

      if(programData.value.Enabled === undefined) programData.value.Enabled = 1
      if(programData.value.Name === undefined) programData.value.Name = "P."+String(programNumber + 1).padStart("2",'0')

      if(programData.value.pauseWeekMode === undefined) programData.value.pauseWeekMode = 0

      if(programData.value.pauseWeekMode == 0){
        //Lavora con calendario bisettimanale
        programData.value.calendarBM = dataStore.satConfig[calendarBMRegister]
        bitmask2Array(programData.value.calendarBM)
      }else{
        //Lavora nei giorni di pause tra cicli
        programData.value.skipDays = dataStore.satConfig[calendarBMRegister]
      }

      if (programData.value.remainingDays === undefined) programData.value.remainingDays = 0
    }
    endReload.value=true
  
  }

  const postSatConCommand = ref({
    command: 'SATPRGCONFIG1',
    payload: {}
  })

  const postFertConCommand = ref({
    command: 'FERTPRGCONFIG1',
    payload: {}
  })

  const postSatConData = ref({
    command: 'SATPRGCONFIG1',
    payload: {}
  })

  const postSatStatData = ref({
    command: 'SATSTAT',
    payload: {}
  })
  

  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    satConfigParams.value.device_code = deviceStore.deviceData.code
    satStatParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    await dataStore.getLastSatStat(satStatParams.value)
    
    await dataStore.getLastSatConfig(satConfigParams.value)

    for(var x=0; x<14; x++){
      biWeekCalendar.push({ 'day' : daysName[x] , 'status' : 0})
    }

    fillSatData()
  })
  
  function onSubmit() {
    console.log(satData.value)
    postSatConData.value.payload = {}
    
    postSatConData.value.command = String('SATPRGCONFIG' + (programNumber + 1))
    postFertConCommand.value.command = String('FERTPRGCONFIG' + programData.value.miniFert + '?')
    dataStore.postControl(satStatParams.value.device_code,postFertConCommand.value)

    let enabledRegister = 'S' + (base_reg);
    let timeModeRegister = 'S' + (base_reg + 1);
    let pauseWeekModeRegister = "S" + (base_reg + 2);
    let cicleTimeModeRegister = 'S' + (base_reg + 3);
    let nameRegister = "S" + (base_reg + 4);
    let humSensorRegister = "S" + (base_reg + 5);
    let flowModeRegister = "S" + (base_reg + 6);
    let waterBudgetRegister = "S" + (base_reg + 7);
    let evDelayRegister = "S" + (base_reg + 12);
    let cycleDelayRegister = "S" + (base_reg + 13);
    let calendarBMRegister = "S" + (base_reg + 18);
    let miniFertRegister  = "S" + (base_reg + 19);
    let remainingDaysRegister = "S" + (base_reg + 21);
    let currentWeekRegister = "S71" ;
    

    switch(Number(programData.value.functionMode)){
      case 0: //Lavora a Volume
        programData.value.flowMode = 0 
      break;
      case 1: //Lavora a Minuti/Secondi
        programData.value.flowMode = 1
        programData.value.timeMode = 0
      break;
      case 2: //Lavora a Ore/Minuti
        programData.value.flowMode = 1
        programData.value.timeMode = 1
        break;
    }
    

    if (programData.value.pauseWeekMode == '0') {
      postSatConData.value.payload[calendarBMRegister] = array2bitmask()
    } else if (programData.value.pauseWeekMode == '1') {
      postSatConData.value.payload[calendarBMRegister] = String(programData.value.skipDays)
    }

    postSatConData.value.payload[enabledRegister] = String(programData.value.Enabled)
    postSatConData.value.payload[timeModeRegister] = String(programData.value.timeMode)
    postSatConData.value.payload[pauseWeekModeRegister] = String(programData.value.pauseWeekMode)
    postSatConData.value.payload[cicleTimeModeRegister] = String(programData.value.cicleTimeMode)
    postSatConData.value.payload[nameRegister] = String(programData.value.Name)
    postSatConData.value.payload[flowModeRegister] = String(programData.value.flowMode)
    postSatConData.value.payload[evDelayRegister] = String(programData.value.evDelay)
    postSatConData.value.payload[cycleDelayRegister] = String(programData.value.cycleDelay)
    postSatConData.value.payload[miniFertRegister] = String(programData.value.miniFert)
    postSatConData.value.payload[remainingDaysRegister] = String(programData.value.remainingDays)

    console.log(postSatConData.value.payload)
    dataStore.postControl(satConfigParams.value.device_code,postSatConData.value)

    postSatStatData.value.payload.S71 = String(programData.value.currentWeek)
    console.log(postSatStatData.value.payload)
    
    dataStore.postControl(satStatParams.value.device_code,postSatStatData.value)

  }


  
  async function changeOption(e) {
    optionValue.value = e.target.value
    programNumber = e.target.value - 1

    postSatConCommand.value.command = String('SATPRGCONFIG' + e.target.value + '?')
    dataStore.postControl(satStatParams.value.device_code,postSatConCommand.value)

    base_reg=(10000+(programNumber * 1000))

    satConfigParams.value.fields = String(
      'S' + base_reg + ',' + 
      'S' + (base_reg + 1) + ',' + 
      'S' + (base_reg + 2) + ',' + 
      'S' + (base_reg + 3) + ',' + 
      'S' + (base_reg + 4) + ',' +  
      'S' + (base_reg + 6) + ',' + 
      'S' + (base_reg + 12) + ',' + 
      'S' + (base_reg + 13) + ',' + 
      'S' + (base_reg + 18) + ',' + 
      'S' + (base_reg + 19) + ',' + 
      'S' + (base_reg + 21) + ',' )

    satConfigParams.value.measurement = String('SATPRGCONFIG' + e.target.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    await dataStore.getLastSatStat(satStatParams.value)

    fillSatData()

  }


  let daysName = [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday'),t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday')]
  ///Inizializzo la matrice per il rendering
  const biWeekCalendar= []
  
  function bitmask2Array(bitmask){
      if((String(bitmask).length == 1 && String(bitmask) == '0') || bitmask===undefined ){
        //Registro Inutilizzato, lo inizializzo
        for (var day = 0; day < daysName.length; day++){
          biWeekCalendar[day].status=0
        }
      }else{
        for (var day = 0; day < daysName.length; day++){
          biWeekCalendar[day].status=bitmask.charAt(day)
        }
      }
  }

  function array2bitmask(){
    var retVal=""

    for (var day = 0; day < daysName.length; day++){
      retVal+=String(biWeekCalendar[day].status)
    }

    return retVal+"00"
  }

</script>
  
<style scoped>

label {
  font-weight: 500;
}

td{
  border-bottom: 1px solid black;
  
  backdrop-filter: unset !important;
}

.biweek-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.week-container{
  margin-left:2rem;
}

.parametri-container {
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
.header {
@apply
  flex flex-col justify-center items-center
}

input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3
}
input[type=checkbox], input[type=radio], input[type=range]{
  @apply cursor-pointer
}
input:disabled, select:disabled {
  @apply cursor-default animate-pulse
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