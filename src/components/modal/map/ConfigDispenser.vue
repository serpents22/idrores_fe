<template>
  <div>
  <alert 
  :message ="postDeviceGeoStatus.message"
    :modalActive="modalActive"
    :isError="postDeviceGeoStatus.isError"
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
              <div class="field-wrapper">
                <label for="name">{{$t('name')}}</label>
                <select id="name" class=" px-3 py-2 rounded-lg border bg-white text-[#3a3a3e]" v-model="formData.ev_serial" :value="formData.ev_serial" @change="onChange(formData.ev_serial)">
                  <option value="0">{{$t('notSelected')}}</option>
                  <option 
                    v-for="option in props.evList" :key="option"
                    class="nav"
                    @click="onClick(option.id)"
                    :value="option.ev"
                    :id="option.id">{{option.id}} : {{option.ev}}</option>
                </select>
              </div>
              <!-- <div class="field-wrapper">
                <label for="lat">{{$t('latitude')}}</label>
                <input
                  disabled
                  class=" px-3 py-2 rounded-lg border bg-[#f2f2f2] text-[#3a3a3e]"
                  type="text" 
                  v-model="formData.latitude"
                  id="lat">
              </div>
              <div class="field-wrapper">
                <label for="long">{{$t('longitude')}}</label>
                <input
                  disabled
                  class=" px-3 py-2 rounded-lg border bg-[#f2f2f2] text-[#3a3a3e]"
                  type="text" 
                  v-model="formData.longitude"
                  id="long">
              </div> -->
              <div class="button-wrapper">
                <BaseButton type="submit" class="filled__blue mt-6"   :label="registerLabel" :loading="postDeviceGeoIsLoading"/>
                <BaseButton type="button" class="filled__red mt-6"  :label="$t('cancel')" @click="emits('close')"/>
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
      isOpen: Boolean,
      title: String,
      evList:Array,
      deviceData:Object,
      formData:Object,
      latLng:Object
  })

  const modalActive = ref(false)
  const deviceStore = useDevicesStore()
  const { postDeviceGeoIsLoading, postDeviceGeoStatus } = storeToRefs(useDevicesStore())
  const cancelLabel = ref(t('cancel'))
  const registerLabel = ref(t('save'))
  const regButtonClick = ref(0)
  const cancelButtonClick = ref(0)

  const evList = ref([])
  const arrayFormData = ref([])

  const formData = ref({    
    device_code : null,
    ev_serial : 0,
    latitude: 0,
    longitude: 0
  })
  
  watch(() => props.isOpen, () => {
    formData.value.device_code = props.deviceData.code
    evList.value = props.evList
    arrayFormData.value = props.formData

    arrayFormData.value.map((data) => {
      for (let i = 0; i < evList.value.length; i++) {
        if(data.ev_serial === evList.value[i].ev) {
          evList.value[i].lat = data.latitude
          evList.value[i].long = data.longitude
        }
      }
      console.log(evList)
    })
    console.log(props.deviceData)
  })

  async function onSubmit() {
    let newValue = { 
      device_code: formData.value.device_code,
      ev_serial: formData.value.ev_serial,
      latitude:  props.latLng.lat.toString(),
      longitude: props.latLng.lng.toString(),
    }
    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = t('dataCorrect')
    }

    if (regButtonClick.value == 2) {
      await deviceStore.postDeviceGeo(newValue)
      emits('coordinatesChanged')
      modalActive.value = true
      setTimeout(closeNotification, 3000)
      registerLabel.value = t('save')
      regButtonClick.value = 0
    }
  }

  function onChange(evSerial) {
    evList.value.map((data) => {
      if (evSerial === data.ev) {
        formData.value.latitude = data.lat
        formData.value.longitude = data.long
      }
    })
  }
  
  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close','coordinatesChanged'])
  
  const form = ref(null)
  const target = ref(null)

  onClickOutside(target, () => {
    cancelButtonClick.value = 0
    regButtonClick.value = 0
    registerLabel.value = t('save')
    cancelLabel.value = t('cancel')
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