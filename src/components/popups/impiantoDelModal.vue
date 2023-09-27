<template>
  <div 
    @click="close"
    id="modal-backdrop"></div>
    <div class="modal" ref="target">
     <div class="modal-header">
        <div class="title">
          <h1>{{title}}</h1>
        </div>
     </div>
     <div class="modal-content">
      <div class="flex flex-col">
        <label for="large" class="block mb-2 text-sm font-medium text-white self-start">Select a Plant to delete</label>
          <select id="large" class="appearance-none cursor-pointer" v-model="selectedDevice">
            <option disabled value="">Please select one</option>
            <option v-for="option in supAdmindevices" v-bind:value="option.id" :key="option.id">
             {{ option.name }}
            </option>
          </select>
      </div>
      <div class="w-[372px] flex justify-between mt-6">
        <div class="w-[170px]">
          <iveButton class="grey" @click="emits('close')"  :label="cancelLabel" />
        </div>
        <div class="w-[170px]">
          <iveButton class="red" :disable="disable"  :label="eliminaLabel" @click="onSubmit" />
        </div>
      </div> 
    </div>
    </div>
</template>

<script setup>
  import iveButton from '@/components/button/BaseButton.vue'
  import { storeToRefs } from 'pinia'
  import { watch, ref } from 'vue'
  import { useDeviceManagement } from '@/stores/DeviceManagementStore'
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { onClickOutside } from '@vueuse/core'
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

  const props = defineProps({
    isOpen: Boolean,
    title: String
  })

  const devicesStore = useDevicesStore()
  const { status } = storeToRefs(useDevicesStore())
  const { supAdmindevices } = storeToRefs(useDeviceManagement())
  const cancelLabel = ref(t('cancel'))
  const eliminaLabel = ref(t('delete'))
  const buttonClick = ref(0)
  const selectedDevice = ref('')
  const disable = ref(true)
  const modalActive = ref(false)

  watch(selectedDevice, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disable.value = false
      } else {
        disable.value = true
    }
  })


  const onSubmit = async (values) => {
    console.log(values)
    buttonClick.value = ++buttonClick.value
    if (buttonClick.value == 1) {
      eliminaLabel.value = t('dataCorrect')
    }

    if (buttonClick.value == 2) {
      await devicesStore.deleteDevice(selectedDevice.value)
      modalActive.value = true
      if (status.value.isError == true ) {
        setTimeout(closeNotification, 3000)
      } else {
        setTimeout(closeNotification, 3000)
      }
      eliminaLabel.value = t('delete')
      buttonClick.value = 0
      devicesStore.loadDevices()
    }
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close'])
  
  const target = ref(null)

  onClickOutside(target, () => {
    eliminaLabel.value = t('delete')
    emits('close')
  })

//     




//   

//     const onSubmit = async () => {
//       buttonClick.value = ++buttonClick.value

//       if (buttonClick.value == 1) {
//         label.value = 'Click again to delete'
//       }

//       if (buttonClick.value == 2) {
//         await deviceStore.deleteDevice(selected.value)
//         devicesList.value = deviceStore.loadDevices()
//         label.value = 'Salva'
//         buttonClick.value = 0
//       }
//     }

//   } 

// }
</script>

<style scoped>

#modal-backdrop {
  @apply  bg-[#ABADAF]/20
          fixed top-0 bottom-0 left-0 right-0
          flex justify-center items-center z-10
}

.modal { 
  @apply  fixed z-20 flex flex-col px-10 py-14 rounded-2xl w-fit
          gap-8 top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2
         bg-[#353535]/40 text-white backdrop-blur-xl
          
}

.title h1 {
  @apply text-3xl
}
.message-wrapper {
  @apply flex items-center gap-2
}

.form-wrapper{
  @apply flex flex-col gap-6
}
.close-btn svg {
 @apply cursor-pointer
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.5s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

select {
  @apply block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg 
  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
}
</style>