<template>
  <alert 
    :message ="postDeviceGeoStatus.message"
    :modalActive="modalActive"
    :isError="postDeviceGeoStatus.isError"
     @close="closeNotification" />
  <div 
    class="container"
    :class="`${isExpanded ? 'expand' : ''}`">

    <h1 :class="`${isExpanded ? 'text-expanded' : ''}`">{{$t('addEV')}}</h1>
    <form 
      @submit.prevent="onSubmit" 
      class="form-wrapper"
      :class="`${isExpanded ? 'form-expanded' : ''}`">
      <div class="field-wrapper">
        <label for="name">{{$t('name')}} : </label>
        <select id="name" class="dropdown" v-model="formData.ev_serial" :value="formData.ev_serial" @change="onChange(formData.ev_serial)">
          <option value="0">{{$t('notSelected')}}</option>
          <option 
            v-for="option in props.evList" :key="option"
            class="nav"
            @click="onClick(option.id)"
            :value="option.ev"
            :id="option.id">{{option.id}} : {{option.ev}}</option>
        </select>
      </div>
      <div class="field-wrapper">
        <label for="lat">{{$t('latitude')}} : </label>
        <input type="text" 
          v-model="formData.latitude"
          id="lat">
      </div>
      <div class="field-wrapper">
        <label for="long">{{$t('longitude')}} : </label>
        <input type="text" 
          v-model="formData.longitude"
          id="long">
      </div>
      <div class="button-wrapper">
        <IveButton type="submit" class="filled__blue mt-6"   :label="$t('save')" :loading="postDeviceGeoIsLoading"/>
        <IveButton type="button" class="filled__red mt-6"  :label="$t('cancel')" @click="toggleMenu"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref,watch } from 'vue'
import IveButton from '@/components/button/BaseButton.vue'
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia';


  const props = defineProps({
    isExpand:Boolean,
    evList:Array,
    deviceData:Object,
    formData:Object
  })

  const emits = defineEmits(['close'])

  const deviceStore = useDevicesStore()
  const { postDeviceGeoIsLoading, postDeviceGeoStatus } = storeToRefs(useDevicesStore())
  const isExpanded = ref(false)
  const isError = ref(false)
  const modalActive = ref(false)
  const evList = ref([])
  const arrayFormData = ref([])

  const formData = ref({    
    device_code : null,
    ev_serial : 0,
    latitude: 0,
    longitude: 0
  })
  
  watch(() => props.isExpand, () => {
    isExpanded.value = props.isExpand
    formData.value.device_code = props.deviceData.code
    evList.value = props.evList
    arrayFormData.value = props.formData

    arrayFormData.value.map((data) => {
      for (let i = 0; i < evList.value.length; i++) {
        if(data.ev_serial === evList.value[i].ev) {
          evList.value[i].lat = data.latitude
          evList.value[i].long = data.longitude
        }
      }
      console.log(evList)
    })
    console.log(props.deviceData)
  })

  async function onSubmit() {
    console.log(formData.value)
    await deviceStore.postDeviceGeo(formData.value)
    modalActive.value = true
    setTimeout(closeNotification, 5000)
  }

  function onChange(evSerial) {
    evList.value.map((data) => {
      if (evSerial === data.ev) {
        formData.value.latitude = data.lat
        formData.value.longitude = data.long
      }
    })
  }
  const toggleMenu = () => {
    isExpanded.value = false
    emits('close')
    // isExpanded.value = !isExpanded.value
  }
  
  const closeNotification = () => {
    modalActive.value = false
  }

</script>

<style scoped>

.container {
  @apply 
    fixed top-0 left-0 h-screen w-0 m-0 items-center 
    flex flex-col bg-[#264F80]
    transition-all duration-300 ease-in-out invisible 
}

.expand {
  @apply w-[360px] z-50 visible px-10
}

h1{
  @apply invisible text-2xl font-semibold my-20 text-white
  transition-all ease-in-out 
}

.text-expanded {
  @apply visible 

}

.form-wrapper {
  @apply 
    invisible
    transition-all ease-in-out
    flex flex-col gap-4 w-full
}

.form-expanded {
  @apply visible
}


.field-wrapper {
  @apply 
    flex justify-between items-center
    transition-all ease-in-out
}
.field-wrapper label {
  @apply 
    w-full text-left text-white
}

.field-wrapper input {
  @apply py-2 px-3 rounded w-full text-gray-900
}

.dropdown {
  @apply pl-2 rounded w-full py-2 px-3 cursor-pointer text-gray-900
}

.field-expanded {
  @apply visible
}

</style>