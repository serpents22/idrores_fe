<!-- <template>
  <div>
    <div class="input-wrapper">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
      </span>
      <input
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs">
    </div>
  </div>
</template> -->
<template>
      <input
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs">
</template>

<script>

export default {
  props: {
    modelValue: {
    type: [String, Number],
    default: '',
    }
  }
}
</script>

<style scoped>



input {
  @apply flex pl-3 text-sm font-medium bg-transparent focus:outline-none w-full h-full !important
} 

input::placeholder {
  @apply text-xs font-medium text-[#9A9EA4]  !important
} 


.input-wrapper {
  @apply flex flex-row items-center rounded-lg bg-[#F5F8FA] p-2 pl-4 hover:bg-[#eef3f7] transition-colors duration-300 h-full w-full
}

svg {
  @apply w-4 h-4 fill-[#9A9EA4]
}

</style>