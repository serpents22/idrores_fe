<template>
  <div class="flussi-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData"
      :id="props.id" />
    <img class="w-40" src="@/assets/flussi_nominali.png">
  </div>
  <div class="generali-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <form @submit.prevent="test" class="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>ev</span>
              </th>
              <th>
                <span>st{{$t('action')}}</span>
              </th>
              <th>
                <span>pompa</span>
              </th>
              <th>
                <span>master v.</span>
              </th>
              <th>
                <input @change="selectAll" v-model="allSelected" type="checkbox" id="auto">
                <span>Auto</span>
              </th>
              <th>
                <span>Valori</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tData in tableData" :key="tData.ev">
              <td>
                <p>{{ tData.ev }}</p>
              </td>
              <td>
                <p>{{ tData.stazione }}</p>
              </td>
              <td>
                <p>{{ tData.pompa }}</p>
              </td>
              <td>
                <p>{{ tData.masterv }}</p>
              </td>
              <td>
                <input type="checkbox" v-model="evs" :value="tData.ev" @change='updateSelectAll' >
              </td>
              <td>
                <div class="flex gap-2 items-center">
                  <input v-model="tData.valori" type="number" id="valori">
                  <label for="valori">M<sup>3</sup>/H</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-wrapper">
          <MyButton type="submit" class="filled"  :label="$t('save')" :loading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
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
  const devicesStore = useDevicesStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const title = ref()

  
  
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
  })


  //Data Structure

  const tableData = ref([
    {ev: 1, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 2, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 3, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 4, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 5, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 6, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 7, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 8, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
    {ev: 9, stazione: 5, pompa: 1, masterv: 1, auto: false, valori: 20},
  ])
  const allSelected = ref(false)
  const evs = ref([])

  //Checkbox Function
  function selectAll() {
    evs.value = []
    if(allSelected.value) {
      for(let key in tableData.value) {
        evs.value.push(tableData.value[key].ev)
      }
    }
  }

  function updateSelectAll() {
    if(evs.value.length == tableData.value.length){
        allSelected.value = true;
      }else{
        allSelected.value = false;
      }
  }


</script>

<style scoped>

.flussi-container {
  @apply 
    relative flex flex-col 
    px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
    
}
.generali-container {
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


input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded w-20 h-8
}

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}


/* Table Style */
.table-container {
  @apply 
    h-[300px] sm:h-full
    overflow-auto sm:overflow-visible
}
.table-container table {
  @apply  bg-[#DDE8FA]/60 backdrop-blur-lg
          w-[800px] mb-10
}

.table-container thead {
  @apply border-b-2 border-[#3a3a3e]
}

.table-container th {
  @apply min-w-[100px] font-semibold py-3 px-5
}
.table-container td {
  @apply min-w-[100px] py-3 px-5
}

.table-container tr {
  @apply text-left
} 
</style>