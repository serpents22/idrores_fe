import { defineStore } from 'pinia'
import deviceAPI from '@/services/deviceAPI'
import { ref } from 'vue'

export const useDeviceManagement = defineStore('device-management', {
  state: () => ({
    user: localStorage.getItem('auth.user'),
    token: localStorage.getItem('auth.token'),
    status: ref({
      message: null,
      code: null,
      isError: null
    }),
    isLoading: ref(false),
    members: ref(''),
    supAdmindevices: ref('')
  }),
  actions: {

    async shareDevice(data) {
      this.isLoading = true
      try {
        const res = await deviceAPI.shareDevice(data)
        console.log(res)
        this.isLoading = false
        this.status.message = 'Master Shared'
        this.status.code = res.data.status
        this.status.isError = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.isError = true
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async unshareDevice(data) {
      this.isLoading = true
      try {
        const res = await deviceAPI.unshareDevice(data)
        console.log(res)
        this.isLoading = false
        this.status.message = 'Master Released'
        this.status.code = res.data.status
        this.status.isError = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.isError = true
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async deviceMember(id) {
      this.isLoading = true
      try {
        const res = await deviceAPI.deviceMember(id)
        this.members = res.data.data.users
        this.isLoading = false
        this.status.message = 'Success'
        this.status.code = res.data.status
        this.status.isError = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.isError = true
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async superAdminDevices() {
      this.isLoading = true
      try {
        const res = await deviceAPI.superadminDevices()
        this.supAdmindevices = res.data.data.devices
        this.isLoading = false
        this.status.message = 'Success'
        this.status.code = res.data.status
        this.status.isError = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.isError = true
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
  }
})