<template>
<div class="ricette-container">
  <sidebar 
  :backOn="true" 
  :noSocial="true"
  />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
    <div class="xs-icon-card">
      <img src="@/assets/ricette_fertirrigazione.png">
      <p>{{ $t('fertigationRecipes') }}</p>
    </div>
  </div>
  <div class="main">
    <IdroTitle :title="$t('program')" />
    <div class="content">
      <Tab :tabs="tabs" @clicked= "changeNavigation" />
      <!-- <keep-alive> -->
        <component :is="comp" :id="deviceId"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</div>
</template>

<script>
import Tab from '@/components/tab/Tab.vue';
import RicetteTable1 from '@/components/table/RicetteTable1.vue';
import RicetteTable2 from '@/components/table/RicetteTable2.vue';
import RicetteTable3 from '@/components/table/RicetteTable3.vue';
import RicetteTable4 from '@/components/table/RicetteTable4.vue';
import { useDevicesStore } from '@/stores/DevicesStore';
import { ref } from '@vue/reactivity';
import { computed, defineAsyncComponent, onMounted } from '@vue/runtime-core';

//asynchronus component
const deviceCard = defineAsyncComponent(
  () => import('@/components/cards/deviceCard.vue'),
)

export default {
  components:{
    RicetteTable1,
    RicetteTable2,
    RicetteTable3,
    RicetteTable4,
    Tab,
    deviceCard
},
  props:[
    'id'
  ],
  setup(props, { emit }) {
    const deviceId = props.id
    const comp = ref('RicetteTable1')
    const isActive = ref(true)
    const deviceStore = useDevicesStore()
    const tabs = ref([
      {
        title: 'Ricette 1',
        value: 'RicetteTable1'
      },
      {
        title: 'Ricette 2',
        value: 'RicetteTable2'
      },
      {
        title: 'Ricette 3',
        value: 'RicetteTable3'
      },
      {
        title: 'Ricette 4',
        value: 'RicetteTable4'
      }
    ])
      
      
    function changeNavigation(navigation) {
      var subNavs = document.getElementsByClassName("nav")
      for (var i of subNavs) {
        i.classList.remove("active");
      }
      console.log(navigation)
      event.target.className += " active"
      comp.value = navigation
    }

    onMounted(async() => {
      var element = document.getElementById("RicetteTable1");
      element.classList.add("active");

      await deviceStore.loadDevice(props.id)
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

.ricette-container {
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