<template>
<div class="stato-idrosat-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/stato_idrosat.png">
      <p>{{ $t('idrosatStatus') }}</p>
    </div>
  </div>
  <div class="content">
    <IdroTitle :title="title"/>
    <div class="main">
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">Idrosat</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.name}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('idSerial') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.code}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('fwVersion') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.firmwareVersion}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('hardwareVersion') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.hardwareVersion}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">MAC Address</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.macAddress}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('counter') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.contatore}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('stations') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.station}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('programs') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.prog}}</label>
        </span>
      </div>
      <div class="field-wrapper">
        <span class="w-full bg-[#00B0F0] text-white px-5 py-3 text-xl">
          <label for="nome">{{ $t('pressure') }}</label>
        </span>
        <span class="w-full bg-white text-center px-5 py-3 text-xl">
          <label for="nome">{{devicesStore.deviceData.pressione}}</label>
        </span>
      </div>

      <div class="pompa-wrapper">
        <h2 class="font-semibold text-[24px]">{{ $t('instantConsumption') }} M3/H o L/H</h2>
        <div class="pompa">
          <div class="flex flex-col gap-4 items-center" v-for="(pompa,index) in istantaneo" :key="pompa">
            <span class="text-[24px] font-semibold">{{ $t('pump') }} {{index+1}}</span>
            <span>
              <Counter :dataNumber="pompa"/>
            </span>
          </div>
        </div>
        <h2 class="font-semibold text-[24px] mt-20">{{ $t('totalConsumption') }} M3</h2>
        <div class="pompa">
          <div class="flex flex-col gap-4 items-center" v-for="(pompa,index) in totale" :key="pompa">
            <span class="text-[24px] font-semibold">{{ $t('pump') }} {{index+1}}</span>
            <span>
              <Counter :dataNumber="pompa"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</template>

<script setup>
import { useDevicesStore } from '@/stores/DevicesStore'
import { useDataStore } from '@/stores/DataStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,computed,onMounted,ref, onBeforeMount, onUnmounted } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import Counter from '@/components/counter/Counter.vue'

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
  
  const title = ref()
  const istantaneo = ref([])
  const totale = ref([])
  
  const satStatParams = ref({
    fields: 'S468,S470,S472,S474,S476,S478,S480,S482,S484,S486,S488,S490,S492,S494,S496,S498',
    measurement: 'SATSTAT',
    device_code: null
  })

  async function fillIstantaneoData(){
    await dataStore.getLastSatStat(satStatParams.value)
    istantaneo.value = []
    let MINIMUM_DIGIT = 6
    let pompa1 = String(dataStore.satStat.S468)
    while (pompa1.length < MINIMUM_DIGIT) {
      pompa1 = '0' + pompa1
    }
    istantaneo.value.push(pompa1)
  }

  async function fillTotaleData(){
    await dataStore.getLastSatStat(satStatParams.value)
    totale.value = []
    let MINIMUM_DIGIT = 6

    let pompa1 = String(dataStore.satStat.S484)
    while (pompa1.length < MINIMUM_DIGIT) {
      pompa1 = '0' + pompa1
    }
    totale.value.push(pompa1)
  }

  let getLastDataInterval = null

  function getLastData() {
    console.log('fetching new data')
    fillIstantaneoData()
    fillTotaleData()
  }

  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    satStatParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat: ' + devicesStore.deviceData.name
    fillIstantaneoData()
    fillTotaleData()
  })

  onMounted(() => {
    getLastDataInterval = setInterval(getLastData,5000)
  })

  onUnmounted(()=> {
    clearInterval(getLastDataInterval)
  })


</script>

<style scoped>
.stato-idrosat-container {
    @apply 
      relative flex flex-col 
      px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
      
  }
  .main {
    @apply 
      flex flex-col w-full justify-center items-center relative
      /*h-[300px] sm:h-full*//**Rimosso per permettere la visualizzazione su dispositivo mobile in verticale */
      overflow-auto sm:overflow-visible
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
  
.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}

.field-wrapper {
  @apply  sm:flex-row w-full justify-center flex flex-col
}

.content img {
  @apply w-40
}

.pompa-wrapper {
@apply
  mt-20 items-center
  flex flex-col gap-2
}
.pompa {
  @apply 
    flex flex-wrap justify-center 
    w-full gap-1
    sm:gap-6
    md:gap-8
    lg:gap-10
    transition-all ease-in-out delay-300
    py-10
    border-2 border-[#153462] rounded-[60px]
}


</style>