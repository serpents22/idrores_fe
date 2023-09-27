<template>
    <div 
      v-bind="$attrs"
      class="input-wrapper">
      <div 
        class="text-field">
        <label v-show="props.label" :for="name">{{ props.label }}</label>
        <input :id="name" :name="props.name" :type="props.type" v-model="value" :placeholder="props.placeholder" v-bind="$attrs" />
      </div>
      <span class="error-message" v-show="errorMessage">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup>
  import { useField } from 'vee-validate'
    
    const props = defineProps(['name','label', 'type', 'placeholder', 'modelValue'])
    const{ value, errorMessage } = useField(props.name)
  
  </script>
  
  <style scoped>
  .input-wrapper {
    @apply flex flex-col gap-1 text-left
  }
  
  .text-field {
    @apply flex flex-col gap-1
  }
  
  label {
    @apply  text-[12px] sm:text-base font-bold
  }
  
  input {
    @apply outline-none text-[12px] sm:text-base
  }
  


  .white .text-field {
    @apply  px-3 py-2
            rounded-lg border bg-white
  } 
  
  .white input::placeholder {
    @apply text-[12px] sm:text-base
  } 
  
  .outlined .text-field {
    @apply  px-3 py-2
            rounded-lg border border-[#D1D1D6] bg-transparent
  } 
  
  .outlined input::placeholder {
    @apply text-[14px] text-[#9A9EA4]
  } 
  
  .error-message {
      @apply text-xs text-[#F15412] mt-1
  }
  
  
  </style>