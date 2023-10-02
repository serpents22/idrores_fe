import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/views/Auth/RegisterForm.vue'
import LoginForm from '@/views/Auth/LoginForm.vue'
import Dashboard from '@/views/Dashboard.vue'
import DeviceConfig from '@/views/DeviceConfig.vue'
import NotFound from '@/views/error/NotFound.vue'
import Home from '@/views/Home.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import DevicesList from '@/views/DevicesList.vue'
import ManageAccount from '@/views/ManageAccount.vue'
import EmailConfirmation from '@/views/Auth/EmailConfirmation.vue'
import NewPassword from '@/views/Auth/NewPassword.vue'
import ResetPasswordConfirmation from '@/views/Auth/ResetPasswordConfirmation.vue'
import SensorView from '@/views/Sensor/SensorView.vue'
import RhView from '@/views/Sensor/RhView.vue'
import IrrigationView from '@/views/Irrigation/IrrigationView.vue'
import IrrigationConfiguration from '@/views/Irrigation/Configuration.vue'
import IrrigationSchedule from '@/views/Irrigation/Schedule.vue'
import IrrigationStatus from '@/views/Irrigation/Status.vue'
import Flussi from '@/views/Irrigation/Flussi.vue'
import Orario from '@/views/Irrigation/Orario.vue'
import Generali from '@/views/Irrigation/Generali.vue'
import EVConfiguration from '@/views/Irrigation/EVConfiguration.vue'
import Avanzata from '@/views/Irrigation/Avanzata.vue'
import Stazioni from '@/views/Irrigation/Stazioni.vue'
import Programma from '@/views/Irrigation/Programma.vue'
import Avvio from '@/views/Irrigation/Avvio.vue'
import Parametri from '@/views/Irrigation/Parametri.vue'
import StatoProgrammi from '@/views/Irrigation/StatoProgrammi.vue'
import StatoStazione from '@/views/Irrigation/StatoStazione.vue'
import StatoIdrosat from '@/views/Irrigation/StatoIdrosat.vue'
import DurataStazione from '@/views/Irrigation/DurataStazione.vue'
import GestisciSensori from '@/views/Irrigation/GestisciSensori.vue'

import AddDevice from '@/views/AddDevice.vue'
import FerrigationView from '@/views/Ferrigation/FerrigationView.vue'
import FerrigationConfiguration from '@/views/Ferrigation/Configuration.vue'
import Contatore from '@/views/Ferrigation/Contatore.vue'
import Aggitazione from '@/views/Ferrigation/Aggitazione.vue'

import FerrigationProgram from '@/views/Ferrigation/Program.vue'
import FerrigationParametri from '@/views/Ferrigation/Parametri.vue'
import FerrigationImpostazioni from '@/views/Ferrigation/ImpostazioniEc.vue'
import FerrigationRicetta from '@/views/Ferrigation/Ricetta.vue'

import FerrigationStatus from '@/views/Ferrigation/Stato.vue'
import ReportView from '@/views/Report/ReportView.vue'
import ReportAlarm from '@/views/Report/Allarmi.vue'
import ReportEventi from '@/views/Report/EventiProgrammi.vue'
import Planning from '@/views/Report/Planning.vue'
import ReportRilevazioni from '@/views/Report/RilevazioniEventi.vue'
import ReportUmidita from '@/views/Report/SensoriUmiditaEventi.vue'
import MapView from '@/views/Map/MapGoogle.vue'
import Webcam from '@/views/Webcam/Webcam.vue'


const routes = [
  { path: '/:lang', name: 'Home', component: Home, meta: { requiresAuth:false, title: 'Idrores - Home' } },
  { path: '/:lang/password-reset', name: 'ResetPassword', component: ResetPassword, meta: { requiresAuth:false } },
  { path: '/:lang/login', name: 'LoginForm', component: LoginForm, meta: { requiresAuth:false } },
  { path: '/:lang/register', name: 'RegisterForm', component: RegisterForm, meta: { freeAccess:true } },
  { path: '/:lang/email-confirmation', name: 'EmailConfirmation', component: EmailConfirmation, meta: { freeAccess:true } },
  { path: '/:lang/password-reset/change/:email', name: 'NewPassword', component: NewPassword, meta: { freeAccess:true } },
  { path: '/:lang/password-reset/success', name: 'ResetPasswordConfirmation', component: ResetPasswordConfirmation, meta: { freeAccess:true } },
  { path: '/:lang/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth:true } },
  { path: '/:lang/devices', name: 'DevicesList', component: DevicesList, meta: { requiresAuth:true } },
  { path: '/:lang/manage-account', name: 'ManageAccount', component: ManageAccount, meta: { requiresAuth:true } },
  { path: '/:lang/devices/add', name: 'AddDevice', component: AddDevice, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id', name: 'DeviceConfig', component: DeviceConfig, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/map', name: 'MapView', component: MapView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/webcam', name: 'Webcam', component: Webcam, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/sensor', name: 'SensorView', component: SensorView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/sensor/rh', name: 'RhView', component: RhView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report', name: 'ReportView', component: ReportView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report/alarm', name: 'ReportAlarm', component: ReportAlarm, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report/eventi-programmi', name: 'ReportEventi', component: ReportEventi, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report/rilevzioni-eventi', name: 'ReportRilevazioni', component: ReportRilevazioni, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report/sensori-umidita', name: 'ReportUmidita', component: ReportUmidita, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/report/planning', name: 'Planning', component: Planning, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation', name: 'IrrigationView', component: IrrigationView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration', name: 'IrrigationConfiguration', component: IrrigationConfiguration, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/flussi', name: 'Flussi', component: Flussi, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/orario', name: 'Orario', component: Orario, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/generali', name: 'Generali', component: Generali, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/evconfig', name: 'EVConfiguration', component: EVConfiguration, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/avanzata', name: 'Avanzata', component: Avanzata, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/configuration/stazioni', name: 'Stazioni', component: Stazioni, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule', name: 'IrrigationSchedule', component: IrrigationSchedule, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule/programma', name: 'Programma', component: Programma, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule/avvio', name: 'Avvio', component: Avvio, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule/parametri-generali', name: 'Parametri', component: Parametri, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule/durata-stazione', name: 'DurataStazione', component: DurataStazione, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/schedule/gestisci-sensori', name: 'GestisciSensori', component: GestisciSensori, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/status', name: 'IrrigationStatus', component: IrrigationStatus, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/status/stato-programmi', name: 'StatoProgrammi', component: StatoProgrammi, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/status/stato-stazione', name: 'StatoStazione', component: StatoStazione, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/irrigation/status/stato-idrosat', name: 'StatoIdrosat', component: StatoIdrosat, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation', name: 'FerrigationView', component: FerrigationView, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/configuration', name: 'FerrigationConfiguration', component: FerrigationConfiguration, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/configuration/contatore', name: 'Contatore', component: Contatore, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/configuration/aggitazione', name: 'Aggitazione', component: Aggitazione, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/program', name: 'FerrigationProgram', component: FerrigationProgram, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/program/parametri-fertirrigazione', name: 'FerrigationParametri', component: FerrigationParametri, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/program/impostazioni-ec', name: 'FerrigationImpostazioni', component: FerrigationImpostazioni, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/program/ricetta', name: 'FerrigationRicetta', component: FerrigationRicetta, props: true, meta: { requiresAuth:true } },
  { path: '/:lang/dashboard/device-detail/:id/ferrigation/status', name: 'FerrigationStatus', component: FerrigationStatus, props: true, meta: { requiresAuth:true } },
  // { path: '/:catchALL(.*)', name: 'NotFound', component: NotFound },
  ,
  {
    path: '/', // Redirect for URLs without a language prefix
    redirect: '/ita', // Redirect to the default language
  },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from,  next) => {
  if (to.path === '/') {
    next({name: 'Dashboard'})
  } else {
    next();
  }
  if (to.meta.requiresAuth && !localStorage.getItem('auth.token')){
    next({ name: 'LoginForm'})
  } else if (to.meta.requiresAuth && localStorage.getItem('auth.token') || to.meta.freeAccess){
    next()
  } else if (!to.meta.requiresAuth && localStorage.getItem('auth.token')){
    next({name: 'Dashboard'})
  } else next()
  }) 

export default router