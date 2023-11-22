<template>
    <sidebar 
      :backOn="false" 
      :noSocial="false"
      :logout="true" 
    />
    <div class="dashboard-container">
      <IdroTitle :title="$t('welcomeText')"/>
      <div class="menu">
        <div class="icon-card">
          <router-link :to="{name: 'ManageAccount'}"><img src="../assets/account.png"></router-link>
          <p>{{ $t('accountManagement') }}</p>
        </div>
        <div class="icon-card">
          <router-link :to="{name: 'DevicesList'}"><img src="../assets/impianto.png"></router-link>
          <p>{{ $t('plantManagement') }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import sidebar from '@/components/navigation/sideNav.vue'
import { ref } from '@vue/reactivity';
export default {
  name: 'Dashboard',
  components: {
    sidebar
  }
}
</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-10
}
.header img {
  @apply w-20 sm:w-40
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.menu {
  @apply  flex items-center
          mt-6 sm:mt-24
          gap-4 lg:gap-10
          flex-col md:flex-row
          justify-between mx-auto
}


</style>