<template>
  <div class="email-confirmation-container">
    <IdroTitle :title="$t('emailConfirmation')">
      <h2 class="mt-10">{{$t('checkEmail')}}
        <span class="font-bold mt-4">
          <router-link :to="{name: 'LoginForm'}"> LOGIN </router-link>
        </span>
      </h2>
    </IdroTitle>
  </div>

</template>

<script>
export default {
  name: 'EmailConfirmation'
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
