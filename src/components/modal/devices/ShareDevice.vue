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
            <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" ref="form" >
              <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
                <BaseInput name="email" type="email" placeholder="Email" class="white" label="Email"/>
                <div class="select-option flex flex-col gap-1 text-left">
                  <label for="ruolo" class="text-xs font-bold ">{{$t('rule')}}</label>
                  <select name="ruolo" v-model="selectedRole" class="cursor-pointer bg-transparent text-[#3a3a3a]" required>
                    <option class="text-[#3a3a3a]" v-for="item in role" :key="item" :value="item">{{ item }}</option>
                  </select> 
                </div>
                <div class="select-option flex flex-col gap-1 text-left">
                  <label for="master" class="text-xs font-bold">{{$t('master')}}</label>
                  <select name="master" v-model="selectedDevice" class="cursor-pointer bg-transparent" required>
                    <option v-for="item in supAdmindevices" :key="item.id" :value="item.code">{{ item.name }}</option>
                  </select> 
                </div>
                <div class="sm:flex-row flex-col flex justify-between gap-4 sm:gap-10"> 
                  <BaseButton type="button" class="outlined"  :label="cancelLabel" @click="cancelForm"/>
                  <BaseButton type="submit" class="filled"  :label="registerLabel" :loading="isLoading"   />
                </div>
              </form>
            </VeeForm>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  </div>
</template>

  
<script setup>
import BaseInput from '@/components/input/NewInput.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import { useDeviceManagement } from '@/stores/DeviceManagementStore'
import { Form as VeeForm } from 'vee-validate'
import { addRoleSchema } from '@/composable/validationSchemas'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

  const props = defineProps({
      isOpen: Boolean,
      title: String
  })

  const role = ['admin','user']
  const selectedRole = ref('')
  const selectedDevice = ref('')
  const schema = addRoleSchema  
  const modalActive = ref(false)
  const deviceManagementStore = useDeviceManagement()
  const { status, isLoading } = storeToRefs(useDeviceManagement())
  const { supAdmindevices } = storeToRefs(useDeviceManagement())
  const cancelLabel = ref(t('cancel'))
  const registerLabel = ref(t('save'))
  const regButtonClick = ref(0)
  const cancelButtonClick = ref(0)

  const onSubmit = async (values, { resetForm }) => {
    let newValues = values
    newValues.role = selectedRole.value
    newValues.device_code = selectedDevice.value
    console.log(newValues)
    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = t('dataCorrect')
    }

    if (regButtonClick.value == 2) {
      await deviceManagementStore.shareDevice(newValues)
      modalActive.value = true
      if (status.value.isError == true ) {
        setTimeout(closeNotification, 3000)
      } else {
        setTimeout(closeNotification, 3000)
        resetForm()
      }
      registerLabel.value = t('save')
      regButtonClick.value = 0
    }
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close'])
  
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

  function cancelForm() {
    cancelButtonClick.value = ++cancelButtonClick.value
    switch (cancelButtonClick.value) {
      case 1:
      cancelLabel.value = t('dataLost')
        break;
      case 2:
      form.value.resetForm()
      emits('close')
      cancelButtonClick.value = 0
      cancelLabel.value = t('cancel')
        break;
    }
  }



</script>
  
  <style scoped>

  .title {
    @apply text-left border-b-[1px] pb-[18px] text-[28px] font-normal text-white mb-4 sm:mb-10 text-base sm:text-xl
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
    fixed top-0 left-0 px-8 py-10
    overflow-x-hidden overflow-y-auto z-40
    justify-center items-center flex
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
  @apply  px-2 py-1 sm:px-3 sm:py-2 
          rounded-lg border bg-white
          text-[12px] sm:text-base
} 

  
  </style>