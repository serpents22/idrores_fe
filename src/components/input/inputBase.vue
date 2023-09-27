<template>
  <div v-bind="$attrs">
    <label v-show="label" :for="name">{{ label }}</label>
    <input :id="name" :name="name" :type="type" v-model="value" :placeholder="placeholder" />
    <span v-show="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
export default {
  props: [
    'name','label', 'type', 'placeholder', 'state'
  ],
  setup(props) {
    const { value, errorMessage } = useField(props.name)
    return {
      value, errorMessage
    }
  }
}
  

</script>

<style scoped>

.text-field {
  @apply flex flex-col gap-2
}

label {
  @apply text-lg font-normal self-start
}

span {
  @apply text-xs text-[#EB5757] self-start font-medium
}

.text-field input {
  @apply  h-10 pl-2 rounded-lg 
          bg-white outline-blue-500
          text-xs font-medium text-[#3a3a3e] !important
} 


.text-field input::placeholder {
  @apply text-xs font-medium text-[#9A9EA4]  !important
} 

.checkbox {
  @apply flex gap-2 items-center
}

.checkbox input {
  @apply default:ring-2 checked:bg-black !important
}

</style>