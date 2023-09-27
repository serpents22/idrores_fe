<template>
  <div class="partenze-container">
    <sidebar 
      :noSocial="true" 
      :backOn="true" 
      />
    <div class="device-container">
      <deviceCard 
        :small=true
        :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/programma_partenze.png">
      <p>{{ $t('scheduleStart') }}</p>
    </div>
    </div>
    <div class="content">
      <div class="header">
        <IdroTitle :title="$t('program')" />
        <div class="flex items-center gap-4 mb-4 bg-white rounded-md px-4">
          <select 
          class="dropdown"
          @change="changeOption($event)">
          <option 
          v-for="tab in tabs" :key="tab.value"
          class="nav"
          :id="tab">{{tab}}</option>
        </select>
        <h2 class="font-semibold text-lg cursor-default">{{ satData.programName }}</h2>
      </div>
        <h2 class="font-bold text-xl">{{title}}</h2>
      </div>
      <div class="main">
        <form @submit.prevent="onSubmit" class="table-container">
          <table style="margin-bottom:1rem">
            <thead>
                <tr>
                  <th class="w-10">
                    <label>{{ $t('activate') }}</label>
                  </th>
                  <th class="w-40">
                    <label>{{ $t('startTime') }}</label>
                  </th>
                  <th class="w-40">
                    <label v-if="endProgramMode==1">{{ $t('cycles') }}</label>
                    <label v-if="endProgramMode==0">{{ $t('endTime') }}</label>
                  </th>
                </tr>
            </thead>
              <tr name="Riga1" class="w-full">
                <td name="Attivo">
                  <div class="flex gap-2 items-center">
                    <label>1</label>
                    <input v-model="satData.isAuto1" type="checkbox" name="auto-1">
                  </div>
                </td>
                <td name="Orario Inizio">
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.ore0" class="w-30" :disabled="satData.isAuto1 === false" type="number" name="ore0">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.min0" class="w-30" :disabled="satData.isAuto1 === false" type="number" name="min0">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
                <td v-if="endProgramMode==1">
                  <div class="flex gap-2 items-center">
                    <input v-model="satData.S1" class="w-30"  :disabled="satData.isAuto1 === false" type="number" name="cicli0">
                    <label>{{$t('cycles')}}</label>
                  </div>
                </td>
                <td name="OrarioFine1" v-if="endProgramMode==0" :disabled="satData.isAuto1 === false">
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time1H" class="w-30" :disabled="satData.isAuto1 === false" type="number" name="ore2">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time1M" class="w-30" :disabled="satData.isAuto1 === false" type="number" name="min2">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr name="riga2" class="w-full">
                <td>
                  <div class="flex gap-2 items-center">
                    <p>2</p>
                    <input v-model="satData.isAuto2" type="checkbox" name="auto-2">
                  </div>
                </td>
                <td>
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.ore2" class="w-30" :disabled="satData.isAuto2 === false" type="number" name="ore2">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input 
                        v-model="satData.min2" class="w-30" :disabled="satData.isAuto2 === false" type="number" name="min2">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
                <td v-if="endProgramMode==1">
                  <div class="flex gap-2 items-center">
                    <input v-model="satData.S3" class="w-30" :disabled="satData.isAuto2 === false" type="number" name="cicli3">
                    <label>{{$t('cycles')}}</label>
                  </div>
                </td>
                <td name="OrarioFine3" v-if="endProgramMode==0">
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time3H" class="w-30" :disabled="satData.isAuto2 === false" type="number" name="ore2">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time3M" class="w-30" :disabled="satData.isAuto2 === false" type="number" name="min2">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr name="riga3" class="w-full">
                <td>
                  <div class="flex gap-2 items-center">
                    <p>3</p>
                    <input v-model="satData.isAuto3" type="checkbox" name="auto-3">
                  </div>
                </td>
                <td>
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.ore4" class="w-30" :disabled="satData.isAuto3 === false" type="number" name="ore4">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.min4" class="w-30" :disabled="satData.isAuto3 === false" type="number" name="min4">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
                <td v-if="endProgramMode==1">
                  <div class="flex gap-2 items-center">
                    <input v-model="satData.S5" class="w-30" :disabled="satData.isAuto3 === false" type="number" name="cicli5">
                    <label>{{$t('cycles')}}</label>
                  </div>
                </td>
                <td name="OrarioFine5" v-if="endProgramMode==0">
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time5H" class="w-30" :disabled="satData.isAuto3 === false" type="number" name="ore2">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time5M" class="w-30" :disabled="satData.isAuto3 === false" type="number" name="min2">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr name="riga4" class="w-full">
                <td>
                  <div class="flex gap-2 items-center">
                    <p>4</p>
                    <input v-model="satData.isAuto4" type="checkbox" name="auto-4">
                  </div>
                </td>
                <td>
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.ore6" class="w-30" :disabled="satData.isAuto4 === false" type="number" name="ore6">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.min6" class="w-30" :disabled="satData.isAuto4 === false" type="number" name="min6">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
                <td v-if="endProgramMode==1">
                  <div class="flex gap-2 items-center">
                    <input v-model="satData.S7" class="w-30" :disabled="satData.isAuto4 === false" type="number" name="cicli7">
                    <label>{{$t('cycles')}}</label>
                  </div>
                </td>
                <td name="OrarioFine7" v-if="endProgramMode==0">
                  <div class="mp-flex">
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time7H" class="w-30" :disabled="satData.isAuto4 === false" type="number" name="ore2">
                      <label>{{$t('hour')}}</label>
                    </div>
                    <div class="flex gap-2 items-center td-gap">
                      <input v-model="satData.Time7M" class="w-30" :disabled="satData.isAuto4 === false" type="number" name="min2">
                      <label>{{$t('minute')}}</label>
                    </div>
                  </div>
                </td>
              </tr>
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
import { useProgramConfigStore } from '@/stores/program/ProgramConfigStore'
import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
  
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
  const programConfigStore = useProgramConfigStore()
  const { postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [deviceStore.deviceData]
    })
  const title = ref()
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8'])
  const satConfigParams = ref({
    fields: 'S10050,S10051,S10052,S10053,S10054,S10055,S10056,S10057',
    measurement: 'SATPRGSTARTS1',
    device_code: null
  })

  const programConfigParams = ref({
    fields: 'S10002,S10003',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })

  const progConfigParams = ref({
    fields: 'S10004',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })

  const satData = ref({})

  let programNumber=0;
  let base_reg=(10000+(programNumber * 1000))
  let endProgramRegister="S"+Number(base_reg+3)
  let endProgramMode=0
  let nameRegister = "S" + (base_reg + 4);
  function fillSatData() {
    let programRegister="S"+(base_reg + 50)
    let tmpOreMin0 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig[programRegister].split('.')

    programRegister="S"+(base_reg + 52);
    let tmpOreMin2 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig[programRegister].split('.')

    programRegister="S"+(base_reg + 54);
    let tmpOreMin4 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig[programRegister].split('.')

    programRegister="S"+(base_reg + 56);
    let tmpOreMin6 = dataStore.satConfig === undefined ? undefined : dataStore.satConfig[programRegister].split('.')
    
    nameRegister = "S" + (base_reg + 4)
    satData.value.programName = programConfigStore.programConfig[nameRegister]

    satData.value.ore0 = tmpOreMin0 === undefined ? 0 : tmpOreMin0[0]
    satData.value.min0 = tmpOreMin0 === undefined ? 0 : tmpOreMin0[1]
    satData.value.isAuto1 = tmpOreMin0 === undefined ? false : Boolean(Number(tmpOreMin0[2]))

    satData.value.ore2 = tmpOreMin2 === undefined ? 0 : tmpOreMin2[0]
    satData.value.min2 = tmpOreMin2 === undefined ? 0 : tmpOreMin2[1]
    satData.value.isAuto2 = tmpOreMin2 === undefined ? false : Boolean(Number(tmpOreMin2[2]))

    satData.value.ore4 = tmpOreMin4 === undefined ? 0 : tmpOreMin4[0]
    satData.value.min4 = tmpOreMin4 === undefined ? 0 : tmpOreMin4[1]
    satData.value.isAuto3 = tmpOreMin4 === undefined ? false : Boolean(Number(tmpOreMin4[2]))

    satData.value.ore6 = tmpOreMin6 === undefined ? 0 : tmpOreMin6[0]
    satData.value.min6 = tmpOreMin6 === undefined ? 0 : tmpOreMin6[1]
    satData.value.isAuto4 = tmpOreMin6 === undefined ? false : Boolean(Number(tmpOreMin6[2]))
    console.log(satData.value)

    endProgramMode=tmpStore[endProgramRegister]

    if(endProgramMode == 0){
      
      programRegister="S"+(base_reg + 51);
      var timeValue = dataStore.satConfig === undefined ? '0.00' : String(dataStore.satConfig[programRegister]).split('.')
      satData.value.Time1H=timeValue[0]
      satData.value.Time1M=timeValue[1]

      programRegister="S"+(base_reg + 53);
      timeValue = dataStore.satConfig === undefined ? '0.00' : dataStore.satConfig[programRegister].split('.')
      satData.value.Time3H=timeValue[0]
      satData.value.Time3M=timeValue[1]
      
      programRegister="S"+(base_reg + 55);
      timeValue = dataStore.satConfig === undefined ? '0.00' : dataStore.satConfig[programRegister].split('.')
      satData.value.Time5H=timeValue[0]
      satData.value.Time5M=timeValue[1]

      programRegister="S"+(base_reg + 57);
      timeValue = dataStore.satConfig === undefined ? '0.00' : dataStore.satConfig[programRegister].split('.')
      satData.value.Time7H=timeValue[0]
      satData.value.Time7M=timeValue[1]

    }else{
      //Lavora a cicli
      programRegister="S"+(base_reg + 51);
      satData.value.S1 = dataStore.satConfig === undefined ? 0 : dataStore.satConfig[programRegister]

      programRegister="S"+(base_reg + 53);
      satData.value.S3 = dataStore.satConfig === undefined ? 0 : dataStore.satConfig[programRegister]

      programRegister="S"+(base_reg + 55);
      satData.value.S5 = dataStore.satConfig === undefined ? 0 : dataStore.satConfig[programRegister]

      programRegister="S"+(base_reg + 57);
      satData.value.S7 = dataStore.satConfig === undefined ? 0 : dataStore.satConfig[programRegister]
    }
    
  }
  const postSatConData = ref({
    command: 'SATPRGSTARTS1',
    payload: {}
  })


  onMounted( async () => {
    await deviceStore.loadDevice(props.id)
    satConfigParams.value.device_code = deviceStore.deviceData.code
    programConfigParams.value.device_code = deviceStore.deviceData.code
    progConfigParams.value.device_code = deviceStore.deviceData.code
    title.value = 'Idrosat:' + deviceStore.deviceData.name
    fetchSatData()
  })

  async function changeOption(e) {
    optionValue.value = e.target.value
    programNumber = e.target.value - 1
    console.log(optionValue.value)
    
    base_reg=(10000+(programNumber * 1000))
    var startReg=50;
    //let programRegister="S"+(base_reg + 50);

    satConfigParams.value.fields = String(
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++) + ',' + 
      'S' + (base_reg + startReg++))

      progConfigParams.value.fields = String(
      'S' + (base_reg + 4))

    satConfigParams.value.measurement = String('SATPRGSTARTS' + e.target.value)
    progConfigParams.value.measurement = String('SATPRGCONFIG' + e.target.value)
    fetchSatData()
    console.log(satData.value)
  }

  let tmpStore=null;
  async function fetchSatData() {
    await dataStore.getLastSatConfig(programConfigParams.value)
    tmpStore=dataStore.satConfig;
    await programConfigStore.getProgramConfig(progConfigParams.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    fillSatData()
  }

  function onSubmit() {
    postSatConData.value.payload = {}
    postSatConData.value.command = String('SATPRGSTARTS' + optionValue.value)

    if(endProgramMode == 0){
      satData.value.S1 = String(satData.value.Time1H)+"."+String(satData.value.Time1M)
      satData.value.S3 = String(satData.value.Time3H)+"."+String(satData.value.Time3M)
      satData.value.S5 = String(satData.value.Time5H)+"."+String(satData.value.Time5M)
      satData.value.S7 = String(satData.value.Time7H)+"."+String(satData.value.Time7M)
    }

    postSatConData.value.payload['S' + ((programNumber * 1000) + 10050)] = String(satData.value.ore0 + '.' + satData.value.min0 + "." + Number(satData.value.isAuto1))
    postSatConData.value.payload['S' + ((programNumber * 1000) + 10051)] = String(satData.value.S1)

    postSatConData.value.payload['S' + ((programNumber * 1000) + 10052)] = String(satData.value.ore2 + '.' + satData.value.min2 + "." + Number(satData.value.isAuto2))
    postSatConData.value.payload['S' + ((programNumber * 1000) + 10053)] = String(satData.value.S3)

    postSatConData.value.payload['S' + ((programNumber * 1000) + 10054)] = String(satData.value.ore4 + '.' + satData.value.min4 + "." + Number(satData.value.isAuto3))
    postSatConData.value.payload['S' + ((programNumber * 1000) + 10055)] = String(satData.value.S5)

    postSatConData.value.payload['S' + ((programNumber * 1000) + 10056)] = String(satData.value.ore6 + '.' + satData.value.min6 + "." + Number(satData.value.isAuto4))
    postSatConData.value.payload['S' + ((programNumber * 1000) + 10057)] = String(satData.value.S7)

    dataStore.postControl(satConfigParams.value.device_code,postSatConData.value)


   /* if(satData.value.isAuto1){
      satData.value.isAuto1=1;
    }else{
      satData.value.isAuto1=0;
    }
    
    if(satData.value.isAuto2){
      satData.value.isAuto2=1;
    }else{
      satData.value.isAuto2=0;
    }
    
    if(satData.value.isAuto3){
      satData.value.isAuto3=1;
    }else{
      satData.value.isAuto3=0;
    }

    if(satData.value.isAuto4){
      satData.value.isAuto4=1;
    }else{
      satData.value.isAuto4=0;
    }*/
   
    

    /*
    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10050)] = satData.value.isAuto1 === false ? "24.00" : String(satData.value.ore0 + '.' + satData.value.min0)
    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10051)] = satData.value.isAuto1 === false ? "0" : String(satData.value.S1)

    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10052)] = satData.value.isAuto2 === false ? "24.00" : String(satData.value.ore2 + '.' + satData.value.min2)
    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10053)] = satData.value.isAuto2 === false ? "0" : String(satData.value.S3)

    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10054)] = satData.value.isAuto3 === false ? "24.00" : String(satData.value.ore4 + '.' + satData.value.min4)
    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10055)] = satData.value.isAuto4 === false ? "0" : String(satData.value.S5)

    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10056)] = satData.value.isAuto4 === false ? "24.00" : String(satData.value.ore6 + '.' + satData.value.min6) 
    postSatConData.value.payload['S' + (((optionValue.value - 1) * 1000) + 10057)] = satData.value.isAuto4 === false ? "0" : String(satData.value.S7)
    */

    
  }

</script>
  
  <style scoped>
  
  .partenze-container {
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
.dropdown {
  @apply pl-2 rounded w-fit py-2 sm:py-3 cursor-pointer outline-none
}

  
  
  input[type=text], input[type=password], input[type=number] {
    @apply pl-2 rounded w-10 md:w-20 py-2
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
      border-b-2 border-[#3a3a3e] bg-[#DDE8FA]/60 backdrop-blur-lg z-10
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

  .w-50{
    width: 50%;
  }

  .w-10{
    width: 10%;
  }

  .w-30{
    width: 30%;
    min-width: 40px;
  }

  /* .w-40{
    width: 40%;
    min-width: 100px;
  } */

  .mp-flex{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .td-gap{
    margin-right: 1rem;
  }
  </style>