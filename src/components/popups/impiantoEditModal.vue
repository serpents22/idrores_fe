<template>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div 
    @click="close"
    id="modal-backdrop"></div>
  <modal>
   <div class="modal-header">
      <div class="title">
        <h1>{{title}}</h1>
      </div>
   </div>
   <div class="modal-content">
    <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
      <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
        <div class="flex flex-col gap-4">
          <div class="w-[300px]">
            <Field name="deviceId" as="select" class="dropdown">
              <option disabled value="">{{$t('selectOne')}}</option>
              <option :value=device.id v-for="device in supAdmindevices" :key="device.id">{{device.name}}</option>
            </Field>
          </div>
          <div class="w-[300px]">
            <BaseInput :placeholder="$t('name')" name="name" type="text" class="white"/>
          </div>
          <div class="w-[300px]">
            <iveButton type="submit" class="filled" :label="$t('save')"/>
          </div>
        </div>
      </form>
    </VeeForm>
   </div>
  </modal>
</template>

<script >
import BaseInput from '@/components/input/NewInput.vue'
import iveText from '@/components/input/inputBase.vue'
import iveButton from '@/components/button/BaseButton.vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { updateDeviceSchema } from '@/composable/devicesSchema'
import { useDeviceManagement } from '@/stores/DeviceManagementStore'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'


export default {
  components: {
    iveText, iveButton,  VeeForm, Field, ErrorMessage, BaseInput
  },
  props:[
    'title'
  ],
  setup(props, {emit}) {
    const close = () => {
      emit('close')
    }
    const schema = updateDeviceSchema  
    const isError = ref(false)
    const modalActive = ref(false)

    const devicesStore = useDevicesStore()
    const { devicesList, status, createDeviceIsLoading } = storeToRefs(useDevicesStore())
    const { supAdmindevices } = storeToRefs(useDeviceManagement())

    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

    // onMounted(() => {
    //   await devicesStore.loadDevices()
    // }) 


    const onSubmit = async (values, { resetForm }) => {
      console.log(values.deviceId)
      const postData = ref({
        name : values.name
      })
      await devicesStore.updateDevice(values.deviceId,postData.value)
      modalActive.value = true
      if (status.value.code == 'fail') {
        isError.value = true
        setTimeout(closeNotification, 3000)
      } else {
        isError.value = false
        setTimeout(closeNotification, 3000)
        resetForm()
        await delay(3000)
        devicesStore.loadDevices()
      }
    }

    const closeNotification = () => {
      modalActive.value = false
    }


    return {
      close, onSubmit, schema, status, isError, modalActive, devicesList, createDeviceIsLoading, supAdmindevices
    }
  } 

}
</script>

<style scoped>


.select-option {
  @apply  px-2 py-1 sm:px-3 sm:py-2 
          rounded-lg border bg-white
          text-[12px] sm:text-base
} 

.dropdown {
  @apply pl-2 rounded py-3 cursor-pointer w-full text-gray-900 border
}
#modal-backdrop {
  @apply  bg-[#ABADAF]/20
          fixed top-0 bottom-0 left-0 right-0
          flex justify-center items-center z-10
}

.modal { 
  @apply  fixed z-20 flex flex-col px-10 py-14 rounded-2xl w-fit
          gap-8 top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2
         bg-[#353535]/40 backdrop-blur-xl
          
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

</style>