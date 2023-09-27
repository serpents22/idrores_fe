<template>

  <!-- api loading.. -->
  <atom-spinner v-if="apisLoading" :animation-duration="1000" :size="100" color="green" />
  <!-- api loaded -->
  <div v-else class="container">
    <select 
      class="cursor-pointer w-[200px] rounded-md px-2 py-1 sm:px-4 sm:py-2 self-center" 
      @change="changeOption($event)">
        <option 
          v-for="tab in tabs" :key="tab.value"
          class="nav"
          :id="tab">{{tab}}</option>
    </select>
    <form @submit.prevent="onSubmit" class="table-container">
      <table :tableHeader="tableHeader">
        <thead>
          <tr>
            <th v-for="tHead in tableHeader" :key="tHead">
              {{tHead}}
            </th>
          </tr>
        </thead>
        <tr v-for="(row, index) in rowsData" :key="index">
          <td>
            <p>{{ row.id }}</p>
          </td>
        </tr>
        
          <td>
            <input class="w-32" type="text" value="Nome Stazione" enabled>
            
            <select v-model="row.selected_station" value="row.selected_station" name="ingresso-1-1" class="dropdown" @change="updateStation(row.id, row.selected_station)">
              <option v-for="(tData, ii) in row.stations" :key="ii"><p v-for="valve in tData" :key="valve">{{ valve.ev }}</p></option>
            </select>            
          </td>
        
          <td>
            <select v-model="row.station_status" name="ingresso-1" class="dropdown" @change="updateStationStatus(row.id, row.station_status)">
              <option value="OFF">OFF</option>
              <option value="ON">ON</option>
            </select>
          </td>
          <!-- <td> -->
            <!-- <input class="w-32" type="text" value="Nome Stazione" enabled> -->
          <!-- </td> -->
          <td>
            <input class="w-20" :disabled="tempo !== 'min'" type="number" v-model="row.min">
          </td>
          <td>
            <input class="w-20" :disabled="tempo !== 'min'" type="number" v-model="row.sec">
          </td>
          <!--
          <td>
            <input type="checkbox" v-model="row.checked" @change="handleRowCheck(row.id, row.checked)">
          </td>
          -->

      </table>
      
      <table>
        <tr>
         <td>
          
          <div class="button-wrapper" >
            <MyButton type="submit" class="filled" label="Aggiungi" @click="addRow"/>
          </div>
        </td>
        <td>
          <div class="button-wrapper">
            <MyButton type="submit" class="filled" label="Rimuovi" @click="removeLast" />
          </div>
        </td>
        <td>
          <div class="button-wrapper">
            <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
          </div>
        </td>
      </tr>
        
    </table>
    </form>
  </div>  
</template>

<script setup>
import { useDataStore } from '@/stores/DataStore';
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref, watch } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import { toInteger } from 'lodash';
import { AtomSpinner } from 'epic-spinners'
import { boolean } from 'yup/lib/locale';
  
  let rowCounter = 1;
  let maxRows = 96;
  let checkedRows = [];
  //props
  const props = defineProps({
    id: String
  })

  
  //state
  const devicesStore = useDevicesStore()
  const dataStore = useDataStore()
  const { evConfigIsLoading, satConfigIsLoading, evStationIsLoading,  postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())

  //variable declaration
  const newData = computed(() => {
    return [devicesStore.deviceData]
  })

  //refactoring evConfig Hex data
  const evConfigValid = computed(() => {
    return Object.keys( dataStore.evConfig ).
                  filter( val => (val[0]=='S' && val.length==5 && dataStore.evConfig[val].length >= 5) ).
                  reduce( (acc, key) => { return Object.assign(acc, {[key]: dataStore.evConfig[key]}) }, {});
  });

  //refactoring evStation from S10200
  const evStationValue = computed(() => {
    return Object.keys( dataStore.evStation ).
                  filter( val => ( val.replace('S', '') *1 >= 10200 ) ).
                  reduce( (acc, key) => { return Object.assign(acc, {[key]: dataStore.evStation[key]}) }, {});
  });

  //refactoring evStation from S10100
  const evStationTime = computed(() => {
    let res = Object.keys( dataStore.evStation ).
                  filter( val => ( val.replace('S', '') >= 10100 && val.replace('S', '') < 10200 ) ).
                  reduce( (acc, key) => { return Object.assign(acc, {[key]: dataStore.evStation[key]}) }, {});

    //console.log("evStationTime", res); //MV Rimosso per debug
    //return res; //MV Rimosso per debug
  });

  //api loading
  let apisLoading = ref(true);  
  const title = ref()
  const evData = ref([])
  const groupedTableData = ref([])
  let tempo = ref('')
  const optionValue = ref(1)
  const tabs = ref([...Array(30)].map( (_, index) => index + 1 ));
  const rows = ref([...Array(maxRows)].map( (_, index) => index + 1 ));
  const rowsData = ref([]);
  rowsData.value=[];
  

  const evConfFields = [...Array(1152)].map( (_, index) => `S${2000 + index}` ).join(',');
  const evConfigParams = ref({
    fields: evConfFields,
    measurement: 'EVCONFIG',
    device_code: null
  })

  const satConfigParams = ref({
    fields: 'S10001,S10006',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })

  
  const evStationParams = ref({
    fields: [...Array(196)].map( (_, index) => `S${10100 + index}` ).join(','),
    measurement: 'SATPRGTIMES1',
    device_code: null
  })
  let counterDebug = ref(0)

  function updateStation(index, station){
    [...( rowsData.value[index-1]['selected_station']=station )]    
  }

  function updateStationStatus(index, station_status){
    [...( rowsData.value[index-1]['station_status']=station_status )]
  }

  // CHECKBOX REMOVE
  // function handleRowCheck(index, checked){
  //   if (checked)
  //     checkedRows.push(index)
  //   else
  //     checkedRows.splice(checkedRows.indexOf(index), 1)

  //   for(let i=0; i < checkedRows.length; i++)
  //     console.log(checkedRows[i]);
  // }
    

  function handleRowsRemove(){
    removeCheckedRows()
    console.log(removeCheckedRows)

  }

  function fillEvConfigData() {
    postEvStationData.value.payload = {}
    evData.value = []
    let evIndex = 2000
    let evStationIndex2 = 10200
    let evStationIndex1 = 10100
    let satConfigIndex1 = 10001
    let satConfigIndex6 = 10006
    let i = 0
    for (let iFor = 0; iFor < dataStore.evConfigLength / 5; iFor++) {

      if (dataStore.evConfig.hasOwnProperty('S' + evIndex)) {
        if (dataStore.evConfig['S' + evIndex] !== "FFFFFF") {
          counterDebug.value++
          const min = ref('')
          const sec = ref('')

          let tmpS1 = dataStore.satConfig === undefined ? '0' : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) +  satConfigIndex1)]
          let tmpS6 = dataStore.satConfig === undefined ? '1' : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) +  satConfigIndex6)]
  
          if (tmpS6 === '0') {
            tempo.value = 'volume'
          } else if (tmpS1 === '0') {
            tempo.value = 'min'
          } else {
            tempo.value = 'ore'
          }
          
          switch (tempo.value) {
            case 'min':
              console.log('min')
              console.log('S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1))))
              
              let tmpMinSec = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split('.')
              min.value = tmpMinSec === undefined ? 0 : tmpMinSec[0]
              sec.value = tmpMinSec === undefined ? 0 : tmpMinSec[1]
              break;
            case 'ore':
              console.log('ore')
              let tmpOreMin = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split('.')
              min.value = tmpOreMin === undefined ? 0 : tmpOreMin[0]
              sec.value = tmpOreMin === undefined ? 0 : tmpOreMin[1]
              break;
            case 'volume':
              console.log('volume')
              min.value = 0
              sec.value = 0
              break;
          }


          let tmpOrdinare = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex2+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split(',')

          let obj = {
            id: i,
            ev: dataStore.evConfig === undefined ? 'no name' : dataStore.evConfig['S' + evIndex], 
            stazione: dataStore.evConfig === undefined ? '1' : dataStore.evConfig['S' + (evIndex+2)],
            ordinareValue: tmpOrdinare === undefined ? '1' : tmpOrdinare[0],
            ordinare: tmpOrdinare === undefined ? '1' : tmpOrdinare[1],
            min: min.value,
            sec: sec.value,
          }
          evData.value.push(obj)
          postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) +(evStationIndex2+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(evData.value[i].ordinareValue + ',' + evData.value[i].ordinare)
          postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(evData.value[i].min + '.' + evData.value[i].sec)
          i++
        }
      } else {
        //i--
      }
      evIndex += 6
    }
  }

  function groupingTableData() {    
    groupedTableData.value = evData.value.reduce((r, a) => {
      r[a.stazione] = [...r[a.stazione] || [], a];
    return r;
    }, {})
  }

  function orderData(index,key,state) {
    console.log('before order : ', evData.value);
    switch (key) {
      case 'index':
        state = !state
        tableHeader.value[index].state = state
        if (tableHeader.value[index].state === true) {
          evData.value.sort(function (a, b) {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
        } else {
          evData.value.reverse(function (a, b) {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
        }
        break;
    
      default:
        break;
    }
    console.log('after order : ', evData.value);
    groupingTableData()
  }

  function getHexCode(stId){
    switch(stId){
      case 1: return 'FFFFB4';
      case 2: return 'FFFFB5';
      case 3: return 'FFFFB6';
      case 4: return 'FFFFB7';
    }
  }

  function getOrdCode(stHex){
    switch(stHex){
      case 'FFFFB4': return 1;
      case 'FFFFB5': return 2;
      case 'FFFFB6': return 3;
      case 'FFFFB7': return 4;
    }
  }

  //Lifecycle function
  onMounted( async () => {    

    await devicesStore.loadDevice(props.id)
    satConfigParams.value.device_code = devicesStore.deviceData.code
    evConfigParams.value.device_code = devicesStore.deviceData.code
    evStationParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastEvConfig(evConfigParams.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    await dataStore.getLastEvStation(evStationParams.value)
    fillEvConfigData()
    groupingTableData()
    addRow()
    // addAllRows()
    
    
    
  
    //apis loaded
    apisLoading.value = false;
    
  })

  /*
  function addAllRows(){

    if(rowsData.length != 0 ){

      for(let i=1; i <= maxRows; i++){
        // debugger
        
          let oneitem = {
            id: i,
            stations: groupedTableData,
            // selected_station: evConfigValid.value[Object.keys(evConfigValid.value)[i-1]],//Get the evConfig value from refactored data...
            selected_station: getHexCode( evStationValue.value[Object.keys(evStationValue.value)[i-1]].split(',')[0]*1 ),
            station_status:   evStationValue.value[Object.keys(evStationValue.value)[i-1]].split(',')[1]*1 ? 'ON' : 'OFF',
            name: 'Nome Stazione',
            // min: Math.floor( evStationValue.value[Object.keys(evStationValue.value)[i-1]].split(',')[0]*1 ) ?? 0,
            min: evStationTime.value[Object.keys(evStationTime.value)[i-1]].split('.')[0],
            sec: evStationTime.value[Object.keys(evStationTime.value)[i-1]].split('.')[1],
            evfield: Object.keys(evStationValue.value)[i-1],
            tmfield: Object.keys(evStationTime.value)[i-1]


          }
          
          rowsData.value.push(oneitem);
      } 
      

    }
  } **/

  function addRow(){
    console.log("addRow");
    if (rowCounter <= maxRows)
    {
      let oneitem = {
            id: rowCounter,
            stations: groupedTableData,
            // selected_station: evConfigValid.value[Object.keys(evConfigValid.value)[i-1]],//Get the evConfig value from refactored data...
            selected_station: getHexCode( evStationValue.value[Object.keys(evStationValue.value)[rowCounter-1]].split(',')[0]*1 ),
            station_status:   evStationValue.value[Object.keys(evStationValue.value)[rowCounter-1]].split(',')[1]*1 ? 'ON' : 'OFF',
            name: 'Nome Stazione',
            // min: Math.floor( evStationValue.value[Object.keys(evStationValue.value)[i-1]].split(',')[0]*1 ) ?? 0,
            min: evStationTime.value[Object.keys(evStationTime.value)[rowCounter-1]].split('.')[0],
            sec: evStationTime.value[Object.keys(evStationTime.value)[rowCounter-1]].split('.')[1],
            evfield: Object.keys(evStationValue.value)[rowCounter-1],
            tmfield: Object.keys(evStationTime.value)[rowCounter-1],
            checked: false

          }
          
    rowsData.value.push(oneitem);
    rowCounter += 1;
    }
    
  }

  function removeCheckedRows(){
    for( let i = checkedRows.length - 1; i >= 0; i-- ) {
      let checked = checkedRows[i];
      
      for(let x =  rowsData.value.length - 1; x >= 0; x-- ) {
        let row = rowsData.value[x];
        
        if (row.id == checked)
        {
          rowsData.value.splice(x, 1);
          checkedRows.splice(i,1);
          rowCounter -= 1;
          break;
        }
      }
    }

    for(let i = 0; i < rowsData.value.length; i++)
      rowsData.value[i].id = i+1;
      
  }
    
function removeLast()
{
  if (rowsData.value.length > 1)
  {
    rowsData.value.splice(rowsData.value.length - 1, 1);
    rowCounter -= 1;
  }
    
}      
      
    
  
  async function changeOption(e) {
    
    optionValue.value = e.target.value
    satConfigParams.value.fields = String(
      'S' + (((e.target.value - 1) * 1000) + 10001) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10006))

    evStationParams.value.fields = [...Array(196)].map( (_, index) => `S${(e.target.value-1)*1000 + 10100 + index}` ).join(',');

    satConfigParams.value.measurement = String('SATPRGCONFIG' + e.target.value)
    evStationParams.value.measurement = String('SATPRGTIMES' + e.target.value)
    await dataStore.getLastEvConfig(evConfigParams.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    await dataStore.getLastEvStation(evStationParams.value)

    fillEvConfigData()
    groupingTableData()
  }


  const postEvStationData = ref({
    command: 'SATPRGTIMES1',
    payload: {}
  })

  function updateOrdinareValue(index) {
    evData.value[index-1].ordinareValue = index
    groupingTableData()
  }

  function onSubmit() {
    debugger
    // updatePostData()
    
    //sattime updation: {S10200: '1,0'} #########################################################
    postEvStationData.value.command = `SATPRGTIMES${optionValue.value}`

    rowsData.value.forEach( x => { 
      postEvStationData.value.payload[x.tmfield] = `${x.min}.${x.sec}`;
      postEvStationData.value.payload[x.evfield] = `${ getOrdCode(x.selected_station) },${x.station_status == 'ON' ? 1 : 0}`;
      return postEvStationData;
    });

    debugger
    let keys = Object.keys(postEvStationData.value.payload).filter( key => !postEvStationData.value.payload[key].includes('undefined'))

    let validPayload = {};
    keys.map( xx => validPayload[xx] = postEvStationData.value.payload[xx]);

    dataStore.postControl(evConfigParams.value.device_code, {"command": postEvStationData.value.command, "payload": validPayload})
  }

  const tableHeader = ['Ordine Partenza', 'Stazione', 'ON/OFF', 'Minuti', 'Secondi']

  const tableHeaders = ref(
    [
      {key: 'index',title: 'Ordine Partenza', state:true}, 
      {key: 'code',title: 'Stazione', state:true}, 
      {key: 'stazione',title: 'ON/OFF', state:true}, 
      // {key: 'identificativo',title: 'Nome', state:true}, 
      {key: 'min',title: 'Minuti', state:true},
      {key: 'sec',title: 'Secondi', state:true}
    ])

</script>

<style scoped>

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto 
}

input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded py-2 min-w-[30px] flex w-full
}

select {
  @apply pl-2 rounded py-2 min-w-[30px] cursor-pointer flex w-full
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


</style>
