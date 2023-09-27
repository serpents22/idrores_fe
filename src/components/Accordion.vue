<template>
  <div class="flex flex-col max-w-[800px] w-full rounded" v-for="(tData, index) in data" :key="tData" v-show="!tData.length == 0">
    <div
      @click="toggleAccordion(index)" 
      class="flex w-full justify-between bg-[#E8F1FF]/80 backdrop-blur-lg py-4 px-4 cursor-pointer  rounded"
      :class="{'active': isOpen[index]}">
      <div nome="Header" class="acc-header">
        <div v-if="tData[0].stazione > 0" class="text-xl font-semibold w-90">
              <span>Stazione N: {{tData[0].stazione}}</span>
        </div>
        <div v-if="tData[0].stazione == 0" class="text-xl font-semibold">
              <span>E.V. non assegnate</span>
        </div>
        <div v-if="tData[0].stazione > 0" class="name-bar w-90 bg-[#DDE8FA]/60 backdrop-blur-lg py-2 px-4">
          <span class="font-semibold text-left">Nome</span>
          <input v-model="tData[0].group" class="flex items-center py-2 border-t-2 border-[#EFF5E4]" type="text" name="NomeStazione" placeholder="Digita Nome Stazione" size="25" maxlength="15">
        </div>
      </div>
      <button class="flex items-center space-x-3" :aria-expanded="isOpen[index]" :aria-controls="`collapse`">
        <svg class="w-3 transition-all duration-200 transform" :class="{
            'rotate-180': isOpen[index],
            'rotate-0': !isOpen[index],
          }"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 10"
          aria-hidden="true"
        >
          <path
            d="M15 1.2l-7 7-7-7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    
    <div v-for="valve in tData" :key="valve"  class="flex w-full justify-between bg-[#DDE8FA]/60 backdrop-blur-lg py-2 px-4">
      <span class="text-sm font-semibold">EV N<sup>o</sup> : {{valve.id}} Serial : {{valve.ev}} ({{$t('master')}} No: {{valve.masterv}} - {{$t('pump')}} No: {{valve.pompa}})</span>
    </div>

    <div v-show="isOpen[index]" :id="`collapse`" class="flex w-full flex-col justify-between gap-10 bg-[#DDE8FA]/60 backdrop-blur-lg py-2 px-4">
      <form v-if="tData[0].stazione > 0" v-for="valve in tData" :key="valve" class="edit-form " @submit.prevent="editConfiguration(valve)">
        <div class="flex w-full py-2 justify-center items-center text-xl font-bold bg-[#E6EDCB]">
          <span>{{$t('configure')}}</span>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('ev')}} No:</span>
          <!--:value="valve.id"-->
          <select  class="dropdown" v-model = "valve.id"  >
            <option value="0">OFF</option>
            <option 
              v-for="option in props.solenoidList" :key="option"
              class="nav"
              @click="onClick(option.index)"
              :value="option.index"
              :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('pump')}} No:</span>
          <select  class="dropdown" v-model = "valve.pompa" :value="valve.pompa">
            <option value="0">OFF</option>
            <option v-for="option in props.pumpList" :key="option" class="nav"  @click="onClick(option.index)" :value="option.index" :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('master')}} No:</span>
          <select  class="dropdown" v-model = "valve.masterv" :value="valve.masterv">
            <option value="0">OFF</option>
            <option 
              v-for="option in props.masterList" :key="option"
              class="nav"
              @click="onClick(option.index)"
              :value="option.index"
              :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="w-20 flex gap-4">
          <IveButton type="submit" class="filled__blue" :label="$t('refresh')" :loading="postControlIsLoading"/>
          <IveButton type="button" class="filled" :label="$t('reset')" :loading="postControlIsLoading" @click="restoreConfiguration(valve)"/>
          <IveButton type="button" class="filled__red" :label="$t('remove')" :loading="postControlIsLoading" @click="removeConfiguration(valve)"/>
        </div>
      </form>
      <form class="add-form" @submit.prevent="addConfiguration(tData,addFormData)">
        <div class="flex w-full py-2 justify-center items-center text-xl font-bold bg-[#E6EDCB]">
          <span v-if="tData[0].stazione > 0">{{$t('addConfiguration')}}</span>
          <span v-if="tData[0].stazione == 0">{{$t('insertNewStation')}}</span>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('ev')}} No:</span>
          <!--:value="addFormData.evNumber"-->
          <select  class="dropdown" v-model="addFormData.evNumber" >
            <option value="0">OFF</option>
            <option 
              v-for="option in props.solenoidList" :key="option"
              class="nav"
              @click="onClick(option.index)"
              :value="option.index"
              :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('pump')}} No:</span>
          <select  class="dropdown" v-model="addFormData.pump" :value="addFormData.pump">
            <option value="0">OFF</option>
            <option 
              v-for="option in props.pumpList" :key="option"
              class="nav"
              @click="onClick(option.index)"
              :value="option.index"
              :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="flex items-center py-2 border-t-2 border-[#EFF5E4]">
          <span class="font-semibold w-[360px] text-left">{{$t('master')}} No:</span>
          <select  class="dropdown" v-model="addFormData.mv" :value="addFormData.mv">
            <option value="0">OFF</option>
            <option 
              v-for="option in props.masterList" :key="option"
              class="nav"
              @click="onClick(option.index)"
              :value="option.index"
              :id="option.index">{{option.index}} : {{option.title}}</option>
          </select>
        </div>
        <div class="w-20">
          <IveButton type="submit" class="filled__blue"  :label="$t('save')" :loading="postControlIsLoading" />
        </div>
      </form>
      <slot name="content" ></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import IveButton from '@/components/button/BaseButton.vue'
import { useDataStore } from '@/stores/DataStore';
import { storeToRefs } from 'pinia'

//props
const props = defineProps({
   id: String,
   solenoidList: null,
   pumpList: null,
   masterList: null,
   masterValue: null,
   pumpValue: null,
   data: null,
   deviceCode: null
 })

//  State
const dataStore = useDataStore()
const { postControlIsLoading } = storeToRefs(useDataStore())

const postData = ref({
  command: 'EVCONFIG',
  payload: {}
})

const postGroupData = ref({
  command: 'GROUPCONFIG',
  payload: {}
})

const addFormData = ref({
  evNumber: 0,
  pump: 0,
  mv: 0
})

function toggleAccordion(index) {
  isOpen.value[index] = !isOpen.value[index]
}

function editConfiguration(valve) {
  console.log(valve)
  postData.value.payload = {}
  var localId=1;
  var localStation=0;

  if(valve.id==0) {
     localId=1;
     
  }else{
    localId=valve.id;
    
  }

  localStation=Number(valve.stazione);

  //if(localStation==0) localStation=1;

  postData.value.payload['S' + (2002 + ((localId - 1) * 6))] = localStation
  postData.value.payload['S' + (2003 + ((localId - 1) * 6))] = valve.pompa
  postData.value.payload['S' + (2004 + ((localId- 1) * 6))] = valve.masterv
  
  console.log("Edit Configuration: ", postData.value)
  dataStore.postControl(props.deviceCode,postData.value)
}


function restoreConfiguration(valve) {
  console.log(valve)
  postData.value.payload = {}
  postData.value.payload['S' + (2002 + ((valve.id - 1) * 6))] = valve.id
  postData.value.payload['S' + (2003 + ((valve.id - 1) * 6))] = valve.pompa
  postData.value.payload['S' + (2004 + ((valve.id - 1) * 6))] = valve.masterv
  console.log("Restore Configuration: ", postData.value)
  dataStore.postControl(props.deviceCode,postData.value)
}

function removeConfiguration(valve) {
  console.log(valve)
  postData.value.payload = {}
  
  if(valve.id==0) return;

  postData.value.payload['S' + (2000 + ((valve.id - 1) * 6))] = valve.ev
  postData.value.payload['S' + (2002 + ((valve.id - 1) * 6))] = 0
  postData.value.payload['S' + (2003 + ((valve.id - 1) * 6))] = 0
  postData.value.payload['S' + (2004 + ((valve.id - 1) * 6))] = 0
  postData.value.payload['S' + (2005 + ((valve.id - 1) * 6))] = 0
  console.log("Remove valve: ", postData.value)
  dataStore.postControl(props.deviceCode,postData.value)
  
}


function setGroupNameOnEVs(StazioneId, GroupName, groupData){      
    for(var i=0; i < groupData.length; i++){
        //Assegna il valori di tempo e status tutti gli elementi successivi
            groupData[i].group=GroupName;
            groupData[i].stazione=StazioneId;
          }
        ///////////////////////////////////////////////////////////////////////////////
        
    return;
}

function searchUnassignedGroup(){
  var dataArray=Object.entries(props.data);
  for(var y=1; y < 96; y++){
    var found=true;
    
    for(var x=1; x<dataArray.length; x++){
      console.log(dataArray[x][1][0])
      if(Number(dataArray[x][1][0].stazione) == y){
        found=false;
        break;
      }
    }
    if(found==true) return y;
  }

  return -1;
}

function insertUnassignedEv(formData){
  var stationID = searchUnassignedGroup()
  postData.value.payload = {}
  postGroupData.value.payload = {}
  var groupName="G."+String(stationID).padStart(2,"0")

  var localId=1;
  localId=formData.evNumber
  postData.value.payload['S' + (2002 + ((localId - 1) * 6))] = stationID
  postData.value.payload['S' + (2003 + ((localId - 1) * 6))] = formData.pump
  postData.value.payload['S' + (2004 + ((localId - 1) * 6))] = formData.mv

  postGroupData.value.payload['S' + Number(6000 + stationID - 1)] = groupName
  
  console.log("AddConfiguration: ",postData.value)
  dataStore.postControl(props.deviceCode,postData.value)
  dataStore.postControl(props.deviceCode,postGroupData.value)

}

function addConfiguration(tData, formData) {
  console.log(tData)
  console.log(formData)
  var stationID=Number(tData[0].stazione)

  var groupName=String(tData[0].group)

  if(stationID == 0){
    insertUnassignedEv(formData)
    /*stationID = Object.keys(props.data).length
    groupName="G."+String(stationID).padStart(2,"0")*/
    return;
  }

  postData.value.payload = {}
  postGroupData.value.payload = {}

  var localId=1;

  if(formData.evNumber==0) {
     localId=1;
     //localStation=0;
  }else{
    localId=formData.evNumber;
    //localStation=valve.stazione;
  }

  setGroupNameOnEVs(stationID, groupName, Object.values(tData))
  
  //Cicla sulle EV esistenti
  Object.values(tData).forEach(function(EV){
    localId=EV.id
    postData.value.payload['S' + (2002 + ((localId - 1) * 6))] = stationID
    postData.value.payload['S' + (2003 + ((localId - 1) * 6))] = EV.pompa
    postData.value.payload['S' + (2004 + ((localId - 1) * 6))] = EV.masterv
  })

  localId=formData.evNumber
  postData.value.payload['S' + (2002 + ((localId - 1) * 6))] = stationID
  postData.value.payload['S' + (2003 + ((localId - 1) * 6))] = formData.pump
  postData.value.payload['S' + (2004 + ((localId - 1) * 6))] = formData.mv

  
  //if(stationID==0) stationID=1;

  postGroupData.value.payload['S' + Number(6000 + stationID - 1)] = groupName
  
  console.log("AddConfiguration: ",postData.value)
  dataStore.postControl(props.deviceCode,postData.value)
  dataStore.postControl(props.deviceCode,postGroupData.value)
}

const isOpen = ref([])

for (let i = 0; i < props.data.length; i++) {
  isOpen[i].value = false
}

</script>

<style scoped>


input:checked + .switch {
  @apply bg-[#71D451] text-white
}

.switch {
  @apply cursor-pointer font-semibold w-28 text-left py-2 bg-white rounded px-2
}

.active {
  @apply text-[#3B83F6] border-[4px] border-[#3B83F6]/60
}

.dropdown {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
}

.acc-header{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
}

.w-90{
  width: 90%;
  text-align: left;
}

.name-bar{
  display:flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>