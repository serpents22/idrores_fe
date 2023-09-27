<template>
  <loading :loading="isLoading" />
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <sidebar 
    :backOn="true" 
    />
  <toolBar 
    :noAdd=true
    @editClick="toggleEditModal"
    @deleteClick="toggleDelModal" 
    />
  <impiantoEditModal 
    v-if="isShowEditModal" 
    @close="toggleEditModal" 
    title="MODIFICA IMPIANTO" 
    />
  <impiantoDelModal 
    v-if="isShowDelModal" 
    @close="toggleDelModal" 
    title="ELIMINA IMPIANTO" 
    />
  <div class="login-container">
    <div class="header">
      <img src="@/assets/logo.png" id="logo">
      <span>
        <h1>Aggiungi Impianto</h1>
      </span>
    </div>
    <div class="menu">
      <modal>
        <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
          <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
            <div class="field-wrapper">
              <iveText name="name" type="text"  :placeholder="$t('name')" class="text-field" />
              <img class="h-[200px] object-contain mb-6 self-center" src="@/assets/device.png" id="logo">
              <iveText name="code" type="text" placeholder="ID" class="text-field" />
              <iveButton type="submit" class="filled"  :label="$('enter')" :loading="isLoading" />
            </div>
          </form>
        </VeeForm>
      </modal>
    </div>
  </div>
</template>

<script setup>

import iveText from '@/components/input/inputBase.vue'
import iveButton from '@/components/button/BaseButton.vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { addDeviceSchema } from '@/composable/devicesSchema'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, ref } from 'vue'

const impiantoDelModal = defineAsyncComponent(() => 
  import ('@/components/popups/impiantoDelModal.vue')
)
const impiantoEditModal = defineAsyncComponent(() => 
  import ('@/components/popups/impiantoEditModal.vue')
)


const schema = addDeviceSchema  
  const isError = ref(false)
  const modalActive = ref(false)
  const isShowAddModal = ref(false)
  const isShowDelModal = ref(false)
  const isShowEditModal = ref(false)

  const devicesStore = useDevicesStore()
  const { status, isLoading } = storeToRefs(useDevicesStore())

  const onSubmit = async (values, { resetForm }) => {
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
    }
  }

  //function
  function toggleAddModal() {
    isShowAddModal.value = !isShowAddModal.value
  }
  function toggleDelModal() {
    isShowDelModal.value = !isShowDelModal.value
  }
  function toggleEditModal() {
    isShowEditModal.value = !isShowEditModal.value
  }
  const closeNotification = () => {
    modalActive.value = false
  }

</script>


<style scoped>
.login-container {
  @apply flex flex-col
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-3
}
.menu {
  @apply flex flex-col w-full items-center justify-center mt-20
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.form-wrapper{
  @apply flex flex-col gap-2 mb-4
}

.field-wrapper{
  @apply flex flex-col gap-4
}

.create-account {
  @apply flex flex-col items-center gap-3
}
.create-account router-link {
  @apply font-normal text-lg mt-5 text-center text-white cursor-pointer
}
.button-wrapper {
  @apply mt-3 w-full flex flex-col
}
h1 {
  @apply font-bold text-2xl
}


</style>