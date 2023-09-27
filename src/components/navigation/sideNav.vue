<template>
    <div class="nav-wrapper">
      <div class="xs-icon-card cursor-pointer" v-show="isAlarm" @click="emits('alarmList')" >
        <img src="@/assets/icon/warning-icon.png" class="cursor-pointer" >
        <p>{{ $t('alarms') }}</p>
      </div>
      <div class="xs-icon-card" v-show="noSocial">
        <router-link :to="{name: 'Dashboard'}"><img src="@/assets/whatsapp.png"></router-link>
        <p>{{ $t('supportChat') }}</p>
      </div>
      <div class="xs-icon-card" v-show="!noSocial">
       <router-link :to="{name: 'Dashboard'}"><img src="@/assets/apple.png"></router-link>
        <p>{{ $t('downloadIosApp') }}</p>
      </div>
      <div class="xs-icon-card" v-show="!noSocial">
       <router-link :to="{name: 'Dashboard'}"><img src="@/assets/android.png"></router-link>
        <p>{{ $t('downloadAndroidApp') }}</p>
      </div>
      <div class="xs-icon-card" v-show="backOn" @click="goBack">
        <img src="@/assets/Indietro.png" class="cursor-pointer">
        <p>{{ $t('backwards') }}</p>
      </div>
      <div class="xs-icon-card" v-show="logout" @click="signOut">
        <router-link :to="{name: 'Dashboard'}"><img src="@/assets/logout.png"></router-link>
        <p>{{ $t('logout') }}</p>
      </div>
      <div class="xs-icon-card">
        <router-link :to="{name: 'Dashboard'}"><img src="@/assets/home.png"></router-link>
        <p>{{ $t('home') }}</p>
      </div>
    </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/AuthStore'

  //props
  const props = defineProps([
  'backOn','noSocial','logout','isAlarm'
  ])
  // Define custom events
  const emits = defineEmits(['alarmList'])

  const authStore = useAuthStore()

  async function signOut() {
    await authStore.signOut()
  }
  const goBack = () => {
    router.go(-1)
  }

</script>

<style scoped>

.nav-wrapper {
  @apply 
    fixed z-10 flex flex-col gap-2
    bottom-0 right-[16px]
    pb-[16px]
    transition-all ease-in-out duration-200
}

.nav-wrapper a {
  @apply  items-center justify-center cursor-pointer flex
          
}

/* .nav-wrapper img {
  @apply 
    w-[40px] h-[40px] 
    sm:w-[60px] sm:h-[60px] 
    md:w-[70px] md:h-[70px] 
    lg:w-[80px] lg:h-[80px] 
    xl:w-[100px] xl:h-[100px]
    2xl:w-[130px] 2xl:h-[130px]
    transition-all ease-in-out duration-200 hover:scale-110
} */



</style>
