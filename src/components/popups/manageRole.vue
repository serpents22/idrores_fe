<template>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div 
    @click="close"
    id="modal-backdrop"></div>
  <modal class="managerole-modal">
   <div class="modal-header">
      <div class="title">
        <h1 class="text-center">{{title}}</h1>
      </div>
   </div>
   <div class="modal-content">
    <table class="table table-striped" style="width:100%">
    <thead>
      <tr>
        <th>Nomi</th>
        <th>mail</th>
        <th>Ruolo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr class="mt-2">
        <td>Silvio</td>
        <td>@.com</td>
        <td>Admin</td>
        <td><iveButton type="button" class="filled" label="Elimina"/></td>
      </tr>
      <tr class="mt-2">
        <td>Pasquale</td>
        <td>@.com</td>
        <td>Admin</td>
        <td><iveButton type="button" class="filled" label="Elimina"/></td>
      </tr>
      <tr class="mt-2">
        <td>Andrea</td>
        <td>@.com</td>
        <td>User</td>
        <td><iveButton type="button" class="filled" label="Elimina"/></td>
      </tr>
 
    </tbody>
  </table>
  <div class="w-[300px]" style="    margin: auto;margin-top: 50px;">
            <iveButton type="submit" class="filled"  :label="$t('save')"/>
          </div>
   </div>
  </modal>
</template>

<script >
import iveText from '@/components/input/inputBase.vue'
import iveButton from '@/components/button/BaseButton.vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { updateDeviceSchema } from '@/composable/devicesSchema'
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
    const schema = updateDeviceSchema  
    const isError = ref(false)
    const modalActive = ref(false)

    const devicesStore = useDevicesStore()
    const { devicesList, status, createDeviceIsLoading } = storeToRefs(useDevicesStore())

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
      close, onSubmit, schema, status, isError, modalActive, devicesList, createDeviceIsLoading
    }
  } 

}
</script>

<style scoped>
.dropdown {
  @apply pl-2 rounded py-3 cursor-pointer w-full text-gray-900
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
.managerole-modal{
  width:38%;
}
@media (max-width:980px){
.managerole-modal{
  width:80%;
}
}
</style>