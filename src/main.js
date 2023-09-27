import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

import router from './router'
import lottie from 'vue-lottie'
import loading from '@/components/loading.vue'
import sidebar from '@/components/navigation/sideNav.vue'
import toolBar from '@/components/navigation/toolBar.vue'
import modal from './components/modal/Modal.vue'
import IdroTitle from './components/title.vue'
import { defineAsyncComponent } from 'vue'
import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import JsonCSV from 'vue-json-csv'
import i18n from './locales/i18n'

const pinia = createPinia()
const app = createApp(App)


app.use(i18n)
app.use(router)
app.use(pinia)
// app.use(VueGoodTablePlugin)


app.mount('#app')

app
.component('EasyDataTable', Vue3EasyDataTable)
.component('modal', modal)
.component('lottie', lottie)
.component('loading', loading)
.component('sidebar', sidebar)
.component('toolBar', toolBar)
.component('IdroTitle', IdroTitle)
.component('downloadCsv', JsonCSV)
// .component('VueSlider', VueSlider)

app.component('alert', defineAsyncComponent(() =>
  import('@/components/alert/BaseAlert.vue')
))