<template>
  <loading :loading="isLoading" />
  <sidebar 
  :backOn="true" 
  :noSocial="true"
  />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData"
      :id="props.id" />
    <div class="xs-icon-card">
      <img src="@/assets/sensor.png">
      <p>{{ $t('sensor') }}</p>
    </div>
  </div>
  <div class="dashboard-container">
    <IdroTitle :title="title"/>
    <div class="content">
      <div class="row">
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/radiazione_solare.png">
            <p>{{ $t('solarIntensity') }}</p>
          </div>
          <span class="value-text">{{sensorData.radiazione}} <span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">W/m<sup>2</sup></span></span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/Temperatura.png">
            <p>{{ $t('temperature') }}</p>
          </div>
          <span class="value-text">{{sensorData.temperatura}}</span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/sensore_pioggia.png">
            <p>{{ $t('rainSensor') }}</p>
          </div>
          <span class="value-text">{{sensorData.pioggia}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">mm/m<sup>2</sup></span></span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/direzionee_intensitve.png">
            <p>{{ $t('windDirection') }}</p>
          </div>
          <span class="value-text">{{sensorData.direzione}} - {{sensorData.direzione2}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium px-2">Km/h</span></span>
        </div>
      </div>

      <div class="row">
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/segnalesim.png">
            <p>{{ $t('networkSignal') }}</p>
          </div>
          <span class="value-text">{{sensorData.segnalesim}}</span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/portarta.png">
            <p>{{ $t('flowCounter') }}</p>
          </div>
          <span class="value-text">{{sensorData.portarta}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">m<sup>3</sup></span></span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/lavaggio.png">
            <p>{{ $t('systemPressure') }}</p>
          </div>
          <span class="value-text">{{sensorData.lavaggio}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">Bar</span></span>
        </div>
      </div>

      <div class="row">
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/umiditaria.png">
            <p>{{ $t('airHumidity') }}</p>
          </div>
          <span class="value-text">{{sensorData.umiditaria}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">%</span></span>
        </div>
        <div class="sm-icon-card">
          <router-link :to="{name: 'RhView'}"><img src="@/assets/umiditterreno.png"></router-link>
          <p>{{ $t('soilMoisture') }}</p>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/Conducibilit.png">
            <p>{{ $t('conductivity') }}</p>
          </div>
          <span class="value-text">{{sensorData.conducibility}}<span class="text-[8px] sm:text-sm md:text-base lg:text-[20px] font-medium pl-2">&#181;S</span></span>
        </div>
        <div>
          <div class="sm-icon-card">
            <img src="@/assets/ph.png">
            <p>{{ $t('ph') }}</p>
          </div>
          <span class="value-text">{{sensorData.ph}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { useDataStore } from '@/stores/DataStore';
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref, onBeforeMount, onUnmounted } from '@vue/runtime-core'

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

  const newData = computed(() => {
      return [devicesStore.deviceData]
  })
  
  //Sensor Data
  const sensorData = ref({})

  //data params
  const meteoParams = ref({
    fields: 'M7,M6,M4,M8,M31,M12,M23,M32,M5',
    measurement: 'METEOSTAT',
    device_code: null
  })
  const satParams = ref({
    fields: 'S130,S131,S4',
    measurement: 'SATSTAT',
    device_code: null
  })

  const title = ref()
  async function fillTableData() {
    await dataStore.getLastMeteoStat(meteoParams.value)
    await dataStore.getLastSatStat(satParams.value)
    sensorData.value = []
    let newObj = {}
    if (dataStore.meteoStat !== undefined ) {
      newObj.radiazione = dataStore.meteoStat.hasOwnProperty('M7') ? dataStore.meteoStat.M7 : '-',
      newObj.temperatura = dataStore.meteoStat.hasOwnProperty('M6') ? dataStore.meteoStat.M6 : '-',
      newObj.pioggia = dataStore.meteoStat.hasOwnProperty('M4') ? dataStore.meteoStat.M4 : '-',
      newObj.direzione = dataStore.meteoStat.hasOwnProperty('M31') ? dataStore.meteoStat.M31 : '-',
      newObj.direzione2 = dataStore.meteoStat.hasOwnProperty('M8') ? dataStore.meteoStat.M8 : '-',
      newObj.segnalesim = dataStore.meteoStat.hasOwnProperty('M12') ? dataStore.meteoStat.M12 : '-',
      newObj.umiditaria = dataStore.meteoStat.hasOwnProperty('M5') ? dataStore.meteoStat.M5 : '-',
      newObj.lavaggio = dataStore.meteoStat.hasOwnProperty('M23') ? dataStore.meteoStat.M23 : '-'
    } else {
      newObj.radiazione = '-',
      newObj.temperatura = '-',
      newObj.pioggia = '-',
      newObj.direzione = '-',
      newObj.direzione2 = '-',
      newObj.segnalesim = '-',
      newObj.umiditaria = '-',
      newObj.lavaggio = '-'
    }

    if (dataStore.satStat !== undefined ) {
      newObj.portarta = dataStore.satStat.hasOwnProperty('S4') ? dataStore.satStat.S4 : '-',
      newObj.conducibility = dataStore.satStat.hasOwnProperty('S130') ? dataStore.satStat.S130 : '-',
      newObj.ph = dataStore.satStat.hasOwnProperty('S131') ? dataStore.satStat.S131 : '-'
    } else {
      newObj.portarta = '-',
      newObj.conducibility = '-',
      newObj.ph = '-'
    }
    sensorData.value = newObj
  }

  let dataInterval = null
  
  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    meteoParams.value.device_code = devicesStore.deviceData.code
    satParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    fillTableData()
  }) 

  onMounted( () => {
    dataInterval = setInterval(fillTableData, 5000)
  })

  onUnmounted(() => {
    clearInterval(dataInterval)
  })





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
    flex flex-col justify-center 
    gap-[10px] sm:gap-[30px] md:gap-[40px] lg:gap-[40px] xl:gap-[40px]
    transition-all ease-in-out duration-300
}
.content .value-text {
  @apply text-[10px] sm:text-[20px] md:text-[22px] lg:text-[26px]  font-semibold text-[#191970] 
}

.row {
  @apply 
    flex flex-wrap
    w-[360px] sm:w-[440px] md:w-[880px]
    gap-[20px] sm:gap-[20px] md:gap-[20px] lg:gap-[40px] xl:gap-[40px]
    justify-center
    transition-all ease-in-out duration-300
}
span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

span h2 {
  @apply text-xs font-light
}

span p {
  @apply text-base font-normal
}

</style>