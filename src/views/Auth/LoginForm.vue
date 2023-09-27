<template>
  <loading :loading="isLoading" />
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div class="login-container">
    <IdroTitle :title="$t('welcomeText')" />
    <div class="menu">
      <Modal>
        <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
          <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
            <div class="field-wrapper">
              <BaseInput name="email" type="text" label="Email" class="text-field" />
            </div>
            <div class="field-wrapper">
              <BaseInput name="password" type="password" label="Password" class="text-field" />
            </div>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled"  :label="$t('login')" :loading="isLoading" />
            </div>
          </form>
        </VeeForm>
        <div class="create-account">
          <router-link :to="{name: 'ResetPassword'}"> {{$t('resetPassword')}} </router-link>
          <router-link :to="{name: 'RegisterForm'}"> {{$t('createAccount')}} </router-link>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
  import BaseInput from '@/components/input/BaseInput.vue'
  import Modal from '@/components/modal/Modal.vue'
  import MyButton from '@/components/button/BaseButton.vue'
  import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
  import { useAuthStore } from '@/stores/AuthStore'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { loginSchema } from '@/composable/validationSchemas'

  const schema = loginSchema
  // auth with pinia
  const authStore = useAuthStore()
  const { status, isLoading } = storeToRefs(useAuthStore())
  const modalActive = ref(false)
  const isError = ref(false)

  const onSubmit = async (values, { resetForm }) => {
    await authStore.signIn(values)
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

  const closeNotification = () => {
    modalActive.value = false
  }

</script>


<style scoped>
.login-container {
  @apply flex flex-col
}

.menu {
  @apply flex flex-col w-full items-center justify-center
}

.form-wrapper{
  @apply flex flex-col mb-4
}

.field-wrapper{
  @apply flex flex-col 
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
  @apply mb-8 font-bold text-2xl
}


</style>