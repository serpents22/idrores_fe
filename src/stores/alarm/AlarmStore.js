import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'


export const useAlarmStore = defineStore('alarm', {
  state: () => ({
    alarmsList: ref([]),
    alarmsState: ref(),
    status: ref({
      message: null,
      code: null,
    }),
    isLoading: ref(false)
  }),
  actions: {
    async getAlarmList(params) {
      this.isLoading = true
      try {
        const res = await dataAPI.getAlarmsList(params, localStorage.getItem('locale').toUpperCase())
        console.log(res)
        this.alarmsList = res.data.data.resultAlarms
        this.isLoading = false
        this.status.message = 'Alarms Fetched'
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async resetAlarmList(deviceCode, data) {
      this.isLoading = true
      try {
        const res = await dataAPI.postControl(deviceCode, data)
        console.log(res)
        this.isLoading = false
        this.status.message = 'Alarms Reset Success'
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = 'Alarms Reset Failed'
        this.status.code = err.response.data.status
        return err
      }
    },
    async getAlarmState(params) {
      this.isLoading = true
      try {
        const res = await dataAPI.getAlarmState(params)
        console.log(res)
        if (res.data.data === undefined) {
          this.alarmState = false
        } else {
          if (res.data.data.S15 !== 0) {
            this.alarmState = true
          } else {
            this.alarmState = false
          }
        }
        console.log(params.device_code,this.alarmState)
        this.isLoading = false
        this.status.message = 'Alarms Fetched'
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
  }
})