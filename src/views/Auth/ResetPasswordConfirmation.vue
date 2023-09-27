<template>
  <div class="email-confirmation-container">
    <div class="header">
      <img src="@/assets/logo.png" id="logo">
      <span>
        <h1>{{$t('passwordReseted')}}</h1>
        <h2>{{$t('loginHere')}}
          <span class="font-bold">
            <router-link :to="{name: 'LoginForm'}"> {{$t('login')}} </router-link>
          </span>
        </h2>
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ResetPasswordConfirmation'
}

</script>


<style scoped>

.email-confirmation-container {
  @apply flex flex-col
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-9
}

.header img {
  @apply w-52
}

span {
  @apply flex flex-col gap-2
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

span h1 {
  @apply sm:text-3xl text-lg text-[#353535] font-medium
}

</style>
