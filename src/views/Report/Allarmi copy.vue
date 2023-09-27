<template>
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
      <div class="date-filter">
        <div class="start-date">
          <label for="start-date">Dal</label>
          <input id="start-date" type="date" v-model="startDate ">
        </div>
        <div class="end-date">
          <label for="end-date">AL</label>
          <input id="end-date" type="date" v-model="endDate ">
        </div>
        <div class="w-20">
          <IveButton type="submit" class="filled__blue" label="Visualizza" />
        </div>
      </div>
      <vue-good-table
      :columns="columns"
      :rows="rows"
      :row-style-class="rowStyleClassFn"
      :pagination-options="{
       enabled: true,
        mode: 'records'
      }"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table',
      }"
      >
    </vue-good-table>
    </div>
  </div>
</template>

<script setup>
  import { useReportStore } from '@/stores/ReportStore'
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
  import IveButton from '@/components/button/BaseButton.vue'

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
  const reportStore = useReportStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const { reportData, totalData } = storeToRefs(useReportStore())

  const title = ref()
  
  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await reportStore.loadReport()
  })

  const newData = computed(() => {
      return [devicesStore.deviceData]
  })

  //Table Data
  const columns = [
        {
          label: 'Tipo Alarme',
          field: 'tipoAlarme',
          width: '200px'
        },
        {
          label: 'Programma Numero',
          field: 'programmaNumero',
          type: 'number',
        },
        {
          label: 'Stazione Numero',
          field: 'stazioneNumero',
          type: 'number',
        },
        {
          label: 'Anzione Intrapresa',
          field: 'anzioneIntrepresa',
        },
        {
          label: 'Date',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        }
  ]

  const rows = [
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 2,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 24,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 56,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 42,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 74,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 3,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 64,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 21,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 464,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"Nessun allarme", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
        { id:1, tipoAlarme:"flusso acqua", programmaNumero: 20,stazioneNumero: 20, anzioneIntrepresa: 300,createdAt: '2011-10-31'},
  ]

  function rowStyleClassFn(row) {
    return row.programmaNumero == 20 ? 'green' : 'red';
  }

</script>

<style scoped>
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
          flex flex-col justify-center items-center
          mt-[20px] gap-4
}

.date-filter {
  @apply flex gap-2
}

.start-date, .end-date {
  @apply flex gap-2 justify-center items-center
}
.start-date label, .end-date label {
  @apply text-white
}

</style>