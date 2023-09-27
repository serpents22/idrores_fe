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
      <img src="@/assets/contatore_agitatore_fertirrigazione.png">
      <p>{{ $t('fertigationShaking') }}</p>
    </div>
    </div>
    <div class="content">
      <IdroTitle title="Programma" />
      <div class="main">
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
  import ContatoreTable1 from '@/components/table/ContatoreTable1.vue';
  import ContatoreTable2 from '@/components/table/ContatoreTable2.vue';
  import ContatoreTable3 from '@/components/table/ContatoreTable3.vue';
  import ContatoreTable4 from '@/components/table/ContatoreTable4.vue';
  import { useDevicesStore } from '@/stores/DevicesStore';
  import { ref } from '@vue/reactivity';
  import { computed, defineAsyncComponent, onMounted } from '@vue/runtime-core';
  import { storeToRefs } from 'pinia';
  import { useI18n } from 'vue-i18n';
  
  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  
  export default {
    components:{
      ContatoreTable1,
      ContatoreTable2,
      ContatoreTable3,
      ContatoreTable4,
      Tab,
      deviceCard
  },
    props:[
      'id'
    ],
    setup(props, { emit }) {
      const { t } = useI18n()
      const deviceId = props.id
      const comp = ref('ContatoreTable1')
      const isActive = ref(true)
      const deviceStore = useDevicesStore()
      const { isLoading } = storeToRefs(useDevicesStore())
      const tabs = ref([
      {
        title: t('counter') + ' 1',
        value: 'ContatoreTable1'
      },
      {
        title: t('counter') + ' 2',
        value: 'ContatoreTable2'
      },
      {
        title: t('counter') + ' 3',
        value: 'ContatoreTable3'
      },
      {
        title: t('counter') + ' 4',
        value: 'ContatoreTable4'
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
        var element = document.getElementById('ContatoreTable1');
        element.classList.add("active");
  
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