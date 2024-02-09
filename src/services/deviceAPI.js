import axios from "axios";
import apiClient from "./API";


let params = {company: "idrores"}

export default {
  getDevices() {
    return apiClient.get('device', {params})
  },

  getDevice(id) {
    return apiClient.get(`device/${id}`, {params})
  },

  postDevices(data) {
    return apiClient.post('device', data)
  },
  updateDevice(id,data) {
    return apiClient.put(`device/${id}`, data)
  },

  deleteDevice(id) {
    return apiClient.delete(`device/${id}`)
  },
  
  getDeviceGeo(id) {
    return apiClient.get(`device-geo/${id}`)
  },

  postDeviceGeo(data) {
    return apiClient.post('device-geo', data)
  },

  shareDevice(data) {
    return apiClient.post('device/invite', data)
  },

  unshareDevice(data) {
    return apiClient.post('device/release', data)
  },

  deviceMember(id) {
    return apiClient.get(`user/member/${id}`)
  },
 
  superadminDevices() {
    return apiClient.get(`device-related/superadmin`)
  }
}