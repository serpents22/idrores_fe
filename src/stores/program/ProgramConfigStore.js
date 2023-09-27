import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'

export const useProgramConfigStore = defineStore('programConfig', {
  state: () => ({
    programConfig: ref([]),
    status: ref({
      message: null,
      code: null,
    }),
    isLoading: ref(false)
  }),
  actions: {
    async getProgramConfig(params) {
      this.isLoading = true
      try {
        const res = await dataAPI.getLast(params)
        console.log(res)
        this.programConfig = res.data.data
        this.isLoading = false
        this.status.message = 'Program Configuration Fetched'
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