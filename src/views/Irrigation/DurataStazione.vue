<template>
<div class="durata-container">
  <sidebar 
  :backOn="true" 
  :noSocial="true"
  />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/durata_stazioni.png">
      <p>{{ $t('stationTimes') }}</p>
    </div>
  </div>
  <div class="content">
    <!-- <IdroTitle title="Programma" /> -->
    <IdroTitle :title="$t('stationsDuration')" />
    <!--<div class="main">
      <Tab :tabs="tabs" @clicked= "changeNavigation" />
      
        <component :is="comp" :id="deviceId"></component>
      
    </div>-->
    <component :is="comp" :id="deviceId"></component>
  </div>
</div>
</template>

<script>
import Tab from '@/components/tab/Tab.vue';
import DurataTable1 from '@/components/table/DurataTable1.vue';
import DurataTable2 from '@/components/table/DurataTable2.vue';
import DurataTable3 from '@/components/table/DurataTable3.vue';
import { useDevicesStore } from '@/stores/DevicesStore';
import { ref } from '@vue/reactivity';
import { computed, defineAsyncComponent, onMounted } from '@vue/runtime-core';
import { storeToRefs } from 'pinia';


//asynchronus component
const deviceCard = defineAsyncComponent(
  () => import('@/components/cards/deviceCard.vue'),
)

export default {
  components:{
    DurataTable1,
    DurataTable2,
    DurataTable3,
    Tab,
    deviceCard
},
  props:[
    'id'
  ],
  setup(props, { emit }) {
    const deviceId = props.id
    const comp = ref('DurataTable1')
    const isActive = ref(true)
    const deviceStore = useDevicesStore()
    const { isLoading } = storeToRefs(useDevicesStore())
    const tabs = ref([
      {
        title: 'Minuti/Secondi',
        value: 'DurataTable1'
      },
      {
        title: 'Ore/Minuti',
        value: 'DurataTable2'
      },
      {
        title: 'Volume',
        value: 'DurataTable3'
      }
    ])
      
      
    function changeNavigation(navigation) {
      var subNavs = document.getElementsByClassName("nav")
      console.log(subNavs)
      for (var i of subNavs) {
        i.classList.remove("active");
      }
      console.log(navigation)
      event.target.className += " active"
      comp.value = navigation
    }
    const title = ref()

    onMounted(async() => {
      /*var element = document.getElementById("Minuti/Secondi");
      element.classList.add("active");*/

      await deviceStore.loadDevice(props.id)
      title.value = 'Idrosat:' + deviceStore.deviceData.name
    })

    const newData = computed(() => {
      return [deviceStore.deviceData]
    })

    return {
      comp, newData, deviceStore, tabs, changeNavigation, deviceId
    }
  }

}
</script>

<style scoped>
.durata-container {
  @apply 
    relative flex flex-col 
    px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
}
.main {
  @apply flex flex-col w-full justify-center items-center relative gap-8
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
  @apply pl-2 rounded w-10 md:w-20 py-2
}

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}

</style>