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
      <img class="w-40" src="@/assets/parametri_fertirrigazione.png">
    </div>
    <div class="content">
      <div class="header">
        <IdroTitle title="Programma" />
        <DropdownNav :tabs="tabs" @clicked= "changeNavigation" />
        <h2 class="font-bold text-xl">{{title}}</h2>
      </div>
      <div class="main">
        <component :is="comp" :id="deviceId"></component>
      </div>
    </div>
  </div>
</template>
  
<script>
import DropdownNav from '@/components/tab/dropdownNav.vue';
import Programma0 from '@/components/parametriTable/Programma1.vue';
import Programma1 from '@/components/parametriTable/Programma2.vue';
import Programma2 from '@/components/parametriTable/Programma3.vue';
import Programma3 from '@/components/parametriTable/Programma4.vue';
import Programma4 from '@/components/parametriTable/Programma5.vue';
import Programma5 from '@/components/parametriTable/Programma6.vue';
import Programma6 from '@/components/parametriTable/Programma7.vue';
import Programma7 from '@/components/parametriTable/Programma8.vue';
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
      Programma0,
      Programma1,
      Programma2,
      Programma3,
      Programma4,
      Programma5,
      Programma6,
      Programma7,
      DropdownNav,
      deviceCard
  },
    props:[
      'id'
    ],
    setup(props, { emit }) {
      const deviceId = props.id
      const comp = ref('Programma0')
      const isActive = ref(true)
      const deviceStore = useDevicesStore()
      const { isLoading } = storeToRefs(useDevicesStore())
      const tabs = ref([
      {
        title: '1',
        value: 'Programma0'
      },
      {
        title: '2',
        value: 'Programma1'
      },
      {
        title: '3',
        value: 'Programma3'
      },
      {
        title: '4',
        value: 'Programma4'
      },
      {
        title: '5',
        value: 'Programma5'
      },
      {
        title: '6',
        value: 'Programma6'
      },
      {
        title: '7',
        value: 'Programma7'
      },
      {
        title: '8',
        value: 'Programma8'
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
        comp.value = "Programma" + navigation
      }
      const title = ref()
  
      onMounted(async() => {
        await deviceStore.loadDevice(props.id)
        title.value = 'Idrosat:' + deviceStore.deviceData.name
      })

      const newData = computed(() => {
        return [deviceStore.deviceData]
      })
  
      return {
        comp, newData, deviceStore, tabs, changeNavigation, deviceId, isLoading, title
      }
    }
  
  }
  </script>
  
  <style scoped>
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


/*   
input[type=checkbox], input[type=radio], input[type=range]{
  @apply cursor-pointer
}

input[type=range]{
  @apply w-full
}
.frame {
  @apply  flex flex-col
          bg-[#DDE8FA]/60 backdrop-blur-lg
          w-full mb-10
}
.frame-header {
  @apply
          flex border-b-2 border-[#3a3a3e] w-full
          py-3 px-5
}

  
.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}

input:disabled, select:disabled {
    @apply cursor-default animate-pulse
} 
  
  
.field-wrapper {
  @apply flex py-2 px-4 w-full justify-between items-center
}

.slider-wrapper {
  @apply flex flex-col
}

.table-container {
    @apply 
      w-full
      relative
      h-[300px] sm:h-full
      overflow-auto sm:overflow-visible
} */
  
  </style>