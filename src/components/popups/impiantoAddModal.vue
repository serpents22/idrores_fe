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
            <iveText placeholder="Device ID" name="code" type="text" class="text-field" />
          </div>
          <div class="w-[300px]">
            <iveText placeholder="Nome" name="name" type="text" class="text-field" />
          </div>
          <div class="w-[300px]">
            <iveText placeholder="Password" name="password" type="text" class="text-field" />
          </div>
          <!-- <div class="w-[300px]">
            <iveText placeholder="no" name="no" type="text" class="text-field" />
          </div> -->
          <div class="w-[300px]">
            <iveText placeholder="Type" name="type" type="text" class="text-field" />
          </div>
          <div class="w-[300px]">
            <iveText placeholder="GPS Location" name="coordinate" type="text" class="text-field" />
          </div>
          <div class="w-[300px]">
            <iveButton type="submit" class="filled"  :label="$t('save')" :loading="createDeviceIsLoading" />
          </div>
        </div>
      </form>
    </VeeForm>
   </div>
  </modal>
</template>

<script >
import iveText from '@/components/input/inputBase.vue'
import iveButton from '@/components/button/BaseButton.vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { addDeviceSchema } from '@/composable/devicesSchema'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'


export default {
  components: {
    iveText, iveButton,  VeeForm, Field, ErrorMessage
  },
  props:[
    'title'
  ],
  setup(props, {emit}) {
    const close = () => {
      emit('close')
    }
    const schema = addDeviceSchema  
    const isError = ref(false)
    const modalActive = ref(false)

    const devicesStore = useDevicesStore()
    const { devicesList, status, createDeviceIsLoading } = storeToRefs(useDevicesStore())

    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

    const onSubmit = async (values, { resetForm }) => {
      values.max_devices = '1'
      values.coordinate = '0.0,0.0'
      await devicesStore.createDevices(values)
      console.log(values)
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
      close, onSubmit, schema, status, isError, modalActive, devicesList, createDeviceIsLoading
    }
  } 

}
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

</style>