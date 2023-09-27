<template>
  <router-view/>
</template>

 <script>

import { useLocaleStore } from './stores/localization/LocaleStore'

export default {
  name: 'App',
	watch: {
		'$route' (to, from) {
      if (to.params.lang !== this.localStore.locale) {
        const lang = to.params.lang
        this.localStore.setLocale(lang)
        this.$i18n.locale = lang
      }
			document.title = to.meta.title || 'IdroRes'
		}
	},
  setup() {
    const localStore = useLocaleStore()
    return {
      localStore
    }
  },
  mounted() {
    this.$i18n.locale = this.localStore.locale
  }
}
</script>

<style>
:root {
  position:relative;
  padding-bottom: 160px;
  margin: 0;
  background: #d0e2f3;
}

.restrictedAccess {
  @apply invisible
}


#app {
  position:relative;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  position:relative;
  margin: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.icon-card {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%) padding-box,
              linear-gradient(to right, #000000, #BC2113) border-box;
  border: 3px solid transparent;
  @apply flex flex-col justify-center px-2
  transition-all ease-in-out delay-150 hover:-translate-y-2 
  items-center
  w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 
  rounded-[40px] md:rounded-[50px] lg:rounded-[60px]
}

.icon-card img {
  @apply 
  px-8 
  object-cover

}

.icon-card p {
  @apply 
    text-black font-poppins 
    font-medium text-xs sm:text-sm md:text-base 
    break-all
}



.sm-icon-card {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%) padding-box,
              linear-gradient(to right, #000000, #BC2113) border-box;
  border: 2px solid transparent;
  @apply flex flex-col justify-center px-2
  transition-all ease-in-out delay-150 hover:-translate-y-2 
  items-center
  w-[70px] h-[70px]
  md:w-[90px] md:h-[90px]
  lg:w-[100px] lg:h-[100px]
  xl:w-[120px] xl:h-[120px]
  2xl:w-[160px] 2xl:h-[160px]
  rounded-[12px] md:rounded-[20px] lg:rounded-[30px]
}

.sm-icon-card img {
  @apply 
  px-1 md:px-4 lg:px-6
  object-contain

}
.sm-icon-card p {
  @apply 
    text-black font-poppins 
    font-medium text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]
    break-words
    cursor-default
}

.xs-icon-card {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%) padding-box,
              linear-gradient(to right, #000000, #BC2113) border-box;
  border: 2px solid transparent;
  @apply flex flex-col justify-center 
  items-center
  w-[50px] h-[50px] 
  sm:w-[60px] sm:h-[60px] 
  md:w-[70px] md:h-[70px] 
  lg:w-[80px] lg:h-[80px] 
  xl:w-[100px] xl:h-[100px]
  2xl:w-[130px] 2xl:h-[130px]
  transition-all ease-in-out duration-200 hover:scale-110
  rounded-[10px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[30px]
}
.xs-icon-card img {
  @apply 
  px-2 sm:px-3 md:px-4 lg:px-6
  object-contain
}

.xs-icon-card p {
  @apply 
    text-black 
    font-poppins font-semibold text-[5px] sm:text-[6px] md:text-[8px] lg:text-[12px]
    break-words pointer-events-none
    px-2
}


.md-icon-card {
  background: linear-gradient(45.06deg, #FFFFFF -8.2%, #FFFFFF 108.15%) padding-box,
              linear-gradient(to right, #000000, #BC2113) border-box;
  border: 3px solid transparent;
  @apply flex flex-col justify-center px-2
  items-center
  w-28 h-28
  sm:w-36 sm:h-36 
  md:w-44 md:h-44 
  lg:w-48 lg:h-48
  transition-all ease-in-out duration-300
  rounded-[20px] md:rounded-[30px] lg:rounded-[40px]
}

.md-icon-card:hover {
  box-shadow: 0px 0px 8px 6px rgba(255, 255, 255, 0.48);
  @apply transition-all ease-in-out duration-300 rounded-3xl
}
.md-icon-card img {
  @apply 
  px-5
  object-contain

}

.md-icon-card p {
  @apply 
    text-black font-poppins 
    font-medium text-xs sm:text-sm md:text-base 
    break-words pointer-events-none
}
</style>
