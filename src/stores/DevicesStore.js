import { defineStore } from 'pinia'
import devicesApi from '@/services/deviceAPI'
import { ref } from 'vue'
import dataAPI from '@/services/dataAPI'
import { useDataStore } from './DataStore'

export const useDevicesStore = defineStore('impianto', () => {
  const deviceGeo = ref({})
  const loadDeviceGeoIsLoading = ref(false)
  const loadDeviceGeoStatus = ref({
    message:null,
    code:null
  })
  const postDeviceGeoIsLoading = ref(false)
  const postDeviceGeoStatus = ref({
    message:null,
    code:null,
    isError:false
  })
  const devicesList = ref([])
  const deviceData = ref([])
  const createDeviceIsLoading = ref()
  const updateDeviceIsLoading = ref()
  const isLoading = ref(false)
  const status = ref({
    message: null,
    code: null,
    isError: null 
  })
  const dataStore = useDataStore()
  const loadDevices = async () => {
    isLoading.value = true
    try {
      const res = await devicesApi.getDevices()
      devicesList.value = res.data.data.devices
      devicesList.value.forEach( async (device) => {
        const params = ref({
          fields: 'M50,M80',
          measurement: 'METEOSTAT',
          device_code: device.code
        })
        await dataStore.getLastMeteoStat(params.value)
        device.macAddress = dataStore.meteoStat === undefined ? '-' : dataStore.meteoStat.M50
        device.firmwareVersion = dataStore.meteoStat === undefined ? '-' : dataStore.meteoStat.M80
      })
    
      devicesList.value.forEach( async (device) => {
        const satParams = ref({
          fields: 'S16,S18,S4',
          measurement: 'SATSTAT',
          device_code: device.code
        }) 
        await dataStore.getLastSatStat(satParams.value)
        device.prog = dataStore.satStat === undefined ? '-' : dataStore.satStat.S16
        device.station = dataStore.satStat === undefined ? '-' : dataStore.satStat.S18
        device.portarta = dataStore.satStat === undefined ? '-' : dataStore.satStat.S4
      })
      //MV Aggiungo lettura dei registri per i gruppi S6000...S6095 come per gli step. 
      /*
      devicesList.value.forEach( async (device) => {
        const satParams = ref({
          fields: 'S6000,S6001,S60002',
          measurement: 'GROUPCONFIG',
          device_code: device.code
        }) 
        await dataStore.getLastGroupCfg(satParams.value)
        device.prog = dataStore.satStat === undefined ? '-' : dataStore.satStat.S16
        device.station = dataStore.satStat === undefined ? '-' : dataStore.satStat.S18
        device.portarta = dataStore.satStat === undefined ? '-' : dataStore.satStat.S4
      }) **/
      
      isLoading.value = false
    } catch (err) {
        console.error(err)
        isLoading.value = false
      return err
    } 
  }

  const loadDevice = async (id) => {
    isLoading.value = true
    try {
      const res = await devicesApi.getDevice(id)
      deviceData.value = res.data.data.device
      const params = ref({
        fields: 'M50,M80,M81,M33',
        measurement: 'METEOSTAT',
        device_code: deviceData.value.code
      })
      const satParams = ref({
        fields: 'S16,S18,S4',
        measurement: 'SATSTAT',
        device_code: deviceData.value.code
      }) 
      await dataStore.getLastMeteoStat(params.value)
      await dataStore.getLastSatStat(satParams.value)
      // let tmpS24 = dataStore.satStat === undefined ? undefined : dataStore.satStat.S24
      // let splitS24, tmpProg, tmpStat
      // if (tmpS24 !== undefined) {
      //   splitS24 = tmpS24.split('/')
      //   tmpProg = splitS24[0]
      //   deviceData.value.prog = tmpProg
      //   tmpStat = splitS24[1]
      //   deviceData.value.station = tmpStat
      // } else {
      //   splitS24 = undefined
      //   tmpProg = undefined
      //   deviceData.value.prog = '-' 
      //   tmpStat = undefined
      //   deviceData.value.station =  '-' 
      // }
      deviceData.value.prog = dataStore.satStat === undefined ? '-' : dataStore.satStat.S16
      deviceData.value.station = dataStore.satStat === undefined ? '-' : dataStore.satStat.S18
      deviceData.value.contatore = dataStore.satStat === undefined ? '-' : dataStore.satStat.S4
      deviceData.value.portarta = dataStore.satStat === undefined ? '-' : dataStore.satStat.S4
      deviceData.value.pressione = dataStore.satStat === undefined ? '-' : dataStore.meteoStat.M33
      deviceData.value.macAddress = dataStore.meteoStat === undefined ? '-' : dataStore.meteoStat.M50
      deviceData.value.firmwareVersion = dataStore.meteoStat === undefined ? '-' : dataStore.meteoStat.M80
      deviceData.value.hardwareVersion = dataStore.meteoStat === undefined ? '-' : dataStore.meteoStat.M81
      isLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      return err
    } 
  }

  const createDevices = async (deviceData) => {
    createDeviceIsLoading.value = true
    try {
      const res = await devicesApi.postDevices(deviceData)
      console.log(res)
      status.value.message = 'Device Created'
      status.value.code = res.data.status
      status.value.isError = false
      createDeviceIsLoading.value = false
    } catch (err) {
      console.error(err)
      createDeviceIsLoading.value = false
      status.value.message = err.response.data.error
      status.value.isError = true
      status.value.code = err.response.data.status
      return err
    } 
  }

  const updateDevice = async (id,deviceData) => {
    updateDeviceIsLoading.value = true
    try {
      const res = await devicesApi.updateDevice(id,deviceData)
      console.log(res)
      status.value.message = 'Device Updated'
      status.value.code = res.data.status
      status.value.isError = false
      updateDeviceIsLoading.value = false
    } catch (err) {
      console.error(err)
      updateDeviceIsLoading.value = false
      status.value.message = err.response.data.error
      status.value.code = err.response.data.status
      status.value.isError = true
      return err
    } 
  }

  const deleteDevice = async (id) => {
    isLoading.value = true
    try {
      const res = await devicesApi.deleteDevice(id)
      status.value.message = 'Device Deleted'
      status.value.code = res.data.status
      isLoading.value = false
      console.log(res)
    } catch (err) {
      console.error(err)
      isLoading.value = false
      return err
    } 
  }

  const loadDeviceGeo = async (id) => {
    loadDeviceGeoIsLoading.value = true
    try {
      const res = await devicesApi.getDeviceGeo(id)
      loadDeviceGeoStatus.value.code = res.data.status
      loadDeviceGeoIsLoading.value = false
      deviceGeo.value = res.data.data.device.deviceGeos
      console.log(res)
    } catch (err) {
      console.error(err)
      loadDeviceGeoStatus.value.code = err.response.data.status
      loadDeviceGeoStatus.value.message = 'device not exist'
      loadDeviceGeoIsLoading.value = false
      return err
    }
  }
  
  const postDeviceGeo = async (data) => {
    postDeviceGeoIsLoading.value = true
    try {
      const res = await devicesApi.postDeviceGeo(data)
      postDeviceGeoStatus.value.code = res.data.status
      postDeviceGeoStatus.value.message = "Coordinate Updated"
      postDeviceGeoStatus.value.isError = postDeviceGeoStatus.value.code === 'fail' ? true : false
      postDeviceGeoIsLoading.value = false
      console.log(res)
    } catch (err) {
      console.error(err)
      postDeviceGeoStatus.value.code = err.response.data === undefined ? 'fail' : err.response.data.status
      postDeviceGeoStatus.value.isError = postDeviceGeoStatus.value.code === 'fail' ? true : false
      postDeviceGeoStatus.value.message = err.response.data === undefined ? err.message : String(err.response.data.error.errors[0].field + ',' + err.response.data.error.errors[0].message)
      postDeviceGeoIsLoading.value = false
      return err
    }
  }

  return {
    devicesList, isLoading, loadDevices, createDevices, deleteDevice, status, loadDevice, deviceData, createDeviceIsLoading,
    loadDeviceGeo,deviceGeo,loadDeviceGeoIsLoading,loadDeviceGeoStatus,
    postDeviceGeo,postDeviceGeoIsLoading,postDeviceGeoStatus,
    updateDeviceIsLoading, updateDevice
  }
})