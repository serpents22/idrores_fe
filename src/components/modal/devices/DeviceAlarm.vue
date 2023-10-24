<template>
  <div>
  <alert 
    :message ="alarmStore.status.message"
    :modalActive="modalActive"
    :isError="alarmStore.status.isError"
     @close="closeNotification" />
     <transition name="fade">
       <div class="modal" v-show="isOpen" >
        <transition name="drop-in">
          <div class="modal-inner" v-show="isOpen" ref="target" >
            <div class="modal-content">
            <h1 class="title">{{title}}</h1>
            <div class="mb-8 overflow-y-scroll h-80 text-[8px] sm:text-base">
              <span class="grid grid-cols-5 text-start text-black mb-4 font-semibold">
                <p class="col-span-1 text-center">Code</p>
                <p class="col-span-1 text-center">{{ $t('program') }}</p>
                <p class="col-span-1 text-center">{{ $t('station') }}</p>
                <p class="col-span-2">Description</p>
              </span>
              <span v-for="alarm in alarmsList" class="grid grid-cols-5 text-start text-black mb-2 border-b border-black">
                <p class="col-span-1 text-center">{{ alarm.code }}</p>
                <p class="col-span-1 text-center">{{ alarm.program }}</p>
                <p class="col-span-1 text-center">{{ alarm.station }}</p>
                <p class="col-span-2 mb-2">{{ alarm.description }}</p>
              </span>
            </div>
            <BaseButton type="button" class="outlined"  :label="resetLabel" @click="onSubmit"/>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  </div>
</template>

  
<script setup>
import BaseButton from '@/components/button/BaseButton.vue'
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAlarmStore } from '@/stores/alarm/AlarmStore'
 
  const props = defineProps({
      isOpen: Boolean,
      title: String,
      id: String,
  })
  const alarmStore = useAlarmStore()
  const alarmsList = computed(() => {
    return alarmStore.alarmsList.filter(item => item.hasOwnProperty('code'));
  })
  const modalActive = ref(false)
  const resetLabel = ref('RESET')

  const resetAlarmCommand = {
    command : "SATSTAT",
    payload : {
      S15: 0
    }
  }
  const onSubmit = async () => {
    await alarmStore.resetAlarmList(props.id, resetAlarmCommand)
    modalActive.value = true
    setTimeout(closeNotification, 3000)
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close'])
  
  const form = ref(null)
  const target = ref(null)

  onClickOutside(target, () => {
    if (props.isOpen) {
      emits('close')
    }
  })


</script>
  
  <style scoped>

  .title {
    @apply 
      text-left border-b-[1px] pb-[18px] 
      sm:text-2xl text-base font-normal text-white mb-6
  }
  

  .message-wrapper {
    @apply flex items-center gap-2
  }
  
  .form-wrapper{
    @apply flex flex-col gap-6
  }

  
.modal {
  @apply 
    bg-[#ABADAF]/20 backdrop-blur-sm
    w-full h-full
    fixed top-0 left-0 px-8 pt-10 pb-4
    overflow-x-hidden overflow-y-auto z-40
    flex 
}

.modal-inner {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%);
  @apply 
  rounded-[40px] border-2 border-[#000000] max-w-[500px] w-full h-fit p-10
}

/* .modal-content {
  @apply 
    relative w-[600px] p-[40px] bg-white gap-[30px] rounded-xl
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.select-option {
  @apply  px-3 py-2
          rounded-lg border bg-white
          text-[14px]
} 

  
  </style>