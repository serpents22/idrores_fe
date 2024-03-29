<template>
  <div class="home-container">
    <div class="header">
      <img src="@/assets/logo.png" id="logo">
      <span>
        <h1>{{ $t('welcomeText') }}</h1>
      </span>
    </div>
    <router-link class="menu" :to="{ name: 'LoginForm' }">
      <img src="../assets/Accedi.png">
      <p>{{ $t('login') }}</p>
    </router-link>
    <footer class="grid grid-cols-1 sm:grid-cols-4 items-center justify-center mb-2">
      <div class="w-fit m-auto sm:ml-10">
        <Tab :tabs="tabs" @clicked="chageLanguage" />
      </div>
      <h2 class="col-span-2 text-[8px] sm:text-base">Idrobit srl - Via Giuseppe Garibaldi, 85, 00012 Villanova di
        Guidonia - © Idrobit srl 2023</h2>
      <div class="flex gap-2 justify-center items-center">
        <a :href="privacyPolicy" target="_blank" class="col-span-1 text-[8px] sm:text-base">Privacy Policy</a>
        |
        <a :href="manualBook" target="_blank" class="col-span-1 text-[8px] sm:text-base">Manual Book</a>
      </div>
    </footer>
  </div>

</template>

<script>
import Tab from '@/components/tab/Tab.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocaleStore } from '../stores/localization/LocaleStore'

export default {
  name: 'Home',
  components: {
    Tab
  },
  setup() {
    const localeStore = useLocaleStore()
    const manualBook = process.env.VUE_APP_API_URL + 'resources/' + localeStore.locale + '/idrores_manual.pdf'
    const privacyPolicy = process.env.VUE_APP_API_URL + 'resources/privacy-policy.pdf'
    const route = useRoute();
    const router = useRouter();
    const tabs = [
      {
        title: 'Italy',
        value: 'ita'
      },
      {
        title: 'English',
        value: 'en'
      },
      {
        title: 'Serbian',
        value: 'sr'
      }
    ]

    onMounted(async () => {
      let selectedLocale = localeStore.locale
      console.log(selectedLocale)
      var element = document.getElementById(selectedLocale);
      element.classList.add("active");
    })

    return {
      tabs, route, router, localeStore, privacyPolicy, manualBook
    }
  },
  methods: {
    chageLanguage(lang) {
      const newPath = `/${lang}`;
      this.router.push(newPath);
      console.log(newPath)
      var subNavs = document.getElementsByClassName("nav")
      for (var i of subNavs) {
        i.classList.remove("active");
      }
      event.target.className += " active"
      this.localeStore.setLocale(lang)
      console.log(this.localeStore.locale)
      this.$i18n.locale = lang
      this.manualBook = process.env.VUE_APP_API_URL + 'resources/' + lang + '/idrores_manual.pdf'
    }
  },
  // computed: {
  // langSelected() {
  //   return this.$i18n.locale
  // },
  // langUnselected() {
  //   return this.$i18n.locale === 'en' ? 'it' : 'en'
  // }
  // },
}
</script>

<style scoped>
.home-container {
  @apply grid grid-cols-1 h-screen
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-3
}

span h1 {
  @apply sm:text-5xl text-xl text-[#353535] font-medium
}

span h2 {
  @apply sm:text-2xl text-xl text-[#353535] font-medium
}

.menu {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%);
  border: 3px solid #000000;
  @apply flex flex-col justify-between p-2 m-auto box-border text-black rounded-[60px]
}

.menu img {
  @apply w-64
}

/* 
.tab-wrapper{
  @apply
    absolute left-[80px] bottom-[20px] w-fit z-10
} */
</style>