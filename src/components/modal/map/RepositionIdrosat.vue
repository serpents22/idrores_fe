<template>
  <div>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="status.isError"
     @close="closeNotification" />
     <transition name="fade">
       <div class="modal" v-show="isOpen" >
        <transition name="drop-in">
          <div class="modal-inner" v-show="isOpen" ref="target" >
            <div class="modal-content">
            <h1 class="title">{{title}}</h1>
            <form 
              @submit.prevent="onSubmit" 
              class="form-wrapper">
              <div class="grid grid-cols-1 sm:grid-cols-2">
                <div class="field-wrapper">
                  <label for="latitude">{{$t('latitude')}}</label>
                  <div>{{ latLng.lat }}</div>
                </div>
                <div class="field-wrapper">
                  <label for="longitude">{{$t('longitude')}}</label>
                  <div>{{ latLng.lng }}</div>
                </div>
              </div>
              <div class="button-wrapper">
                <BaseButton type="submit" class="filled__blue mt-6" :label="$t('save')" :loading="updateDeviceIsLoading"/>
                <BaseButton type="button" class="filled__red mt-6" :label="$t('cancel')" @click="emits('close')"/>
              </div>
            </form>                                           
          </div>
        </div>
      </transition>
    </div>
  </transition>
  </div>
</template>

  
<script setup>
import { ref, watch } from 'vue'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/button/BaseButton.vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

  const props = defineProps({
      id: String,
      isOpen: Boolean,
      title: String,
      latLng: {
        type: Object,
        default: {lat: 0, lng: 0}
      }
  })

  const modalActive = ref(false)
  const deviceStore = useDevicesStore()
  const { status, updateDeviceIsLoading } = storeToRefs(useDevicesStore())

  async function onSubmit() {
    let updatedIdrosatCoordinate = {coordinate: props.latLng.lat.toString() + ',' + props.latLng.lng.toString()}
    await deviceStore.updateDevice(props.id, updatedIdrosatCoordinate)
    modalActive.value = true
    emits('close')
    setTimeout(closeNotification, 3000)
    emits('coordinatesChanged')
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close','coordinatesChanged'])
  
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
    @apply flex flex-col gap-6 text-white
  }

  .field-wrapper {
    @apply flex flex-col gap-2 text-left
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
  background: linear-gradient(45.06deg, #010AD1 -8.2%, #1BF728 108.15%);
  @apply 
  rounded-[40px] border-2 border-[#FFEE58] max-w-[500px] w-full h-fit p-10 m-auto
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