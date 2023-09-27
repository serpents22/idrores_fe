<template>
  <pre>{{isExpanded}}</pre>
  <div 
    class="container"
    :class="`${isExpanded? 'expand' : ''}`">
    <h1 class="font-semibold text-2xl">Add New Dispenser</h1>
    <form @submit.prevent="onSubmit" class="form-wrapper">
      <div class="field-wrapper">
        <label for="name">{{$t('name')}} : </label>
        <input type="text" id="name">
      </div>
      <div class="field-wrapper">
        <label for="lat">Lattitude : </label>
        <input type="number" id="lat" step="0.1">
      </div>
      <div class="field-wrapper">
        <label for="long">Longitude : </label>
        <input type="number" id="long" step="0.1">
      </div>
      <div class="field-wrapper">
        <label for="stazioni">{{$t('stationNumber')}} : </label>
        <input type="number" id="stazioni">
      </div>
      <div class="button-wrapper">
        <IveButton type="submit" class="filled__blue mt-6"  :label="$t('save')" />
        <IveButton type="button" class="filled__red mt-6"  :label="$t('cancel')" @click="toggleMenu"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import IveButton from '@/components/button/BaseButton.vue'
import { ref, watch } from 'vue'

  const props = defineProps({
    isExpand:Boolean
  })
  const isExpanded = ref()

  watch(() => props.isExpand, (newValue, oldValue) => 
    isExpanded.value = !isExpanded.value
  )

  function toggleMenu() {
    isExpanded.value = !isExpanded.value
  }
</script>

<style scoped>
.container {
  @apply absolute top-0 left-0 h-full w-0 m-0 invisible 
  flex flex-col items-center py-16 px-10 gap-8
  bg-[#264F80] text-white
  transition-all ease-in-out delay-300
}

.expand {
  @apply w-[360px] visible z-50
}

.form-wrapper {
  @apply flex flex-col gap-4 w-full
}

.field-wrapper {
  @apply flex justify-between items-center invisible
}

.field-wrapper input {
  @apply py-2 px-3 rounded w-[100px] text-gray-900
}

</style>